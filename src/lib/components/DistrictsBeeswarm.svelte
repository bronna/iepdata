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
  import tippy from 'tippy.js'
  import 'tippy.js/dist/tippy.css'
  import { colors } from '$lib/styles/colorConfig'
  import SVGChart from '$lib/components/SVGChart.svelte'

  export let index = 0
  let fadeDuration = 300

  // Filter out data rows with no "weighted_inclusion" value
  const filteredData = $data.filter(d => d.properties.weighted_inclusion !== null && d.properties.weighted_inclusion !== undefined)
  
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

  $: visibleLabels = derived(
    [selectedDistrict, selectedDistrictData],
    ([$selectedDistrict, $selectedDistrictData]) => {
      if (index < 6) {
        return nodes.filter(node => highlightedDistricts.includes(node.properties.GEOID))
      } else if ($selectedDistrict && $selectedDistrict.length > 0) {
        return nodes.filter(node => $selectedDistrict.includes(node.properties.GEOID))
      }
      return []
    }
  )

  $: legendWidth = rScale(6000) + 140
  $: legendHeight = rScale(6000) + 1

  // Get selected district's x position
  let selectedDistrictX = 0
  $: {
    if ($selectedDistrict && $selectedDistrict.length > 0) {
      const selectedGEOID = String($selectedDistrict) // Convert to string to ensure proper comparison
      
      const selectedNode = nodes.find(node => {
        return String(node.properties.GEOID) === selectedGEOID
      })
      
      if (selectedNode) {
        selectedDistrictX = selectedNode.x + dimensions.margin.left
      } else {
        selectedDistrictX = 0
      }
    } else {
      selectedDistrictX = 0
    }
  }

  // handle overlay visibility
  $: showOverlay = index === 3 && $selectedDistrict && $selectedDistrict.length > 0

  // Improved tooltip implementation
  function tooltipContent(nodeData) {
    return `
      <span style="font-family:'Source Sans 3', sans-serif;"><strong>${nodeData["Institution Name"]}</strong><br>
      Inclusion score: <strong>${nodeData.quartile}</strong> out of 4 ${nodeData["Total Student Count"] < 500 ? '<strong>*</strong>' : ''}<br>
      <strong>${nodeData["Total Student Count"]}</strong> students with IEPs<br>
      <a class="tooltip-link" href="/${nodeData.GEOID}"><strong>Learn more ></strong></a></span>
    `
  }

  function tooltipAction(element, nodeContent) {
    const tooltip = tippy(element, {
      content: nodeContent,
      allowHTML: true,
      interactive: true,
      appendTo: document.body,
      animation: 'fade',
      delay: [100, 0],
      placement: 'top',
      theme: 'custom'
    })

    return {
      update(newContent) {
        tooltip.setContent(newContent)
      },
      destroy() {
        tooltip.destroy()
      }
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
      if (index < 4) {
        highlightedDistricts = $selectedDistrict
      } else if (index === 4) {
        highlightedDistricts = [$selectedDistrict, ...largestDistricts]
      } else if (index === 5) {
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
    if (index >= 2) {
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
          {#if !($selectedDistrict && $selectedDistrict.includes(node.properties.GEOID))}
              <circle
                  cx={node.x}
                  cy={node.y}
                  r={$tweenedRadii[i]}
                  fill={$tweenedColors[i]}
                  use:tooltipAction={tooltipContent(node.properties)}
                  style="cursor: pointer;"
              />
          {/if}
      {/each}
      
      {#each nodes as node, i}
          {#if $selectedDistrict && $selectedDistrict.includes(node.properties.GEOID)}
              <circle
                  cx={node.x}
                  cy={node.y}
                  r={$tweenedRadii[i] + 6}
                  fill="none"
                  stroke={colors.colorDarkGray}
                  stroke-width={12}
                  stroke-opacity={0.5}
              />
              <circle
                  cx={node.x}
                  cy={node.y}
                  r={$tweenedRadii[i]}
                  fill={$tweenedColors[i]}
                  stroke={colors.colorWhite}
                  stroke-width={1}
                  use:tooltipAction={tooltipContent(node.properties)}
                  style="cursor: pointer;"
              />
          {/if}
      {/each}

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
  
        <g class="chart-labels" transition:fade="{{ duration: fadeDuration }}">
          <text 
            x={50}
            y={60} 
            text-anchor="start"
            font-size="14px"
            font-weight="600"
            fill={colors.colorText}
          >
            &#8592; Less inclusive
          </text>
          <text 
            x={dimensions.width - dimensions.margin.right - dimensions.margin.left - 50}
            y={60} 
            text-anchor="end"
            font-size="14px"
            font-weight="600"
            fill={colors.colorText}
          >
            More inclusive &#8594;
          </text>
        </g>
  
        {#if index > 1}
          <g class="legend" transform="translate({dimensions.width - legendWidth}, {dimensions.height - legendHeight})" transition:fade="{{ duration: fadeDuration}}">
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
</div>

<style>
    .districts-beeswarm {
      height: 400px;
      width: 100%;
      margin-bottom: 0rem;
    }

    text {
      pointer-events: none;
    }

    :global(.tippy-box) {
      background-color: white;
      color: black;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      font-size: 14px;
      padding: 8px;
    }

    :global(.tippy-arrow) {
      color: white;
    }

    :global(.tooltip-link) {
      color: #0066cc;
      text-decoration: none;
    }

    :global(.tooltip-link:hover) {
      text-decoration: underline;
    }
</style>


<!--



-->