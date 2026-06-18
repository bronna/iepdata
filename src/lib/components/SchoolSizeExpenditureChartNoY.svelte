<script>
    import { onMount } from 'svelte';
    import { scaleLinear, scaleSqrt, scaleOrdinal } from 'd3-scale';
    import { extent } from 'd3-array';
    import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force';
    import { colors } from '$lib/styles/colorConfig';
    import SVGChart from '$lib/components/SVGChart.svelte';

    // Import the data
    import smallSchoolsData from '$lib/data/small_schools.json';

    export let width = 1200;
    export let height = 300; // Reduced height since no y-axis

    // Add school year selector with default value
    export let selectedYear = "2023-2024"; // Default to newest year

    // Get unique school years from the data
    let availableYears = [...new Set(smallSchoolsData
        .map(school => school["School Year"]))].sort().reverse();

    // Filter data by selected year
    $: filteredYearData = smallSchoolsData.filter(school => 
        school["School Year"] === selectedYear
    );

    // Process the data to parse numeric values
    $: processedData = filteredYearData.map(school => {
        // Create a derived name field for display that's more compact
        let shortName = school.School
            .replace(" Primary School", "")
            .replace(" Middle School", "")
            .replace(" High School", "")
            .replace(" School", "");

        // Apply specific name customizations
        if (shortName === "West Linn") shortName = "West Linn High";
        if (shortName === "Wilsonville") shortName = "Wilsonville High";
        if (shortName === "Inza R Wood") shortName = "Wood";
        if (shortName === "Cedaroak Park") shortName = "Cedaroak";
        if (shortName === "Trillium Creek") shortName = "Trillium";
        if (shortName === "Rosemont Ridge") shortName = "Rosemont";
        if (shortName === "Boeckman Creek") shortName = "Boeckman";
        if (shortName === "Athey Creek") shortName = "Athey";
        if (shortName === "Meridian Creek") shortName = "Meridian";

        // Parse relevant metrics
        const expenditure = parseInt(school["Per Pupil Spending"].replace(/\$|,/g, ''));
        const enrollment = parseFloat(school["Total School Enrollment"] || 0);

        return {
            ...school,
            shortName,
            expenditure,
            enrollment
        };
    });

    let dimensions = {
        width,
        height,
        margin: { top: 40, right: 200, bottom: 80, left: 20 },
        innerWidth: 0,
        innerHeight: 0
    };

    $: {
        dimensions.innerWidth = width - dimensions.margin.left - dimensions.margin.right;
        dimensions.innerHeight = height - dimensions.margin.top - dimensions.margin.bottom;
    }

    // Create scales - only x-axis scale needed
    $: spendingDomain = processedData.length === 0 
        ? [15000, 25000] 
        : (() => {
            const spendingExtent = extent(processedData, d => d.expenditure);
            const padding = (spendingExtent[1] - spendingExtent[0]) * 0.1; // 10% padding
            return [spendingExtent[0] - padding, spendingExtent[1] + padding];
        })();

    $: xScale = scaleLinear()
        .domain(spendingDomain)
        .range([0, dimensions.innerWidth])

    // Create radius scale for dots - proportional areas
    $: maxEnrollment = processedData.length === 0 
        ? 2000 
        : Math.max(...processedData.map(d => d.enrollment));

    $: rScale = scaleSqrt()
        .domain([0, maxEnrollment])
        .range([0, 35])

    // Format numbers with commas
    const formatNumber = num => num.toLocaleString();
    const formatMoney = value => `$${value.toLocaleString()}`;

    // Tooltip state
    let tooltipVisible = false;
    let tooltipData = null;
    let tooltipX = 0;
    let tooltipY = 0;

    // Handle tooltip display
    function showTooltip(school, event) {
        tooltipData = school;
        tooltipX = event.offsetX + 15;
        tooltipY = event.offsetY - 10;
        
        // Make sure tooltip stays in view
        const tooltipWidth = 250;
        const tooltipHeight = 100;
        
        // Check right boundary
        if (tooltipX + tooltipWidth > width) {
            tooltipX = tooltipX - tooltipWidth - 30;
        }
        
        // Check bottom boundary
        if (tooltipY + tooltipHeight > height) {
            tooltipY = tooltipY - tooltipHeight;
        }
        
        tooltipVisible = true;
    }

    function hideTooltip() {
        tooltipVisible = false;
    }

    // Force simulation data
    let simulationData = [];
    let simulation;

    // Run force simulation when data or dimensions change
    $: if (processedData.length > 0 && dimensions.innerWidth > 0) {
        runForceSimulation();
    }

    function runForceSimulation() {
        // Initialize simulation data with x positions based on spending
        simulationData = processedData.map(school => ({
            ...school,
            x: xScale(school.expenditure),
            y: dimensions.innerHeight / 2, // Start in center
            radius: Math.max(rScale(school.enrollment), 3)
        }));

        // Stop any existing simulation
        if (simulation) {
            simulation.stop();
        }

        // Create new simulation
        simulation = forceSimulation(simulationData)
            .force('x', forceX(d => xScale(d.expenditure)).strength(1)) // Strong x positioning based on spending
            .force('y', forceY(dimensions.innerHeight / 2).strength(0.07)) // Weak y centering
            .force('collide', forceCollide(d => d.radius + 0.8).strength(0.8)) // Collision detection with padding
            .on('tick', () => {
                // Constrain y positions to stay within chart bounds
                simulationData.forEach(d => {
                    d.y = Math.max(d.radius, Math.min(dimensions.innerHeight - d.radius, d.y));
                });
                // Trigger reactivity
                simulationData = [...simulationData];
            });

        // Run simulation for a bit then stop
        simulation.tick(200);
        simulation.stop();
    }
