<script>
    import { onMount, afterUpdate } from 'svelte'
    import { scaleLinear, scaleSqrt, scaleOrdinal } from 'd3-scale'
    import { extent } from 'd3-array'
    import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force'
    import { colors } from '$lib/styles/colorConfig'
    import { data, selectedDistricts } from '$lib/stores/stores.js'
    import { Search } from 'lucide-svelte'
    import { writable, derived } from "svelte/store"
    import { goto } from '$app/navigation'
    import SVGChart from './SVGChart.svelte'

    const searchTermStore = writable('')
    let searchInputValue = ''
    let searchResults = []
    const maxResults = 5

    let labelLineHeight = "1.2em"

    // Update search term store when input changes
    $: {
        searchTermStore.set(searchInputValue)
        if (searchInputValue.length > 2) {
            searchResults = $data
                .filter(d => 
                    d.properties["Institution Name"] && 
                    d.properties.GEOID !== '999999' &&
                    d.properties["Institution Name"].toLowerCase().includes(searchInputValue.toLowerCase())
                )
                .slice(0, maxResults)
        } else {
            searchResults = []
        }
    }

    // Clear search function
    function clearSearch() {
        searchInputValue = ''
        searchTermStore.set('')
        searchResults = []
    }

    // Handle district selection - Fixed function
    function selectDistrict(districtGEOID) {
        selectedDistricts.set([districtGEOID]) // Set as array, not string
        clearSearch()
        // Navigate to district details if needed
        // goto(`/${districtGEOID}`)
    }

    export let width = 1200
    export let height = 800
    let initialized = false
    let isMobile = false

    // Keep the fixed domain as in the original
    const fixedDomain = [8, 22];

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
        // Detect mobile screen size
        isMobile = width < 640
    }

    // Filter out districts with missing data
    $: filteredData = $data.filter(d => 
        d.properties['Total Student Count'] && 
        d.properties["Students with Disabilities"] &&
        d.properties.GEOID !== '999999'
    )

    // Create scales with fixed domain
    $: xScale = scaleLinear()
        .domain(fixedDomain)
        .range([0, dimensions.innerWidth])
        .nice()

    // Create radius scale (using sqrt scale for accurate circle area representation)
    $: rScale = scaleSqrt()
        .domain(extent(filteredData, d => d.properties['Total Student Count']))
        .range(isMobile ? [2, 20] : [3, 50])

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

    // Store the original viewport dimensions used to initialize the simulation
    let initialWidth = 0;
    let initialHeight = 0;
    
    // Force simulation setup
    let nodes = [];
    let simulation;

    // Get the selected district data - Fixed to use proper store syntax
    $: selectedDistrictGEOID = $selectedDistricts && $selectedDistricts.length > 0 ? $selectedDistricts[0] : null;

    function runSimulation() {
        if (!filteredData.length || !dimensions.innerWidth) return;
        
        // Store initial dimensions - important for consistent scaling
        if (initialWidth === 0) {
            initialWidth = dimensions.innerWidth;
        }
        if (initialHeight === 0) {
            initialHeight = dimensions.innerHeight;
        }
        
        // Create a fresh copy of the data each time
        const simulationData = filteredData.map(d => ({...d}));
        
        // Always stop previous simulation if it exists
        if (simulation) {
            simulation.stop();
        }
        
        // Create a new simulation
        simulation = forceSimulation(simulationData)
            .force('x', forceX(d => {
                // Use the original scale behavior - don't clamp values
                return xScale(d.properties["Students with Disabilities"]);
            }).strength(1.0))
            .force('y', forceY(dimensions.innerHeight / 2).strength(0.1))
            .force('collide', forceCollide(d => rScale(d.properties['Total Student Count']) + 1)
                .strength(0.8)
                .iterations(4))
            .alpha(0.8)
            .alphaDecay(0.02)
            .velocityDecay(0.4)
            .stop();

        // Run simulation ticks
        for (let i = 0; i < 300; ++i) {
            simulation.tick();
        }
        
        nodes = [...simulationData];
    }

    // Watch for changes and re-run simulation when necessary
    $: {
        if (width && height && filteredData.length) {
            runSimulation();
        }
    }

    // Watch for changes to selectedDistrict and highlight it - Fixed
    $: {
        if (initialized && selectedDistrictGEOID && nodes.length) {
            // Update nodes to highlight the selected district
            nodes = nodes.map(node => ({
                ...node,
                isSelected: node.properties.GEOID === selectedDistrictGEOID
            }));
        }
    }

    // Determine which districts should show labels based on screen size
    $: visibleLabels = isMobile ? 
        // On mobile, show fewer labels to avoid overlap
        largestDistricts.slice(0, 2) :
        // On desktop, show all large districts
        largestDistricts;

    onMount(() => {
        initialized = true;
        runSimulation();
    });
