<script>
  import { tweened } from 'svelte/motion'
  import { fade } from 'svelte/transition'
  import { derived } from 'svelte/store'
  import { quartileRanges } from '$lib/stores/quartileRanges.js'

  import { data, selectedDistrict, selectedDistrictData, stateData } from '$lib/stores/stores.js'

  import { scaleLinear, scaleSqrt, scaleOrdinal } from 'd3-scale'
  import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force'
  import { extent } from 'd3-array'
  import { interpolateRgb } from 'd3-interpolate'
  import tippyJs from 'tippy.js'
  import 'tippy.js/dist/tippy.css'
  import { colors } from '$lib/styles/colorConfig'

  import SVGChart from '$lib/components/SVGChart.svelte'

  export let index = 0

  let fadeDuration = 300

  // Filter out data rows with no "weighted_inclusion" value
  const filteredData = $data.filter(d => d.properties.weighted_inclusion !== null && d.properties.weighted_inclusion !== undefined)

  $: console.log($quartileRanges)
  
  // Chart dimensions & initial values
  let defaultRadius = 10
  $: defaultRadius = width <= 768 ? 5 : 10

  let width
  let height
  $: dimensions = { 
    width, 
    height, 
    margin: width <= 768 ? { top: 0, right: 20, bottom: 20, left: 20 } : { top: 0, right: 30, bottom: 20, left: 30 },
  }

  $: xScale = scaleLinear()
    .domain(extent(filteredData, d => d.properties.weighted_inclusion))
    .range([0, dimensions.width - dimensions.margin.right - dimensions.margin.left])

  $: rScale = scaleSqrt()
    .domain(extent(filteredData, d => d.properties['Total Student Count']))
    .range(width < 768 ? [2, 20] : [3, 50])

  let colorScale = scaleOrdinal()
    .domain([1, 2, 3, 4])
    .range([colors.colorSeparate, colors.colorNonInclusive, colors.colorSemiInclusive, colors.colorInclusive])

  // Force simulation
  let bubblePadding = 2
  let useScaledRadius = false

  let simulation = forceSimulation(filteredData)

  $: {
    simulation
      .force('x',
        forceX()
          .x(d => xScale(d.properties.weighted_inclusion))
          .strength(1.5)
      )
      .force('y',
        forceY()
          .y(height / 2)
          .strength(0.1)
      )
      .force('collide',
        forceCollide()
          .radius(d => useScaledRadius ? rScale(d.properties['Total Student Count']) + bubblePadding : defaultRadius + bubblePadding)
          .strength(0.8)
      )
      .alpha(0.5) // [0, 1] rate at which simulation finishes, decrease if you want more "movement"
      .alphaMin(0.01) // point at which simulation stops as alpha goes 1 -> 0
      .alphaDecay(0.05) // [0, 1] rate at which alpha approaches 0
      .velocityDecay(0.4) // [0, 1] rate at which nodes lose velocity
      .restart()
  }

  let nodes = []
  simulation.on('tick', () => {
    nodes = simulation.nodes()
  })

  // Create a derived store for labels
  $: visibleLabels = derived(
    [selectedDistrict, selectedDistrictData],
    ([$selectedDistrict, $selectedDistrictData]) => {
      if (index < 7) {
        return nodes.filter(node => highlightedDistricts.includes(node.properties.GEOID))
      } else if ($selectedDistrict && $selectedDistrict.length > 0) {
        return nodes.filter(node => $selectedDistrict.includes(node.properties.GEOID))
      }
      return []
    }
  )

  $: legendWidth = rScale(6000) + 140
  $: legendHeight = rScale(6000) + 1

  // Tooltip using tippy.js library
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

  let largestDistricts = $stateData[0].properties.largestDistricts

  let neighborDistrictIds = []
  $: {
    if ($selectedDistrict && $selectedDistrict.length > 0 && $selectedDistrictData && $selectedDistrictData.length > 0) {
        neighborDistrictIds = $selectedDistrictData[0].properties.neighbors
    } else {
        neighborDistrictIds = []
    }
}

  let highlightedDistricts = []
  $: {
    if ($selectedDistrict && $selectedDistrict.length > 0) {
      if (index < 5) {
        highlightedDistricts = $selectedDistrict
      } else if (index === 5) {
        highlightedDistricts = [$selectedDistrict, ...largestDistricts]
      } else if (index === 6) {
        highlightedDistricts = [$selectedDistrict, ...neighborDistrictIds]
      } else {
        highlightedDistricts = filteredData.map(d => d.properties.GEOID)
      }
    } else {
      highlightedDistricts = index < 7 ? [] : filteredData.map(d => d.properties.GEOID)
    }
  }

  // Tweened values for transitions
  let tweenedOpacity = tweened(0, { duration: fadeDuration })
  $: {
    if (index > 0) {
      tweenedOpacity.set(0.85)
    } else {
      tweenedOpacity.set(0)
    }
  }

  let tweenedRadii = tweened(new Array(filteredData.length).fill(defaultRadius), { duration: fadeDuration })
  $: {
    if (index >= 3) {
      useScaledRadius = true
      tweenedRadii.set(filteredData.map(d => rScale(d.properties['Total Student Count'])))
    } else {
      useScaledRadius = false
      tweenedRadii.set(filteredData.map(d => 
        $selectedDistrict && $selectedDistrict.includes(d.properties.GEOID) ? 12 : defaultRadius
      ))
    }
  }

  function interpolateColor(a, b) {
    const interpolate = interpolateRgb(a, b)
    return t => interpolate(t)
  }

  let tweenedColors = tweened(
    filteredData.map(() => colors.colorLightGray),
    {
      duration: fadeDuration,
      interpolate: (a, b) => {
        return t => a.map((color, i) => interpolateColor(color, b[i])(t))
      }
    }
  )
  $: {
    tweenedColors.set(
      filteredData.map(d => {
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
</script>


<div class="districts-beeswarm" bind:clientWidth={width} bind:clientHeight={height}>
    <SVGChart dimensions={dimensions}>
        {#each nodes as node, i}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <circle
              cx={node.x}
              cy={node.y}
              r={$tweenedRadii[i]}
              fill={$tweenedColors[i]}
              stroke={$selectedDistrict && $selectedDistrict.includes(node.properties.GEOID) ? colors.colorText : 'none'}
              stroke-width={$selectedDistrict && $selectedDistrict.includes(node.properties.GEOID) ? 2 : 0}
              use:tippy={tooltipContent(node.properties)}
            />
        {/each}

        <!-- colored rectangles to show quartiles in 2nd slide -->
        {#if index === 1}
          <g transition:fade="{{ duration: fadeDuration }}">
            {#each $quartileRanges as range, i}
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

        {#each $visibleLabels as node}
            <text
              x={node.x}
              y={node.y}
              dy=".3em"
              text-anchor="middle"
              fill="white"
              stroke="white"
              stroke-width="5"
              style="font-size: 14px; font-weight:400;"
            >
              {node.properties["Institution Name"]}
            </text>
            <text
              x={node.x}
              y={node.y}
              dy=".3em"
              text-anchor="middle"
              fill="black"
              style="font-size: 14px; font-weight:400;"
            >
              {node.properties["Institution Name"]}
            </text>
        {/each}
  
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
  
        <!-- legend-->
        {#if index > 2}
          <g class="legend" transform="translate({dimensions.width - legendWidth}, {dimensions.height - legendHeight})" transition:fade="{{ duration: fadeDuration}}">
            <!-- 6000 students -->
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
          
            <!-- 3000 students -->
            <circle r={rScale(3000)} cy={rScale(6000) - rScale(3000)} fill="none" stroke={colors.colorText} stroke-width="1" />
            <line 
              x1="0" x2={rScale(6000) + 5}
              y1={rScale(6000) - (rScale(3000) * 2)} y2={rScale(6000) - (rScale(3000) * 2)}
              stroke={colors.colorText} 
              stroke-width="1" 
              stroke-dasharray="2,2" 
            />
            <text 
              x={rScale(6000) + 10} 
              y={rScale(6000) - (rScale(3000) * 2)} 
              style="font-size: 12px; fill:{colors.colorText}" 
              dominant-baseline="middle"
            >
              3,000
            </text>
          
            <!-- 1000 students -->
            <circle r={rScale(1000)} cy={rScale(6000) - rScale(1000)} fill="none" stroke={colors.colorText} stroke-width="1" />
            <line 
              x1="0" x2={rScale(6000) + 5}
              y1={rScale(6000) - (rScale(1000) * 2)} y2={rScale(6000) - (rScale(1000) * 2)}
              stroke={colors.colorText} 
              stroke-width="1" 
              stroke-dasharray="2,2" 
            />
            <text 
              x={rScale(6000) + 10} 
              y={rScale(6000) - (rScale(1000) * 2)} 
              style="font-size: 12px; fill:{colors.colorText}" 
              dominant-baseline="middle"
            >
              1,000
            </text>
          </g>
        {/if}
    </SVGChart>
    {#if $selectedDistrict && index < 1}
      <div transition:fade="{{ duration: fadeDuration }}">
        <p class="keep-scrolling">Keep scrolling</p>
      </div>
    {/if}
</div>


<style>
    .districts-beeswarm {
      height: 400px;
      width: 100%;
      margin-bottom: 3rem;
    }

    text {
      pointer-events: none;
    }

    .keep-scrolling {
      opacity: 0.5;
      font-size: 0.8rem;
      text-align: center;
      margin-top: 1rem;
    }
</style>