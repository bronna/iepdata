<script>
  import { tweened } from 'svelte/motion'
  import { fade } from 'svelte/transition'
  import { cubicOut } from 'svelte/easing'
  import { data, selectedDistricts, selectedDistrictsData, stateData, primaryDistrictId } from '$lib/stores/stores.js'
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
  $: filteredData = $data ? $data.filter(d => d.properties.weighted_inclusion !== null && d.properties.weighted_inclusion !== undefined) : []
  
  // Chart dimensions & initial values
  let width = 800
  let height = 500
  $: dimensions = { 
    width: width || 800, 
    height: height || 400, 
    margin: (width && width <= 768) ? { top: 0, right: 20, bottom: 40, left: 20 } : { top: 0, right: 30, bottom: 40, left: 30 },
  }

  $: innerWidth = (dimensions.width || 800) - (dimensions.margin?.right || 30) - (dimensions.margin?.left || 30)
  $: innerHeight = (dimensions.height || 400) - (dimensions.margin?.top || 0) - (dimensions.margin?.bottom || 20)

  $: xScale = filteredData.length > 0 && innerWidth > 0 ? scaleLinear()
    .domain(extent(filteredData, d => d.properties.weighted_inclusion))
    .range([0, innerWidth]) : scaleLinear().domain([0, 1]).range([0, 100])

  $: separationTimeScale = filteredData.length > 0 && innerWidth > 0 ? scaleLinear()
    .domain(extent(filteredData, d => d.properties.average_separation_time).reverse())
    .range([0, innerWidth])
    .nice() : scaleLinear().domain([100, 0]).range([0, 100])

  $: rScale = filteredData.length > 0 ? scaleSqrt()
    .domain(extent(filteredData, d => d.properties['Total Student Count']))
    .range((width && width < 768) ? [2, 20] : [3, 50]) : scaleSqrt().domain([0, 1000]).range([3, 50])

  let colorScale = scaleOrdinal()
    .domain([1, 2, 3, 4])
    .range([colors.colorSeparate, colors.colorNonInclusive, colors.colorSemiInclusive, colors.colorInclusive])

  // Force simulation - only run once when data/dimensions change, NOT when index changes
  let bubblePadding = 2
  let simulation
  let nodes = []
  let simulationInitialized = false

  // Create tweened stores for animated values (only colors and opacities now)
  const tweenedColors = tweened([], {
    duration: fadeDuration,
    interpolate: (a, b) => {
      return t => a.map((color, i) => {
        if (!b[i]) return color
        return interpolateRgb(color, b[i])(t)
      })
    }
  })

  const tweenedOpacities = tweened([], {
    duration: fadeDuration,
    easing: cubicOut
  })

  // SEPARATE: Simulation initialization (only runs when data/scales change, NOT index)
  $: {
    if (filteredData.length > 0 && width && height && xScale && rScale && !simulationInitialized) {
      initializeSimulation()
    }
  }

  function initializeSimulation() {
    // Create a copy of the data for the simulation
    const simData = filteredData.map(d => ({ ...d }))
    
    // Create the simulation with scaled collision detection from the start
    simulation = forceSimulation(simData)
      .force('x', 
        forceX(d => xScale(d.properties.weighted_inclusion))
          .strength(1.5)
      )
      .force('y', 
        forceY(height / 2)
          .strength(0.1)
      )
      .force('collide', 
        forceCollide(d => rScale(d.properties['Total Student Count']) + bubblePadding).strength(0.8)
      )
      .alpha(0.5)
      .alphaMin(0.01)
      .alphaDecay(0.05)
      .velocityDecay(0.4)
      .stop()
    
    // Run manual ticks for immediate positioning
    for (let i = 0; i < 120; ++i) {
      simulation.tick()
    }
    
    // Get the positioned nodes
    nodes = simulation.nodes()
    
    // Initialize tweened values
    initializeTweenedValues()
    
    // Set up ongoing tick handler
    simulation.on('tick', () => {
      nodes = [...simulation.nodes()]
    })
    
    // Mark as initialized and restart
    simulationInitialized = true
    simulation.restart()
  }

  // SEPARATE: Visual updates when index, selection, or highlighted districts change
  $: if (nodes.length > 0 && simulationInitialized && highlightedDistricts && index !== undefined) {
    updateColors()
  }

  $: if (nodes.length > 0 && simulationInitialized && $selectedDistricts) {
    updateOpacities()
  }

  function updateColors() {
    const newColors = nodes.map(node => {
      if (index === 0) {
        return colorScale(node.properties.quartile)
      } else {
        return highlightedDistricts.includes(node.properties.GEOID)
          ? colorScale(node.properties.quartile)
          : colors.colorLightGray
      }
    })
    tweenedColors.set(newColors)
  }

  function updateOpacities() {
    const newOpacities = nodes.map(node => {
      if ($selectedDistricts && $selectedDistricts.includes(node.properties.GEOID)) {
        return 1
      }
      return 0.9
    })
    tweenedOpacities.set(newOpacities)
  }

  // Function to initialize tweened values
  function initializeTweenedValues() {
    const initialColors = nodes.map(node => {
      return colorScale(node.properties.quartile) // Start with all districts colored
    })
    
    const initialOpacities = nodes.map(() => 0.9)
    
    tweenedColors.set(initialColors, { duration: 0 })
    tweenedOpacities.set(initialOpacities, { duration: 0 })
  }

  // Reset simulation when key parameters change (but not index)
  $: {
    if (simulationInitialized && (width || height)) {
      simulationInitialized = false
    }
  }

  // Create derived store only when dependencies are available
  $: visibleLabels = (() => {
    if (!$selectedDistricts || !$selectedDistrictsData || !nodes || nodes.length === 0) {
      return []
    }
    
    if (index < 7) {
      return nodes.filter(node => highlightedDistricts.includes(node.properties.GEOID))
    } else if ($selectedDistricts && $selectedDistricts.length > 0) {
      return nodes.filter(node => $selectedDistricts.includes(node.properties.GEOID))
    }
    return []
  })()

  $: legendWidth = filteredData.length > 0 ? rScale(6000) + 140 : 140
  $: legendHeight = filteredData.length > 0 ? rScale(6000) + 1 : 1

  // Get selected district's x position
  let selectedDistrictX = 0
  $: {
    if ($selectedDistricts && $selectedDistricts.length > 0 && nodes.length > 0 && dimensions.margin) {
      const selectedGEOID = $selectedDistricts[0]
      
      const selectedNode = nodes.find(node => {
        return node.properties.GEOID === selectedGEOID
      })
      
      if (selectedNode && selectedNode.x && !isNaN(selectedNode.x)) {
        selectedDistrictX = selectedNode.x + (dimensions.margin.left || 0)
      } else {
        selectedDistrictX = 0
      }
    } else {
      selectedDistrictX = 0
    }
  }

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

  let largestDistricts = []
  $: if ($stateData && $stateData.length > 0) {
    largestDistricts = $stateData[0].properties.largestDistricts || []
  }

  let neighborDistrictIds = []
  $: {
    if ($selectedDistricts && $selectedDistricts.length > 0 && $selectedDistrictsData && $selectedDistrictsData.length > 0) {
        neighborDistrictIds = $selectedDistrictsData[0].properties.neighbors || []
    } else {
        neighborDistrictIds = []
    }
  }

  let highPerformingLargeDistricts = []
  $: {
    if (filteredData.length > 0) {
      highPerformingLargeDistricts = filteredData
        .filter(district => 
          district.properties['Total Student Count'] >= 500 && 
          district.properties.quartile === 4
        )
        .map(district => district.properties.GEOID)
    }
  }

  let lowPerformingLargeDistricts = []
  $: {
    if (filteredData.length > 0) {
      lowPerformingLargeDistricts = filteredData
        .filter(district => 
          district.properties['Total Student Count'] >= 500 && 
          district.properties.quartile === 1
        )
        .map(district => district.properties.GEOID)
    }
  }

  let highlightedDistricts = []
  $: {
      if ($selectedDistricts && $selectedDistricts.length > 0) {
          if (index < 3) {
              highlightedDistricts = [$primaryDistrictId]
          } else if (index === 3) {
              highlightedDistricts = [$primaryDistrictId, ...largestDistricts]
          } else if (index === 4) {
              highlightedDistricts = [$primaryDistrictId, ...neighborDistrictIds]
          } else if (index === 5) {
              highlightedDistricts = [...highPerformingLargeDistricts]
          } else if (index === 6) {
              highlightedDistricts = [...lowPerformingLargeDistricts]
          } else {
              highlightedDistricts = filteredData.map(d => d.properties.GEOID)
          }
      } else {
          highlightedDistricts = index < 7 ? [] : filteredData.map(d => d.properties.GEOID)
      }
  }

  // Format function for separation time axis
  const formatSeparationTime = (value) => `${Math.round(value)}%`

  // Set dimensions context for Axis component
  $: dimensionsWithInner = {
    ...dimensions,
    innerWidth,
    innerHeight
  }
