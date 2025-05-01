<script>
    import { onMount } from 'svelte';
    import { scaleLinear, scaleSqrt, scaleOrdinal } from 'd3-scale';
    import { extent } from 'd3-array';
    import { colors } from '$lib/styles/colorConfig';
    import SVGChart from '$lib/components/SVGChart.svelte';

    // Import the data
    import smallSchoolsData from '$lib/data/small_schools.json';

    export let width = 800;
    export let height = 450; // Increased height to give more room for the x-axis

    // Add school year selector with default value
    export let selectedYear = "2023-2024"; // Default to newest year

    // Get unique school years from the data
    let availableYears = [...new Set(smallSchoolsData.map(school => school["School Year"]))].sort().reverse();

    // Filter data by selected year
    $: filteredYearData = smallSchoolsData.filter(school => 
        school["School Year"] === selectedYear
    );

    // Process the data to parse numeric values
    $: processedData = filteredYearData.map(school => {
        // Create a derived name field for display that's more compact
        const shortName = school.School.replace(" Primary School", "");

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
        margin: { top: 40, right: 200, bottom: 80, left: 70 }, // Increased bottom margin
        innerWidth: 0,
        innerHeight: 0
    };

    $: {
        dimensions.innerWidth = width - dimensions.margin.left - dimensions.margin.right;
        dimensions.innerHeight = height - dimensions.margin.top - dimensions.margin.bottom;
    }

    // Create scales
    $: xScale = scaleLinear()
        .domain([200, 550])
        .range([0, dimensions.innerWidth])

    $: yScale = scaleLinear()
        .domain([0, 25000])
        .range([dimensions.innerHeight, 0])
        .nice()

    // Create radius scale for dots
    $: rScale = scaleSqrt()
        .domain([200, 500])
        .range([8, 16])

    // $: rScale = scaleSqrt()
    //     .domain([200, 500])
    //     .range([12, 24])

    // Create color scale
    $: colorScale = scaleOrdinal()
        .domain(processedData.map(d => d.shortName))
        .range([
            colors.colorInclusive,
            colors.colorSemiInclusive,
            colors.colorNonInclusive,
            colors.colorSeparate,
            "#01b6e1", // Blue
            "#ff9900", // Orange
            "#8A2BE2", // BlueViolet
            "#20B2AA"  // LightSeaGreen
        ]);

    // Format numbers with commas
    const formatNumber = num => num.toLocaleString();
    const formatMoney = value => `$${value.toLocaleString()}`;

    // Function to get custom colors for special schools
    function getSchoolColor(schoolName) {
        // Check if the school name matches any of the schools that should be blue
        if (schoolName.includes('Cedaroak Park') || 
            schoolName.includes('Sunset') || 
            schoolName.includes('Stafford')) {
            return "#01b6e1"; // Blue
        }
        // Default orange color
        return "#ff9900";
    }

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
</script>

<div class="chart-container" bind:clientWidth={width}>
    <div class="controls">
        <h2 class="text-width">School Size vs. Per Pupil Spending</h2>
        
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
    
    <div class="scatterplot">
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
                    y={dimensions.innerHeight + 55}
                    text-anchor="middle"
                    fill={colors.colorText}
                    font-size="14px"
                    font-weight="600"
                >
                    School Enrollment
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
                            {formatMoney(tick)}
                        </text>
                    </g>
                {/each}

                <!-- Y-axis label -->
                <text
                    transform="rotate(-90)"
                    x={-dimensions.innerHeight / 2}
                    y={-60}
                    text-anchor="middle"
                    fill={colors.colorText}
                    font-size="14px"
                    font-weight="600"
                >
                    Per Pupil Spending
                </text>
            </g>

            <!-- Data points -->
            {#each processedData as school}
                <g 
                    class="data-point"
                    on:mouseenter={(e) => showTooltip(school, e)}
                    on:mouseleave={hideTooltip}
                >
                    <circle
                        cx={xScale(school.enrollment)}
                        cy={yScale(school.expenditure)}
                        r={rScale(school.enrollment)}
                        fill={getSchoolColor(school.School)}
                        opacity="0.8"
                        stroke={colors.colorBackgroundWhite}
                        stroke-width="1"
                    />
                    
                    <!-- Add school names directly on chart for clarity -->
                    <text
                        x={xScale(school.enrollment)}
                        y={yScale(school.expenditure) - 15}
                        text-anchor="middle"
                        font-size="11px"
                        fill={colors.colorText}
                    >
                        {school.shortName}
                    </text>
                </g>
            {/each}

            <!-- Trend line could be added here if needed -->
            
            <!-- Average lines -->
            {#if processedData.length > 0}
                {@const avgEnrollment = processedData.reduce((sum, d) => sum + d.enrollment, 0) / processedData.length}
                {@const avgExpenditure = processedData.reduce((sum, d) => sum + d.expenditure, 0) / processedData.length}
                
                <line 
                    x1={xScale(avgEnrollment)}
                    y1={0}
                    x2={xScale(avgEnrollment)}
                    y2={dimensions.innerHeight}
                    stroke={colors.colorMediumGray}
                    stroke-width="1"
                    stroke-dasharray="4"
                />
                
                <line 
                    x1={0}
                    y1={yScale(avgExpenditure)}
                    x2={dimensions.innerWidth}
                    y2={yScale(avgExpenditure)}
                    stroke={colors.colorMediumGray}
                    stroke-width="1"
                    stroke-dasharray="4"
                />
                
                <text 
                    x={140}
                    y={yScale(avgExpenditure) + 20}
                    text-anchor="end"
                    font-size="12px"
                    fill={colors.colorDarkGray}
                >
                    Avg Expenditure: {formatMoney(Math.round(avgExpenditure))}
                </text>
                
                <text 
                    x={xScale(avgEnrollment)}
                    y={dimensions.innerHeight - 10}
                    text-anchor="middle"
                    font-size="12px"
                    fill={colors.colorDarkGray}
                >
                    Avg Size: {Math.round(avgEnrollment)} students
                </text>
            {/if}

            <!-- School Size legend with adjusted circles to account for the stroke width -->
            <g class="legend" transform="translate({dimensions.innerWidth - 114}, 220)">
                <text font-size="12px" font-weight="600" fill={colors.colorDarkGray}>School Size:</text>
                
                <!-- Calculate legend circle sizes based on actual enrollment values -->
                <!-- Add stroke to match the data visualization and adjust radius to compensate -->
                <circle 
                    cx="28" 
                    cy={36 + rScale(500) - rScale(200)} 
                    r={rScale(200) - 0.5} 
                    fill="none" 
                    stroke={colors.colorMediumGray} 
                    stroke-width="1"
                />
                <text x="60" y="47" font-size="10px">200</text>

                <circle 
                    cx="28" 
                    cy={36 + rScale(500) - rScale(300)} 
                    r={rScale(300) - 0.5} 
                    fill="none" 
                    stroke={colors.colorMediumGray} 
                    stroke-width="1"
                />
                <text x="60" y="37" font-size="10px">300</text>
                
                <circle 
                    cx="28" 
                    cy={36 + rScale(500) - rScale(400)} 
                    r={rScale(400) - 0.5} 
                    fill="none" 
                    stroke={colors.colorMediumGray} 
                    stroke-width="1"
                />
                <text x="60" y="27" font-size="10px">400</text>
                
                <circle 
                    cx="28" 
                    cy="36" 
                    r={rScale(500) - 0.5} 
                    fill="none" 
                    stroke={colors.colorMediumGray} 
                    stroke-width="1"
                />
                <text x="60" y="17" font-size="10px">500 students</text>
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
        height: 400px;
        margin: 0 auto;
        position: relative;
        padding-bottom: 20px; /* Add padding at the bottom to ensure axis is visible */
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