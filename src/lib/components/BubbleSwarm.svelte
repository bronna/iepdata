<script>
    import { tweened } from 'svelte/motion'
    import { fade } from 'svelte/transition'
    import { scaleLinear, scaleSqrt, scaleOrdinal } from 'd3-scale'
    import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force'
    import { extent } from 'd3-array'
    import { interpolateRgb } from 'd3-interpolate'
    import tippyJs from 'tippy.js'
    import 'tippy.js/dist/tippy.css'
    import { colors } from '$lib/styles/colorConfig'
  
    export let data
    export let dimensions
    export let selectedDistricts
    export let highlightedDistricts
    export let index
    export let quartileRanges
  
    let fadeDuration = 300
  
    $: xScale = scaleLinear()
      .domain(extent(data, d => d.properties.weighted_inclusion))
      .range([0, dimensions.width - dimensions.margin.right - dimensions.margin.left])
  
    $: rScale = scaleSqrt()
      .domain(extent(data, d => d.properties['Total Student Count']))
      .range(dimensions.width < 768 ? [2, 20] : [3, 50])
  
    let colorScale = scaleOrdinal()
      .domain([1, 2, 3, 4])
      .range([colors.colorSeparate, colors.colorNonInclusive, colors.colorSemiInclusive, colors.colorInclusive])
  
    let bubblePadding = 2
    let useScaledRadius = false
    $: defaultRadius = dimensions.width <= 768 ? 5 : 10
  
    let simulation = forceSimulation(data)
  
    $: {
      simulation
        .force('x', forceX().x(d => xScale(d.properties.weighted_inclusion)).strength(1.5))
        .force('y', forceY().y(dimensions.height / 2).strength(0.1))
        .force('collide', forceCollide().radius(d => useScaledRadius ? rScale(d.properties['Total Student Count']) + bubblePadding : defaultRadius + bubblePadding).strength(0.8))
        .alpha(0.5)
        .alphaMin(0.01)
        .alphaDecay(0.05)
        .velocityDecay(0.4)
        .restart()
    }
  
    let nodes = []
    simulation.on('tick', () => {
      nodes = simulation.nodes()
    })
  
    function tooltipContent(nodeData) {
      return `
        <span style="font-family:'Source Sans 3', sans-serif;"><strong>${nodeData["Institution Name"]}</strong><br>
        Inclusion score: <strong>${nodeData.quartile}</strong> out of 4 ${nodeData["Total Student Count"] < 500 ? '<strong>*</strong>' : ''}<br>
        <strong>${nodeData["Total Student Count"]}</strong> students with IEPs<br>
        <a class="tooltip-link" href="/${nodeData.GEOID}"><strong>More info >></strong></a></span>
      `
    }
  
    function tippy(element, nodeContent) {
      let tooltipInstance = null
  
      function initialize() {
        tooltipInstance = tippyJs(element, {
          content: nodeContent,
          allowHTML: true,
          interactive: true,
          appendTo: document.body,
        })
      }
  
      function destroy() {
        if (tooltipInstance) {
          tooltipInstance.destroy()
          tooltipInstance = null
        }
      }
  
      initialize()
  
      return {
        update(newContent) {
          if (index > 2) {
            if (tooltipInstance) {
              tooltipInstance.setContent(newContent)
            } else {
              initialize()
            }
          } else {
            destroy()
          }
        },
        destroy() {
          destroy()
        },
      }
    }
  
    let tweenedOpacity = tweened(0, { duration: fadeDuration })
    $: tweenedOpacity.set(index > 0 ? 0.85 : 0)
  
    let tweenedRadii = tweened(new Array(data.length).fill(defaultRadius), { duration: fadeDuration })
    $: {
      if (index >= 3) {
        useScaledRadius = true
        tweenedRadii.set(data.map(d => rScale(d.properties['Total Student Count'])))
      } else {
        useScaledRadius = false
        tweenedRadii.set(data.map(d => 
          selectedDistricts && selectedDistricts.includes(d.properties.GEOID) ? 16 : defaultRadius
        ))
      }
    }
  
    function interpolateColor(a, b) {
      const interpolate = interpolateRgb(a, b)
      return t => interpolate(t)
    }
  
    let tweenedColors = tweened(
      data.map(() => colors.colorLightGray),
      {
        duration: fadeDuration,
        interpolate: (a, b) => {
          return t => a.map((color, i) => interpolateColor(color, b[i])(t))
        }
      }
    )
    $: {
      tweenedColors.set(
        data.map(d => {
          if (index === 0) {
            return colorScale(d.properties.quartile)
          } else {
            return highlightedDistricts.includes(d.properties.GEOID)
              ? colorScale(d.properties.quartile)
              : colors.colorLightGray
          }
        })
      )
    }
  
    $: legendWidth = rScale(6000) + 140
    $: legendHeight = rScale(6000) + 1
  </script>
  
  <g>
    {#each nodes as node, i}
      <circle
        cx={node.x}
        cy={node.y}
        r={$tweenedRadii[i]}
        fill={$tweenedColors[i]}
        stroke={selectedDistricts && selectedDistricts.includes(node.properties.GEOID) ? colors.colorText : 'none'}
        stroke-width={selectedDistricts && selectedDistricts.includes(node.properties.GEOID) ? 2 : 0}
        use:tippy={tooltipContent(node.properties)}
      />
    {/each}
  
    {#if index === 1}
      <g transition:fade="{{ duration: fadeDuration }}">
        {#each quartileRanges as range, i}
          <rect 
            x={xScale(range.min)}
            y={-dimensions.margin.top}
            width={xScale(range.max) - xScale(range.min)}
            height={dimensions.height}
            fill={colorScale(range.quartile)}
            fill-opacity="0.5"
          />
          <text 
            x={xScale((range.min + range.max) / 2)}
            y={dimensions.margin.top + dimensions.height - 30}
            text-anchor="middle"
            fill={colors.colorBackgroundWhite}
            style="font-size: 4rem; font-weight:600;"
            opacity="0.6"
          >
            {i + 1}
          </text>
        {/each}
      </g>
    {/if}
  
    {#if index > 0}
      <g class="chart-labels" transition:fade="{{ duration: fadeDuration }}">
        <text 
          x={0}
          y={60} 
          text-anchor="start"
          font-size="14px"
          font-weight="600"
          fill={colors.colorText}
        >
          &#8592; Less inclusive
        </text>
        <text 
          x={dimensions.width - dimensions.margin.right - dimensions.margin.left}
          y={60} 
          text-anchor="end"
          font-size="14px"
          font-weight="600"
          fill={colors.colorText}
        >
          More inclusive &#8594;
        </text>
      </g>
    {/if}
  
    {#if index > 2}
      <g class="legend" transform="translate({dimensions.width - legendWidth}, {dimensions.height - legendHeight})" transition:fade="{{ duration: fadeDuration}}">
        <!-- Legend content here -->
        <circle r={rScale(6000)} fill="none" stroke={colors.colorText} stroke-width="1" />
        <line 
          x1="0" x2={rScale(6000) + 5}
          y1={-rScale(6000)} y2={-rScale(6000)}
          stroke={colors.colorText} 
          stroke-width="1" 
          stroke-dasharray="2,2" 
        />
        <text 
          x={rScale(6000) + 10} 
          y={-rScale(6000)} 
          style="font-size: 12px; fill:{colors.colorText}" 
          dominant-baseline="middle"
        >
          6,000 students
        </text>
        
        <!-- Add similar circles and labels for 3,000 and 1,000 students -->
      </g>
    {/if}
  </g>