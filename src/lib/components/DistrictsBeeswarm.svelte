<script>
    import { selectedDistricts, hideSmallDistricts } from '$lib/stores/stores.js'

    import { scaleSequential, scaleLinear, scaleSqrt } from 'd3-scale'
    import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force'
    import { extent } from 'd3-array'
    import { interpolateSpectral } from 'd3-scale-chromatic'
    import tippyJs from 'tippy.js'
    import 'tippy.js/dist/tippy.css'

    import SVGChart from './SVGChart.svelte'
    import Axis from './Axis.svelte'

    export let data

    let stateData = data.filter(d => d.properties.GEOID === '999999')[0]
    let minWeightedInclusion = stateData.properties.minWeightedInclusion
    let maxWeightedInclusion = stateData.properties.maxWeightedInclusion

    // Filter out data rows with no "weighted_inclusion" value
    const filteredData = data.filter(d => d.properties.weighted_inclusion !== null && d.properties.weighted_inclusion !== undefined)

    // Color scale
    const colorScale = scaleSequential(interpolateSpectral)
      .domain([minWeightedInclusion, maxWeightedInclusion])

    // Chart dimensions & initial values
    let width = 100
    let height = 100
    let dimensions = {}
    const margin = { top: 0, right: 200, bottom: 20, left: 200 }

    $: dimensions = { 
      width, 
      height, 
      margin,
      innerWidth: width - margin.left - margin.right,
      innerHeight: height - margin.top - margin.bottom
    }
  
    $: xScale = scaleLinear()
      .domain([minWeightedInclusion, maxWeightedInclusion])
      .range([0, dimensions.innerWidth])
  
    $: rScale = scaleSqrt()
      .domain(extent(filteredData, d => d.properties['Total Student Count']))
      .range(width < 568 ? [2, 20] : [3, 50])

    // Force simulation
    let bubblePadding = 2
    const simulation = forceSimulation(filteredData)
    $: {
      simulation
        .force('x',
          forceX()
            .x(d => xScale(d.properties.weighted_inclusion))
            .strength(0.8)
        )
        .force('y',
          forceY()
            .y(height / 2)
            .strength(0.2)
        )
        .force('collide',
          forceCollide()
            .radius(d => rScale(d.properties['Total Student Count']) + bubblePadding)
        )
        .alpha(0.6) // [0, 1] rate at which simulation finishes, decrease if you want more "movement"
        .alphaDecay(0.06) // [0, 1] rate at which alpha approaches 0
        .restart() // restart the simulation
    }

    let nodes = []
    simulation.on("tick", () => {
      nodes = simulation.nodes()
    })

    // Tooltip using tippy.js library
    function tooltipContent(nodeData) {
      return `
        <span style="font-family:'Source Sans 3', sans-serif;"><strong>${nodeData["Institution Name"]}</strong><br>
        Inclusion score: <strong>${nodeData.weighted_inclusion.toFixed(2)}</strong><br>
        <strong>${nodeData["Total Student Count"]}</strong> students with IEPs<br>
        <a class="tooltip-link" href="/${nodeData.GEOID}"><strong>More info >></strong></a></span>
      `
    }

    function tippy(element, nodeContent) {
      // initialize the tooltip
      const tooltipInstance = tippyJs(element, {
        content: nodeContent,
        allowHTML: true,
        interactive: true,
        appendTo: document.body
      })

      return {
          update(newContent) {
            // do something when action data changes
            tooltipInstance.setContent(newContent)
          },

          destroy() {
            tooltipInstance.destroy()
          }
      }
    }
</script>


<div class="districts-beeswarm" bind:clientWidth={width} bind:clientHeight={height}>
    <SVGChart dimensions={dimensions}>
        <Axis scale={xScale} longTick label={"inclusion score"} />
  
        {#each nodes as node}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <circle
              use:tippy={tooltipContent(node.properties)}
              cx={node.x}
              cy={node.y}
              r={rScale(node.properties['Total Student Count'])}
              fill={colorScale(node.properties.weighted_inclusion)}
              opacity={(!node.properties.largeDistrict && $hideSmallDistricts) ? 0.15 : 0.9}
              stroke="black"
              stroke-width="1"
              tabIndex="0"
              on:click={() => selectedDistricts.update(selected => {
                if (selected.includes(node.properties.GEOID)) {
                  return selected.filter(d => d !== node.properties.GEOID)
                } else {
                  return [...selected, node.properties.GEOID]
                }
              })}
            />
        {/each}
  
        {#each nodes as node}
          {#if $selectedDistricts.includes(node.properties.GEOID)}
              <text
                x={node.x}
                y={node.y}
                dy=".3em"
                text-anchor="middle"
                fill="black"
                stroke="white"
                stroke-width="3"
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
          {/if}
        {/each}

        <g class="chart-labels">
          <text 
            x={0}
            y={60} 
            text-anchor="start"
            font-size="14px"
            font-weight="600"
            fill="black"
          >
            &#8592; Less inclusive
          </text>
          <text 
            x={width - margin.right - 240}
            y={60} 
            text-anchor="end"
            font-size="14px"
            font-weight="600"
            fill="black"
          >
            More inclusive &#8594;
          </text>
        </g>
  
        <g class="legend" transform="translate(740, 320)">
          <circle r={rScale(6000)} fill="none" stroke="black" stroke-width="1" />
          <text x="50" y="-30" style="font-size: 12px;">6,000 students</text>
        
          <circle r={rScale(3000)} cy={rScale(6000) - rScale(3000)} fill="none" stroke="black" stroke-width="1" />
          <text x="50" y="0" style="font-size: 12px;">3,000 students</text>
        
          <circle r={rScale(1000)} cy={rScale(6000) - rScale(1000)} fill="none" stroke="black" stroke-width="1" />
          <text x="50" y={30} style="font-size: 12px;">1,000 students</text>
        </g>
    </SVGChart>
</div>


<style>
    .districts-beeswarm {
      height: 400px;
      min-width: 500px;
      width: calc(100% + 1em);
      margin-bottom: 3rem;
    }

    circle:hover {
      opacity: 0.75;
    }

    text {
      pointer-events: none;
    }

    .tooltip-link {
      color: white;
    }
</style>