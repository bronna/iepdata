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
        d.properties["Students with Disabilities"] &&
        d.properties.GEOID !== '999999'
    )

    // Create scales
    $: xScale = scaleLinear()
        //.domain(extent(filteredData, d => d.properties["Students with Disabilities"]))
        .domain([10, 23])
        .range([0, dimensions.innerWidth])
        .nice()

    // Create radius scale (using sqrt scale for accurate circle area representation)
    $: rScale = scaleSqrt()
        .domain(extent(filteredData, d => d.properties['Total Student Count']))
        .range(width < 768 ? [2, 26] : [3, 50])

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

    // Force simulation setup with improved parameters
    let nodes = []
    $: {
        const simulation = forceSimulation(filteredData)
            .force('x', forceX(d => xScale(d.properties["Students with Disabilities"]))
                .strength(1.2)) // Increased x-force strength
            .force('y', forceY(dimensions.innerHeight / 2)
                .strength(0.1))
            .force('collide', forceCollide(d => rScale(d.properties['Total Student Count']) + 1)
                .strength(0.8)
                .iterations(4)) // Added more iterations for better collision resolution
            .alpha(0.8) // Increased initial alpha for more movement
            .alphaDecay(0.02) // Slower decay for more simulation time
            .velocityDecay(0.4)
            .stop()

        // Run more simulation ticks for better stabilization
        for (let i = 0; i < 300; ++i) {
            simulation.tick()
        }
        
        nodes = simulation.nodes()
    }
</script>

<div class="swarmplot" bind:clientWidth={width} bind:clientHeight={height}>
    <SVGChart {dimensions}>
        <!-- X-axis -->
        <g class="x-axis">
            <!-- X-axis line -->
            <!-- <line 
                x1={0}
                y1={dimensions.innerHeight}
                x2={dimensions.innerWidth}
                y2={dimensions.innerHeight}
                stroke={colors.colorLightGray}
                stroke-width="1"
            /> -->
            
            <!-- X-axis ticks and labels -->
            {#each xScale.ticks(5) as tick}
                <g transform="translate({xScale(tick)}, {dimensions.innerHeight - 100})">
                    <line 
                        y2="6" 
                        stroke={colors.colorLightGray}
                        stroke-width="1"
                    />
                    <text 
                        y="20" 
                        text-anchor="middle"
                        fill={colors.colorText}
                        font-size="14px"
                    >
                        {tick}%
                    </text>
                </g>
            {/each}

            <!-- X-axis label -->
            <text
                x={dimensions.innerWidth / 2}
                y={dimensions.innerHeight - 50}
                text-anchor="middle"
                fill={colors.colorText}
                font-size="16px"
                font-weight="600"
            >
                % Students with IEPs
            </text>
        </g>

        <!-- Plot points -->
        {#each nodes as node}
            <circle
                cx={node.x}
                cy={node.y}
                r={rScale(node.properties['Total Student Count'])}
                fill={colorScale(node.properties.quartile)}
                opacity="0.85"
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
            y1={180}
            x2={xScale(11)}
            y2={dimensions.innerHeight - 100}
            stroke={colors.colorWhite}
            stroke-width="8"
            opacity="0.4"
        />
        <line
            x1={xScale(11)}
            y1={180}
            x2={xScale(11)}
            y2={dimensions.innerHeight - 100}
            stroke={colors.colorText}
            stroke-width="1.5"
            stroke-dasharray="2"
        />
        <text
            x={xScale(11)}
            y={150}
            text-anchor="middle"
            fill={colors.colorText}
            font-size="16px"
            font-weight="500"
        >
            current state
        </text>
        <text
            x={xScale(11)}
            y={168}
            text-anchor="middle"
            fill={colors.colorText}
            font-size="16px"
            font-weight="500"
        >
            funding cap: 11%
        </text>

        <!-- Add line at proposed state funding -->
        <line
            x1={xScale(15)}
            y1={120}
            x2={xScale(15)}
            y2={dimensions.innerHeight - 100}
            stroke={colors.colorWhite}
            stroke-width="8"
            opacity="0.4"
        />
        <line
            x1={xScale(15)}
            y1={120}
            x2={xScale(15)}
            y2={dimensions.innerHeight - 100}
            stroke={colors.colorText}
            stroke-width="1.5"
            stroke-dasharray="2"
        />
        <text
            x={xScale(15)}
            y={108}
            text-anchor="middle"
            fill={colors.colorText}
            font-size="16px"
            font-weight="500"
        >
            proposed cap: 15% (HB2451)
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