</script>

<div class="swarmplot" bind:clientWidth={width} bind:clientHeight={height}>
    <!-- Search bar positioned on the right side of the chart -->
    <div class="search-container">
        <div class="search-input-container">
            <div class="search-icon-wrapper">
                <Search size={20} color="var(--colorMediumGray)" />
            </div>
            <input
                type="text"
                bind:value={searchInputValue}
                placeholder="Search for your district..."
                class="search-input"
            />
            {#if searchInputValue}
                <button class="clear-button" on:click={clearSearch}>✕</button>
            {/if}
        </div>
        
        <!-- Search results dropdown -->
        {#if searchResults.length > 0}
            <div class="search-results">
                {#each searchResults as result}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div 
                        class="search-result-item {selectedDistrictGEOID === result.properties.GEOID ? 'selected' : ''}"
                        on:click={() => selectDistrict(result.properties.GEOID)}
                    >
                        <div class="result-name">{result.properties["Institution Name"]}</div>
                        <div class="result-details">
                            {result.properties["Students with Disabilities"]}% students with IEPs
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
    <!-- Use overflow: visible on the SVG to allow elements to render outside bounds -->
    <svg 
        width={dimensions.width} 
        height={dimensions.height} 
        style="overflow: visible;"
    >
        <g transform={`translate(${dimensions.margin.left}, ${dimensions.margin.top})`}>
            <!-- X-axis -->
            <g class="x-axis">
                <!-- X-axis ticks and labels -->
                {#each xScale.ticks(isMobile ? 3 : 5) as tick}
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
                            font-size={isMobile ? "12px" : "14px"}
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
                    font-size={isMobile ? "12px" : "14px"}
                    font-weight="600"
                    letter-spacing="0.01rem"
                >
                    % Students with IEPs
                </text>
            </g>

            <!-- Plot points -->
            {#if initialized && nodes.length}
                {#each nodes as node}
                    <!-- Only show circles (not labels) by default -->
                    <circle
                        cx={node.x}
                        cy={node.y}
                        r={rScale(node.properties['Total Student Count'])}
                        fill={colorScale(node.properties.quartile)}
                        opacity={node.isSelected ? 1 : 0.9}
                        stroke={node.isSelected ? colors.colorText : colors.colorBackgroundWhite}
                        stroke-width={node.isSelected ? 3 : 1}
                        on:click={() => selectDistrict(node.properties.GEOID)}
                        style="cursor: pointer;"
                    >
                        <title>
                            {node.properties['Institution Name']}
                            Students with IEPs: {formatNumber(node.properties['Total Student Count'])}
                            Percent Students with IEPs: {node.properties["Students with Disabilities"]}%
                        </title>
                    </circle>
                {/each}
            {/if}
            
            <!-- Labels only for selected district or the largest districts - limited based on screen size -->
            {#if initialized && nodes.length}
                {#each nodes as node}
                    {#if (visibleLabels.includes(node.properties.GEOID) || node.isSelected)}
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
                            font-size={isMobile ? "10px" : "12px"}
                            font-weight="700"
                            pointer-events="none"
                        >
                            {isMobile ? 
                                // Shorter name on mobile (truncate if needed)
                                (node.properties['Institution Name'].length > 15 
                                    ? node.properties['Institution Name'].slice(0, 15) + '...' 
                                    : node.properties['Institution Name'])
                                : node.properties['Institution Name']
                            }
                        </text>
                        <!-- Actual text label -->
                        <text
                            x={node.x}
                            y={node.y}
                            text-anchor="middle"
                            dominant-baseline="middle"
                            fill={colors.colorText}
                            font-size={isMobile ? "10px" : "12px"}
                            font-weight="700"
                            pointer-events="none"
                        >
                            {isMobile ? 
                                // Shorter name on mobile (truncate if needed)
                                (node.properties['Institution Name'].length > 15 
                                    ? node.properties['Institution Name'].slice(0, 15) + '...' 
                                    : node.properties['Institution Name'])
                                : node.properties['Institution Name']
                            }
                        </text>
                    {/if}
                {/each}
            {/if}

            <!-- Add line at current state funding with responsive layout -->
            <line
                x1={xScale(11)}
                y1={10}
                x2={xScale(11)}
                y2={dimensions.innerHeight}
                stroke={colors.colorBackgroundWhite}
                stroke-width="6"
                opacity="0.3"
            />
            <line
                x1={xScale(11)}
                y1={10}
                x2={xScale(11)}
                y2={dimensions.innerHeight}
                stroke={colors.colorDarkGray}
                stroke-width="2"
                stroke-dasharray="4 2"
            />

            <!-- Use responsive annotation for current funding line -->
            <rect
                x={isMobile ? (xScale(11) - 60) : (xScale(11) - 120)}
                y={0}
                width={isMobile ? 120 : 240}
                height={isMobile ? 64 : 84}
                fill="white"
            />
            <text
                x={xScale(11)}
                y={10}
                text-anchor="middle"
                fill={colors.colorText}
                font-size={isMobile ? "12px" : "16px"}
                font-weight="500"
            >
                <tspan x={xScale(11)} dy={labelLineHeight}>Current <tspan font-weight="bold">11%</tspan> special</tspan>
                <tspan x={xScale(11)} dy={labelLineHeight}>education <tspan font-weight="bold">funding cap</tspan></tspan>
            </text>

            <!-- Note for districts not pictured -->
            {#if !isMobile}
                <text
                    x={xScale(19)}
                    y={380}
                    text-anchor="start"
                    fill={colors.colorText}
                    font-size="16px"
                    font-weight="500"
                >
                    <tspan x={xScale(19)} dy="0"><tspan font-weight="700">Riddle:</tspan> 25% students with IEPs &#x2192;</tspan>
                    <tspan x={xScale(19)} dy={labelLineHeight}><tspan font-weight="700">North Lake:</tspan> 27% &#x2192;</tspan>
                    <tspan x={xScale(19)} dy={labelLineHeight}><tspan font-weight="700">Butte Falls:</tspan> 32% &#x2192;</tspan>
                    <tspan x={xScale(19)} dy={labelLineHeight}><tspan font-weight="700">ODE YCEP:</tspan> 49% &#x2192;</tspan>
                </text>
            {/if}
        </g>
    </svg>
</div>

<style>
    /* search bar styles - positioned on the right side of the chart */
    .search-container {
        position: absolute;
        top: 2rem;
        right: 2rem;
        width: 300px;
        display: flex;
        flex-direction: column;
        z-index: 10;
    }

    .search-input-container {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
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
        background-color: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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

    /* Search results dropdown */
    .search-results {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: white;
        border: 1px solid var(--colorLightGray);
        border-radius: 0 0 8px 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10;
        max-height: 300px;
        overflow-y: auto;
    }

    .search-result-item {
        padding: 0.75rem 1rem;
        cursor: pointer;
        border-bottom: 1px solid var(--colorLightGray);
        transition: background-color 0.2s ease;
    }

    .search-result-item:last-child {
        border-bottom: none;
    }

    .search-result-item:hover,
    .search-result-item.selected {
        background-color: var(--colorLightLightGray);
    }

    .result-name {
        font-weight: 600;
        margin-bottom: 0.25rem;
    }

    .result-details {
        font-size: 0.85rem;
        color: var(--colorDarkGray);
    }

    .swarmplot {
        width: 100%;
        height: 600px;
        position: relative;
    }

    svg {
        position: absolute;
        top: 0;
        left: 0;
    }

    circle {
        transition: opacity 0.2s, stroke-width 0.2s;
    }

    circle:hover {
        opacity: 1;
        stroke-width: 2px;
        stroke: var(--colorText);
    }

    /* Mobile-specific styles */
    @media (max-width: 768px) {
        .search-container {
            top: 1rem;
            right: 1rem;
            left: 1rem;
            width: auto;
        }
        
        .swarmplot {
            height: 400px; /* Smaller height on mobile */
        }
    }

    @media (max-width: 640px) {
        .search-container {
            position: relative;
            top: 0;
            right: 0;
            left: 0;
            margin: 2rem 1rem 0.5rem 1rem;
        }
    }
</style>