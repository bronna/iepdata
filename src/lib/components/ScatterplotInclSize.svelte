<script>
    import { scaleLinear, scaleSqrt, scaleOrdinal } from 'd3-scale'
    import { extent } from 'd3-array'
    import { colors } from '$lib/styles/colorConfig'
    import { data } from '$lib/stores/stores.js'
    import SVGChart from './SVGChart.svelte'

    export let width = 800
    export let height = 400

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
        d.properties.weighted_inclusion &&
        d.properties.GEOID !== '999999'
    )

    // Create scales
    $: xScale = scaleLinear()
        .domain([0, extent(filteredData, d => d.properties['Total Student Count'])[1]])
        .range([0, dimensions.innerWidth])
        .nice()

    $: yScale = scaleLinear()
        .domain(extent(filteredData, d => d.properties.weighted_inclusion))
        .range([dimensions.innerHeight, 0])
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
</script>

<div class="scatterplot" bind:clientWidth={width} bind:clientHeight={height}>
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
                        {formatNumber(tick)}
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
                Number of Students with IEPs
            </text>
        </g>

        <!-- Y-axis -->
        <g class="y-axis">
            <!-- Y-axis line -->
            <line 
                x1={0}
                y1={0}
                x2={0}
                y2={dimensions.innerHeight}
                stroke={colors.colorLightGray}
                stroke-width="1"
            />
            
            <!-- Y-axis ticks and labels -->
            {#each yScale.ticks(5) as tick}
                <g transform="translate(0, {yScale(tick)})">
                    <line 
                        x2="-6" 
                        stroke={colors.colorLightGray}
                        stroke-width="1"
                    />
                    <text 
                        x="-12" 
                        dy="0.32em" 
                        text-anchor="end"
                        fill={colors.colorText}
                        font-size="12px"
                    >
                        {tick.toFixed(1)}
                    </text>
                </g>
            {/each}

            <!-- Y-axis label -->
            <text
                transform="rotate(-90)"
                x={-dimensions.innerHeight / 2}
                y={-45}
                text-anchor="middle"
                fill={colors.colorText}
                font-size="14px"
                font-weight="600"
            >
                Inclusion Score
            </text>
        </g>

        <!-- Plot points -->
        {#each filteredData as district}
            <circle
                cx={xScale(district.properties['Total Student Count'])}
                cy={yScale(district.properties.weighted_inclusion)}
                r={rScale(district.properties['Total Student Count'])}
                fill={colorScale(district.properties.quartile)}
                opacity="0.8"
                stroke={colors.colorBackgroundWhite}
                stroke-width="1"
            >
                <title>
                    {district.properties['Institution Name']}
                    Students with IEPs: {formatNumber(district.properties['Total Student Count'])}
                    Inclusion Score: {district.properties.weighted_inclusion.toFixed(1)}
                    Quartile: {district.properties.quartile} of 4
                </title>
            </circle>
        {/each}
    </SVGChart>
</div>

<style>
    .scatterplot {
        width: 100%;
        height: 400px;
    }

    circle {
        transition: opacity 0.2s;
    }

    circle:hover {
        opacity: 1;
        cursor: pointer;
    }
</style>