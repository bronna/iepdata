<script>
    import { selectedDistricts, hideSmallDistricts } from '$lib/stores/stores.js'
    import { scaleSequential, scaleLinear, scaleSqrt } from 'd3-scale'
    import { axisBottom } from 'd3-axis'
    import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force'
    import { extent } from 'd3-array'
    import { select } from 'd3-selection'
    import { interpolateSpectral } from 'd3-scale-chromatic'
    import tippyJs from 'tippy.js'
    import 'tippy.js/dist/tippy.css'

    export let data

    let stateData = data.filter(d => d.properties.GEOID === '999999')[0]
    let minWeightedInclusion = stateData.properties.minWeightedInclusion
    let maxWeightedInclusion = stateData.properties.maxWeightedInclusion

    // Filter out data rows without a "weighted_inclusion" value
    const filteredData = data.filter(d => d.properties.weighted_inclusion !== null && d.properties.weighted_inclusion !== undefined)

    // Color scale
    const colorScale = scaleSequential(interpolateSpectral)
      .domain([minWeightedInclusion, maxWeightedInclusion])

    // Initial values for chart size
    let width = 1200
    let height = 400
    const margin = { top: 0, right: 20, bottom: 20, left: 20 }
    $: innerWidth = width - margin.left - margin.right
    let innerHeight = height - margin.top - margin.bottom
  
    $: xScale = scaleLinear()
      .domain([minWeightedInclusion, maxWeightedInclusion])
      .range([0, innerWidth])
  
    $: rScale = scaleSqrt()
      .domain(extent(filteredData, d => d.properties['Total Student Count']))
      .range(width < 568 ? [2, 20] : [3, 50])

    // const xAxisScale = axisBottom(xScale)
    //   //.ticks(5)
    //   .tickSizeOuter(0)
    //   .tickSizeInner(-300)
    //   .tickPadding(10)
    //   .tickFormat(d => `${d}`)
    // function renderXAxis(node) {
    //   select(node).call(xAxisScale)
    // }

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

    // set up tooltip using tippy.js library
    function tippy(element, nodeData) {
      console.log(nodeData)
      // initialize the tooltip
      const tooltipInstance = tippyJs(element, {
        content: `<strong>${nodeData["Institution Name"]}</strong><br>
          inclusion score<br>
          <strong>${nodeData["Total Student Count"]}</strong> students with IEPs<br>
          <a style="color:white;" href="/${nodeData.GEOID}"><strong>More info >></strong></a>`,
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


<div class="chart-container" bind:clientWidth={width}>
    <svg width={width} height={height}>
      <g class="inner-chart" transform="translate({margin.left}, {margin.top})">
        <!-- <g class="x-axis" transform="translate(0, {height - margin.bottom})">
          <g use:renderXAxis></g>
        </g> -->
        <g>
          <text 
            x={margin.left + 30}
            y={60} 
            text-anchor="start"
            font-size="14px"
            font-weight="600"
            fill="black"
          >
            &#8592; Less inclusive
          </text>
  
          <text 
            x={width - margin.right - 30}
            y={60} 
            text-anchor="end"
            font-size="14px"
            font-weight="600"
            fill="black"
          >
            More inclusive &#8594;
          </text>
        </g>
  
        {#each nodes as node}
            <circle
              use:tippy={node.properties}
              cx={node.x}
              cy={node.y}
              r={rScale(node.properties['Total Student Count'])}
              fill={colorScale(node.properties.weighted_inclusion)}
              opacity={(!node.properties.largeDistrict && $hideSmallDistricts) ? 0.15 : 0.9}
              stroke="black"
              stroke-width="1"
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
  
        <g class="legend" transform="translate(80, 320)">
          <circle r={rScale(6000)} fill="none" stroke="black" stroke-width="1" />
          <text x="50" y="-30" style="font-size: 12px;">6,000 students</text>
        
          <circle r={rScale(3000)} cy={rScale(6000) - rScale(3000)} fill="none" stroke="black" stroke-width="1" />
          <text x="50" y="0" style="font-size: 12px;">3,000 students</text>
        
          <circle r={rScale(1000)} cy={rScale(6000) - rScale(1000)} fill="none" stroke="black" stroke-width="1" />
          <text x="50" y={30} style="font-size: 12px;">1,000 students</text>
        </g>
      </g>
    </svg>
</div>


<style>
    circle:hover {
      opacity: 0.75;
    }

    text {
      pointer-events: none;
    }

    .tooltip-link {
      color: white;
    }

    .domain {
      display: none;
    }

    .tick line {
      stroke: var(--light-gray);
    }
</style>