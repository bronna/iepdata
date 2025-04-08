<script>
    import { scaleLinear, scaleSqrt, scaleOrdinal } from 'd3-scale'
    import { extent } from 'd3-array'
    import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force'
    import { colors } from '$lib/styles/colorConfig'
    import { data } from '$lib/stores/stores.js'
    import { Search } from 'lucide-svelte'
    import { writable, derived } from "svelte/store"
    import SVGChart from './SVGChart.svelte'

    const searchTermStore = writable('')
    let searchInputValue = ''

    // Update search term store when input changes
    $: {
        searchTermStore.set(searchInputValue)
    }

    // Clear search function
    function clearSearch() {
        searchInputValue = ''
        searchTermStore.set('')
    }

    export let width = 1200
    export let height = 800

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
        .domain([8, 22])
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

    // Find the 5 largest districts by "Total Student Count"
    $: largestDistricts = filteredData
        .sort((a, b) => b.properties['Total Student Count'] - a.properties['Total Student Count'])
        .slice(0, 5)
        .map(district => district.properties.GEOID)

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

<!-- Search bar above chart -->
<div class="search-container">
    <div class="search-input-container">
        <div class="search-icon-wrapper">
            <Search size={20} color="var(--colorMediumGray)" />
        </div>
        <input
            type="text"
            bind:value={searchInputValue}
            placeholder="Search for a district..."
            class="search-input"
        />
        {#if searchInputValue}
            <button class="clear-button" on:click={clearSearch}>✕</button>
        {/if}
    </div>
</div>

<div class="swarmplot" bind:clientWidth={width} bind:clientHeight={height}>
    <SVGChart {dimensions}>
        <!-- X-axis -->
        <g class="x-axis">
            <!-- X-axis ticks and labels -->
            {#each xScale.ticks(5) as tick}
                <g transform="translate({xScale(tick)}, {dimensions.innerHeight - 20})">
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
                x="-10"
                y={dimensions.innerHeight + 25}
                text-anchor="start"
                fill={colors.colorText}
                font-size="14px"
                font-weight="600"
            >
                % students with IEPs
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
        
        <!-- Labels for the 5 largest districts -->
        {#each nodes as node}
            {#if largestDistricts.includes(node.properties.GEOID)}
                <!-- White background for text readability -->
                <text
                    x={node.x}
                    y={node.y}
                    text-anchor="middle"
                    dominant-baseline="middle"
                    fill="white"
                    stroke="white"
                    stroke-width="4"
                    opacity="0.75"
                    stroke-linejoin="round"
                    font-size="12px"
                    font-weight="700"
                    pointer-events="none"
                >
                    {node.properties['Institution Name']}
                </text>
                <!-- Actual text label -->
                <text
                    x={node.x}
                    y={node.y}
                    text-anchor="middle"
                    dominant-baseline="middle"
                    fill={colors.colorText}
                    font-size="12px"
                    font-weight="700"
                    pointer-events="none"
                >
                    {node.properties['Institution Name']}
                </text>
            {/if}
        {/each}

        <!-- Add line at current state funding -->
        <line
            x1={xScale(11)}
            y1={10}
            x2={xScale(11)}
            y2={dimensions.innerHeight - 80}
            stroke={colors.colorBackgroundWhite}
            stroke-width="6"
            opacity="0.3"
        />
        <line
            x1={xScale(11)}
            y1={10}
            x2={xScale(11)}
            y2={dimensions.innerHeight - 80}
            stroke={colors.colorDarkGray}
            stroke-width="2"
            stroke-dasharray="4 2"
        />
        <rect
            x={xScale(11) - 120}
            y={10}
            width="240"
            height="84"
            fill="white"
            rx="5"
            ry="5"
        />
        <text
            x={xScale(11)}
            y={20}
            text-anchor="middle"
            fill={colors.colorText}
            font-size="16px"
            font-weight="500"
        >
            <tspan x={xScale(11)} dy="0"><tspan font-weight="bold">Oregon</tspan> caps funding for</tspan>
            <tspan x={xScale(11)} dy="1.3em">students with disabilities at</tspan>
            <tspan x={xScale(11)} dy="1.3em"><tspan font-weight="bold">11%</tspan> of a district's population</tspan>
            <tspan x={xScale(11)} dy="1.3em">needing supports</tspan>
        </text>

        <!-- Add line at proposed state funding -->
        <line
            x1={xScale(15)}
            y1={10}
            x2={xScale(15)}
            y2={dimensions.innerHeight - 80}
            stroke={colors.colorBackgroundWhite}
            stroke-width="6"
            opacity="0.3"
            />
        <line
            x1={xScale(15)}
            y1={10}
            x2={xScale(15)}
            y2={dimensions.innerHeight - 80}
            stroke={colors.colorDarkGray}
            stroke-width="2"
            opacity="0.5"
            stroke-dasharray="4 2"
        />
        <rect
            x={xScale(15) - 80}
            y={10}
            width="160"
            height="40"
            fill="white"
            rx="5"
            ry="5"
        />
        <text
            x={xScale(15)}
            y={20}
            text-anchor="middle"
            fill={colors.colorText}
            font-size="16px"
            font-weight="500"
        >
            <tspan x={xScale(15)} dy="0">Some have suggested</tspan>
            <tspan x={xScale(15)} dy="1.3em">a <tspan font-weight="bold">15%</tspan> cap</tspan>
        </text>

        <!--Add annotation-->
        <text
            x={xScale(19)}
            y={20}
            text-anchor="start"
            fill={colors.colorText}
            font-size="16px"
            font-weight="500"
        >
            <tspan x={xScale(19)} dy="0">For <tspan font-weight="bold">Portland Public</tspan></tspan>
            <tspan x={xScale(19)} dy="1.3em">and <tspan font-weight="bold">Salem-Keizer</tspan>,</tspan>
            <tspan x={xScale(19)} dy="1.3em">two of the largest</tspan>
            <tspan x={xScale(19)} dy="1.3em">districts in the state,</tspan>
            <tspan x={xScale(19)} dy="1.3em"><tspan font-weight="bold">18%</tspan> of students</tspan>
            <tspan x={xScale(19)} dy="1.3em">qualify for special</tspan>
            <tspan x={xScale(19)} dy="1.3em">education supports</tspan>
        </text>
    </SVGChart>
</div>

<style>
    /* search bar styles */
    .search-container {
        margin: 2rem auto 0.5rem auto;
        max-width: 90%;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .search-input-container {
        width: 300px;
    }

    @media (max-width: 768px) {
        .search-input-container {
            width: 100%;
        }
    }

    .search-input-container {
        position: relative;
        display: flex;
        align-items: center;
        max-width: 100%;
    }

    .search-icon-wrapper {
        position: absolute;
        left: 1rem;
        display: flex;
        align-items: center;
        pointer-events: none;
    }

    .search-input {
        width: 100%;
        padding: 0.8rem 2.5rem;
        font-size: 1rem;
        border: 2px solid var(--colorLightGray);
        border-radius: 8px;
        transition: border-color 0.3s ease;
    }

    .search-input:focus {
        outline: none;
        border-color: var(--colorInclusive);
    }

    .clear-button {
        position: absolute;
        right: 1rem;
        background: none;
        border: none;
        color: var(--colorMediumGray);
        cursor: pointer;
        font-size: 1.2rem;
        padding: 0.25rem;
    }

    .clear-button:hover {
        color: var(--colorText);
    }

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