</script>

<div class="chart-container" bind:clientWidth={width}>
    <div class="controls">
        <h2 class="text-width">Per Pupil Spending Distribution</h2>
        
        <div class="selectors">
            <div class="year-selector">
                <label for="year-select">School Year:</label>
                <select id="year-select" bind:value={selectedYear}>
                    {#each availableYears as year}
                        <option value={year}>{year}</option>
                    {/each}
                </select>
            </div>
        </div>
    </div>

    <div class="chart-title">
        <h2 class="text-width">Per Pupil Spending - WLWV Schools</h2>
    </div>
    
    <div class="scatterplot">
        <SVGChart {dimensions}>
            <!-- X-axis -->
            <g class="x-axis">
                
                <!-- X-axis ticks and labels -->
                {#each xScale.ticks(5) as tick}
                    <g transform="translate({xScale(tick)}, {dimensions.innerHeight})">
                        <line 
                            y1="-220"
                            y2="20" 
                            stroke={colors.colorLightGray}
                            stroke-width="0.5"
                        />
                        <text 
                            y="40" 
                            text-anchor="middle"
                            fill={colors.colorText}
                            font-size="16px"
                            font-weight="600"
                        >
                            {formatMoney(tick)}
                        </text>
                    </g>
                {/each}
            </g>

            <!-- Data points - circles only -->
            {#each simulationData as school}
                <g 
                    class="data-point"
                    on:mouseenter={(e) => showTooltip(school, e)}
                    on:mouseleave={hideTooltip}
                >
                    <circle
                        cx={school.x || xScale(school.expenditure)}
                        cy={school.y || dimensions.innerHeight / 2}
                        r={Math.max(school.radius || rScale(school.enrollment), 3)}
                        fill="#ff9900"
                        opacity="0.8"
                        stroke={colors.colorBackgroundWhite}
                        stroke-width="1"
                    />
                </g>
            {/each}

            <!-- Labels drawn after circles to ensure they're on top -->
            {#each simulationData as school}
                <g>
                    <!-- Add school names directly on chart for clarity -->
                    {#if school.shortName === 'West Linn High' || school.shortName === 'Wilsonville High'}
                        <!-- Two-line labels for high schools -->
                        <text
                            x={school.x || xScale(school.expenditure)}
                            y={school.shortName.includes('Riverside') ? 
                                (school.y || dimensions.innerHeight / 2) - (school.radius || rScale(school.enrollment)) - 12 :
                                (school.y || dimensions.innerHeight / 2) - 2}
                            text-anchor="middle"
                            font-size="12px"
                            fill={colors.colorWhite}
                            font-weight="600"
                            stroke={colors.colorWhite}
                            stroke-width="2"
                            pointer-events="none"
                        >
                            {school.shortName.replace(' High', '')}
                        </text>
                        <text
                            x={school.x || xScale(school.expenditure)}
                            y={school.shortName.includes('Riverside') ? 
                                (school.y || dimensions.innerHeight / 2) - (school.radius || rScale(school.enrollment)) - 12 :
                                (school.y || dimensions.innerHeight / 2) - 2}
                            text-anchor="middle"
                            font-size="12px"
                            fill={colors.colorText}
                            font-weight="600"
                            pointer-events="none"
                        >
                            {school.shortName.replace(' High', '')}
                        </text>
                        <text
                            x={school.x || xScale(school.expenditure)}
                            y={school.shortName.includes('Riverside') ? 
                                (school.y || dimensions.innerHeight / 2) - (school.radius || rScale(school.enrollment)) + 5 :
                                (school.y || dimensions.innerHeight / 2) + 10}
                            text-anchor="middle"
                            font-size="12px"
                            fill={colors.colorWhite}
                            font-weight="600"
                            stroke={colors.colorWhite}
                            stroke-width="2"
                            pointer-events="none"
                        >
                            High
                        </text>
                        <text
                            x={school.x || xScale(school.expenditure)}
                            y={school.shortName.includes('Riverside') ? 
                                (school.y || dimensions.innerHeight / 2) - (school.radius || rScale(school.enrollment)) + 5 :
                                (school.y || dimensions.innerHeight / 2) + 10}
                            text-anchor="middle"
                            font-size="12px"
                            fill={colors.colorText}
                            font-weight="600"
                            pointer-events="none"
                        >
                            High
                        </text>
                    {:else}
                        <!-- Single-line labels for other schools -->
                        <text
                            x={school.x || xScale(school.expenditure)}
                            y={school.shortName.includes('Riverside') ? 
                                (school.y || dimensions.innerHeight / 2) - (school.radius || Math.max(rScale(school.enrollment), 3)) - 5 :
                                (school.y || dimensions.innerHeight / 2) + 3}
                            text-anchor="middle"
                            font-size="12px"
                            fill={colors.colorWhite}
                            font-weight="600"
                            stroke={colors.colorWhite}
                            stroke-width="2"
                            pointer-events="none"
                        >
                            {school.shortName}
                        </text>
                        <text
                            x={school.x || xScale(school.expenditure)}
                            y={school.shortName.includes('Riverside') ? 
                                (school.y || dimensions.innerHeight / 2) - (school.radius || Math.max(rScale(school.enrollment), 3)) - 5 :
                                (school.y || dimensions.innerHeight / 2) + 3}
                            text-anchor="middle"
                            font-size="12px"
                            fill={colors.colorText}
                            font-weight="600"
                            pointer-events="none"
                        >
                            {school.shortName}
                        </text>
                    {/if}
                </g>
            {/each}
            

            <!-- School Size legend -->
            <g class="legend" transform="translate({dimensions.innerWidth - 0}, 140)">
                <text font-size="14px" font-weight="600" fill={colors.colorText}>School Size:</text>
                
                <!-- Proportional legend circles -->
                <circle 
                    cx="28" 
                    cy={36 + rScale(1000) - rScale(100)} 
                    r={rScale(100)} 
                    fill="none" 
                    stroke={colors.colorMediumGray} 
                    stroke-width="1"
                />
                <text x="65" y={41 + rScale(1000) - rScale(250)} font-size="11.5px" fill={colors.colorDarkGray}>100</text>

                <circle 
                    cx="28" 
                    cy={36 + rScale(1000) - rScale(500)} 
                    r={rScale(500)} 
                    fill="none" 
                    stroke={colors.colorMediumGray} 
                    stroke-width="1"
                />
                <text x="65" y="35" font-size="11.5px" fill={colors.colorDarkGray}>500</text>
                
                <circle 
                    cx="28" 
                    cy="36" 
                    r={rScale(1000)} 
                    fill="none" 
                    stroke={colors.colorMediumGray} 
                    stroke-width="1"
                />
                <text x="65" y="18" font-size="11.5px" fill={colors.colorDarkGray}>1000 students</text>
            </g>
        </SVGChart>

        <!-- Custom tooltip -->
        {#if tooltipVisible && tooltipData}
            <div class="tooltip" style="left: {tooltipX}px; top: {tooltipY}px">
                <div class="tooltip-header">{tooltipData.School}</div>
                <div class="tooltip-content">
                    <div class="tooltip-row">
                        <span class="tooltip-label">Enrollment:</span>
                        <span class="tooltip-value">{tooltipData.enrollment} students</span>
                    </div>
                    <div class="tooltip-row">
                        <span class="tooltip-label">Spending:</span>
                        <span class="tooltip-value">{tooltipData["Per Pupil Spending"]}</span>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    .chart-container {
        padding: 1rem;
        margin-bottom: 2rem;
        position: relative;
    }

    .controls {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 1.5rem;
    }

    .chart-title {
        text-align: center;
        margin-bottom: 1.5rem;
        margin-left: 8rem;
    }

    .selectors {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    .year-selector {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .year-selector label {
        font-weight: 600;
        color: var(--colorText);
        white-space: nowrap;
    }

    .year-selector select {
        padding: 0.5rem;
        border-radius: 4px;
        border: 1px solid var(--colorMediumGray);
        font-size: 1rem;
        background-color: white;
        cursor: pointer;
    }

    h2 {
        margin: 0;
        color: var(--colorText);
        font-family: var(--font-headers);
    }

    .scatterplot {
        width: 100%;
        height: 250px;
        margin: 0 auto;
        position: relative;
        padding-bottom: 20px;
    }

    .data-point {
        transition: opacity 0.2s;
        cursor: pointer;
    }

    .data-point:hover {
        opacity: 1;
    }

    .data-point:hover circle {
        stroke-width: 2;
        stroke: var(--colorText);
    }

    /* Tooltip styles */
    .tooltip {
        position: absolute;
        background: white;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        padding: 10px;
        width: 250px;
        pointer-events: none;
        z-index: 10;
    }

    .tooltip-header {
        font-weight: 700;
        margin-bottom: 8px;
        padding-bottom: 4px;
        border-bottom: 1px solid #eee;
        font-size: 14px;
        color: var(--colorText);
    }

    .tooltip-content {
        font-size: 12px;
    }

    .tooltip-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 4px;
    }

    .tooltip-label {
        font-weight: 600;
        color: var(--colorDarkGray);
    }

    .tooltip-value {
        text-align: right;
        color: var(--colorText);
    }

    @media (max-width: 768px) {
        .controls {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
        }

        .selectors {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
            width: 100%;
        }

        .year-selector {
            width: 100%;
        }
        
        .tooltip {
            width: 220px;
            font-size: 11px;
        }
    }
</style>