</script>

<div class="districts-beeswarm" bind:clientWidth={width} bind:clientHeight={height}>
    <SVGChart dimensions={dimensions}>
      {#each nodes as node, i}
          {#if !($selectedDistricts && $selectedDistricts.includes(node.properties.GEOID))}
              <circle
                  cx={node.x}
                  cy={node.y}
                  r={rScale(node.properties['Total Student Count'])}
                  fill={$tweenedColors[i] || colors.colorLightGray}
                  opacity={$tweenedOpacities[i] || 0.9}
                  use:tooltipAction={tooltipContent(node.properties)}
                  style="cursor: pointer; transition: stroke-width 0.3s ease;"
              />
          {/if}
      {/each}
      
      {#each nodes as node, i}
          {#if $selectedDistricts && $selectedDistricts.includes(node.properties.GEOID)}
              <circle
                  cx={node.x}
                  cy={node.y}
                  r={rScale(node.properties['Total Student Count']) + 3}
                  fill="none"
                  stroke={colors.colorDarkGray}
                  stroke-width={2}
                  stroke-opacity={0.3}
                  style="transition: all 0.3s ease;"
              />
              <circle
                  cx={node.x}
                  cy={node.y}
                  r={rScale(node.properties['Total Student Count'])}
                  fill={$tweenedColors[i] || colors.colorLightGray}
                  opacity={$tweenedOpacities[i] || 1}
                  stroke={colors.colorWhite}
                  stroke-width={1}
                  use:tooltipAction={tooltipContent(node.properties)}
                  style="cursor: pointer; transition: all 0.3s ease;"
              />
          {/if}
      {/each}

        {#each visibleLabels as node}
            <text
              x={node.x}
              y={node.y}
              dy=".3em"
              text-anchor="middle"
              fill="white"
              stroke="white"
              stroke-width="5"
              style="font-size: 14px; font-weight:400;"
              transition:fade={{duration: fadeDuration}}
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
              transition:fade={{duration: fadeDuration}}
            >
              {node.properties["Institution Name"]}
            </text>
        {/each}

        {#if index > 1 && filteredData.length > 0}
          <g class="separation-axis" transition:fade={{duration: fadeDuration}}>
            <!-- Axis line -->
            <line 
              x1={0}
              y1={innerHeight}
              x2={innerWidth}
              y2={innerHeight}
              stroke={colors.colorLightGray}
              stroke-width="1"
            />
            
            <!-- Ticks and labels -->
            {#each separationTimeScale.ticks(5) as tick}
              <g transform="translate({separationTimeScale(tick)}, {innerHeight})">
                <line 
                  y2="6" 
                  stroke={colors.colorLightGray}
                  stroke-width="1"
                />
                <text 
                  y="20" 
                  text-anchor="middle"
                  fill={colors.colorText}
                  font-size="12px"
                >
                  {formatSeparationTime(tick)}
                </text>
              </g>
            {/each}

            <!-- Axis label -->
            <text
              x={dimensions.margin.left - 30}
              y={innerHeight + 16}
              text-anchor="start"
              fill={colors.colorText}
              font-size="14px"
              font-weight="600"
            >
              average % of
            </text>
            <text
              x={dimensions.margin.left - 30}
              y={innerHeight + 32}
              text-anchor="start"
              fill={colors.colorText}
              font-size="14px"
              font-weight="600"
            >
              day separated
            </text>
          </g>
        {/if}
  
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
            x={Math.max(50, innerWidth - 50)}
            y={60} 
            text-anchor="end"
            font-size="14px"
            font-weight="600"
            fill={colors.colorText}
          >
            More inclusive &#8594;
          </text>
        </g>
  
        <!-- Circle size legend -->
        {#if rScale && innerWidth > 0 && innerHeight > 0}
          <g class="legend" transform="translate({Math.max(0, innerWidth - legendWidth)}, {Math.max(0, innerHeight - legendHeight - 40)})" transition:fade="{{ duration: fadeDuration}}">
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
              6,000
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
            <text 
              x={rScale(6000) + 10} 
              y={rScale(6000) - (rScale(1000) * 2) + 15} 
              style="font-size: 12px; fill:{colors.colorText}" 
              dominant-baseline="middle"
            >
              students with IEPs
            </text>
          </g>
        {/if}
    </SVGChart>
</div>

<style>
    .districts-beeswarm {
      height: 500px;
      width: 90%;
      margin: 0 auto;
    }

    @media (max-width: 767px) {
      .districts-beeswarm {
        width: 100%;
      }
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