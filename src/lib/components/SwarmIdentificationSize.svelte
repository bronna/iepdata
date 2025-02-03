<script>
    import { scaleLinear, scaleSqrt, scaleOrdinal } from 'd3-scale'
    import { extent } from 'd3-array'
    import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force'
    import { colors } from '$lib/styles/colorConfig'
    import { data } from '$lib/stores/stores.js'
    import SVGChart from './SVGChart.svelte'

    export let width = 1200
    export let height = 600

    let dimensions = {
        width,
        height,
        margin: { top: 40, right: 40, bottom: 60, left: 60 },
        innerWidth: 0,
        innerHeight: 0
    }

    $: {
        dimensions.innerWidth = width - dimensions.margin.left - dimensions.margin.right
        dimensions.innerHeight = height - dimensions.margin.top - dimensions.margin.bottom
    }

    // Filter out districts with missing data
    $: filteredData = $data.filter(d => 
        d.properties['Total Student Count'] && 
        // d.properties["Students with Disabilities"] &&
        d.properties.GEOID !== '999999'
    )

    // Create scales
    $: xScale = scaleLinear()
        .domain(extent(filteredData, d => d.properties["Students with Disabilities"]))
        .range([0, dimensions.innerWidth])
        .nice()

    // Create radius scale (using sqrt scale for accurate circle area representation)
    $: rScale = scaleSqrt()
        .domain(extent(filteredData, d => d.properties['Total Student Count']))
        .range(width < 768 ? [2, 20] : [3, 50])

    // Create color scale for quartiles
    const colorScale = scaleOrdinal()
        .domain([1, 2, 3, 4])
        .range([
            colors.colorSeparate,
            colors.colorNonInclusive, 
            colors.colorSemiInclusive, 
            colors.colorInclusive
        ])

    // Format numbers with commas
    const formatNumber = num => num.toLocaleString()

    // Force simulation setup
    let nodes = []
    $: {
        const simulation = forceSimulation(filteredData)
            .force('x', forceX(d => xScale(d.properties["Students with Disabilities"])).strength(1))
            .force('y', forceY(dimensions.innerHeight / 2).strength(0.1))
            .force('collide', forceCollide(d => rScale(d.properties['Total Student Count']) + 1))
            .stop()

        // Run the simulation
        for (let i = 0; i < 120; ++i) simulation.tick()
        
        nodes = simulation.nodes()
    }
</script>

<div class="swarmplot" bind:clientWidth={width} bind:clientHeight={height}>
    <SVGChart {dimensions}>
        <!-- X-axis -->
        <g class="x-axis">
            <!-- X-axis line -->
            <line 
                x1={0}
                y1={dimensions.innerHeight}
                x2={dimensions.innerWidth}
                y2={dimensions.innerHeight}
                stroke={colors.colorLightGray}
                stroke-width="1"
            />
            
            <!-- X-axis ticks and labels -->
            {#each xScale.ticks(5) as tick}
                <g transform="translate({xScale(tick)}, {dimensions.innerHeight})">
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
                        {tick}%
                    </text>
                </g>
            {/each}

            <!-- X-axis label -->
            <text
                x={dimensions.innerWidth / 2}
                y={dimensions.innerHeight + 45}
                text-anchor="middle"
                fill={colors.colorText}
                font-size="14px"
                font-weight="600"
            >
                % of students in district with an IEP
            </text>
        </g>

        <!-- Plot points -->
        {#each nodes as node}
            <circle
                cx={node.x}
                cy={node.y}
                r={rScale(node.properties['Total Student Count'])}
                fill={colorScale(node.properties.quartile)}
                opacity="0.8"
                stroke={colors.colorBackgroundWhite}
                stroke-width="1"
            >
                <title>
                    {node.properties['Institution Name']}
                    Students with IEPs: {formatNumber(node.properties['Total Student Count'])}
                    Percent Students with IEPs: {node.properties["Students with Disabilities"]}%
                    Quartile: {node.properties.quartile} of 4
                </title>
            </circle>
        {/each}

        <!-- Add line at current state funding -->
        <line
            x1={xScale(11)}
            y1={0}
            x2={xScale(11)}
            y2={dimensions.innerHeight}
            stroke={colors.colorWhite}
            stroke-width="4"
            opacity="0.6"
        />
        <line
            x1={xScale(11)}
            y1={0}
            x2={xScale(11)}
            y2={dimensions.innerHeight}
            stroke={colors.colorText}
            stroke-width="1.25"

        />
        <text
            x={xScale(11)}
            y={-10}
            text-anchor="middle"
            fill={colors.colorText}
            font-size="16px"
        >
            current state funding cap: 11%
        </text>

        <!-- Add line at proposed state funding -->
        <line
            x1={xScale(14)}
            y1={-20}
            x2={xScale(14)}
            y2={dimensions.innerHeight}
            stroke={colors.colorWhite}
            stroke-width="4"
            opacity="0.6"
        />
        <line
            x1={xScale(14)}
            y1={-20}
            x2={xScale(14)}
            y2={dimensions.innerHeight}
            stroke={colors.colorText}
            stroke-width="1.25"

        />
        <text
            x={xScale(14)}
            y={-28}
            text-anchor="middle"
            fill={colors.colorText}
            font-size="16px"
        >
            proposed state funding cap: 14%
        </text>
    </SVGChart>
</div>

<style>
    .swarmplot {
        width: 100%;
        height: 600px;
    }

    circle {
        transition: opacity 0.2s;
    }

    circle:hover {
        opacity: 1;
        cursor: pointer;
    }
</style>