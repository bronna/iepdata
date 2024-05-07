<script>
    import { selectedDistricts, hideSmallDistricts } from '$lib/stores/stores.js'
    import * as d3 from 'd3'
    import tippyJs from 'tippy.js'
    import 'tippy.js/dist/tippy.css'

    export let data

    let stateData = data.filter(d => d.properties.GEOID === '999999')[0]
    let minWeightedInclusion = stateData.properties.minWeightedInclusion
    let maxWeightedInclusion = stateData.properties.maxWeightedInclusion
    //console.log(minWeightedInclusion, maxWeightedInclusion)

    // Filter out data rows without a "weighted_inclusion" value
    const filteredData = data.filter(d => d.properties.weighted_inclusion !== null && d.properties.weighted_inclusion !== undefined)

    // Color scale
    const colorScale = d3.scaleSequential(d3.interpolateSpectral)
      .domain([minWeightedInclusion, maxWeightedInclusion])

    // Initial values for viz size
    const width = 1200
    const height = 400
    const padding = 40
  
    const xScale = d3.scaleLinear()
      .domain([minWeightedInclusion, maxWeightedInclusion])
      .range([padding, width - padding])
  
    const rScale = d3.scaleLinear()
      .domain(d3.extent(filteredData, d => Math.sqrt(d.properties['Total Student Count'] || 0)))
      .range([3, 50])

    const decileScale = d3.scaleLinear()
      .domain([0, 10])
      .range([padding, width - padding])

    const xAxisScale = d3.axisBottom(xScale)
      //.ticks(5)
      .tickSizeOuter(0)
      .tickSizeInner(-300)
      .tickPadding(10)
      .tickFormat(d => `${d}`)
    function renderXAxis(node) {
      d3.select(node).call(xAxisScale)
    }

    // Force simulation
    const simulation = d3.forceSimulation(filteredData)
      .force('x', d3.forceX(d => xScale(d.properties.weighted_inclusion)).strength(2))
      .force('y', d3.forceY(height / 2))
      .force('collide', d3.forceCollide(d => rScale(Math.sqrt(d.properties['Total Student Count']) || 8) + 2))
      .stop()
    for (let i = 0; i < 300; ++i) simulation.tick()

    // set up tooltip using tippy.js library
    function tippy(element, districtData) {
      // initialize the tooltip
      const tooltipInstance = tippyJs(element, {
        content: `<strong>${districtData["Institution Name"]}</strong><br>
                  inclusion score<br>
                  <strong>${districtData["Total Student Count"]}</strong> students with IEPs<br>
                  <a style="color:white;" href="/${districtData["GEOID"]}"><strong>More info >></strong></a>`,
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


<div id="bubble-chart">
    <svg viewBox="0 0 {width} {height}">
        <g class="x-axis" transform="translate(0, {height - padding})">
          <g use:renderXAxis></g>
        </g>
        <g transform="translate(0, {padding})">
          <text 
            x={50}
            y={60} 
            text-anchor="start"
            font-size="14px"
            font-weight="600"
            fill="black"
          >
          &#8592; Less inclusive
          </text>
  
          <text 
            x={width - 50}
            y={60} 
            text-anchor="end"
            font-size="14px"
            font-weight="600"
            fill="black"
          >
            More inclusive &#8594;
          </text>
        </g>
  
        {#each filteredData as district (district.properties.GEOID)}
          <g transform="translate({district.x},{district.y})">
            <circle
              use:tippy={district.properties}
              r={rScale(Math.sqrt(district.properties['Total Student Count'] || 0))}
              fill={colorScale(district.properties.weighted_inclusion)}
              opacity={(!district.properties.largeDistrict && $hideSmallDistricts) ? 0.15 : 0.9}
              stroke="black"
              stroke-width="1"
              on:click={() => selectedDistricts.update(selected => {
                if (selected.includes(district.properties.GEOID)) {
                  return selected.filter(d => d !== district.properties.GEOID)
                } else {
                  return [...selected, district.properties.GEOID]
                }
              })}
            />
          </g>
        {/each}
  
        {#each filteredData as district (district.properties.GEOID)}
          {#if $selectedDistricts.includes(district.properties.GEOID)}
            <g transform="translate({district.x},{district.y})">
              <text
                dy=".3em"
                text-anchor="middle"
                fill="black"
                stroke="white"
                stroke-width="3"
                style="font-size: 14px; font-weight:400;"
              >
                {district.properties.NAME}
              </text>
              <text
                dy=".3em"
                text-anchor="middle"
                fill="black"
                style="font-size: 14px; font-weight:400;"
              >
                {district.properties.NAME}
              </text>
            </g>
          {/if}
        {/each}
  
        <g class="legend" transform="translate(80, 320)">
          <circle r={rScale(Math.sqrt(6000))} fill="none" stroke="black" stroke-width="1" />
          <text x="50" y="-30" style="font-size: 12px;">6,000 students</text>
        
          <circle r={rScale(Math.sqrt(3000))} cy={rScale(Math.sqrt(6000)) - rScale(Math.sqrt(3000))} fill="none" stroke="black" stroke-width="1" />
          <text x="50" y="0" style="font-size: 12px;">3,000 students</text>
        
          <circle r={rScale(Math.sqrt(1000))} cy={rScale(Math.sqrt(6000)) - rScale(Math.sqrt(1000))} fill="none" stroke="black" stroke-width="1" />
          <text x="50" y={30} style="font-size: 12px;">1,000 students</text>
        </g>
    </svg>
</div>


<style>
    #bubble-chart {
        width: 100vw;
    }

    svg {
        width: 100%;
        height: 100%;
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

    .domain {
      display: none;
    }

    .tick line {
      stroke: var(--light-gray);
    }
</style>