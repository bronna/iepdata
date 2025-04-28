<script>
    import { onMount, afterUpdate } from 'svelte'
    import { scaleLinear, scaleSqrt, scaleThreshold } from 'd3-scale'
    import { extent } from 'd3-array'
    import { colors } from '$lib/styles/colorConfig'
    import SVGChart from '$lib/components/SVGChart.svelte'

    // Import the data
    import smallSchoolsData from '$lib/data/small_schools.json'

    export let width = 1200
    export let height = 800

    // Add school year selector with default value
    let selectedYear = "2023-2024" // Default to newest year
    
    // Add subject selector with default value
    let selectedSubject = "ELA" // Default to ELA
    
    // Get unique school years from the data
    let availableYears = [...new Set(smallSchoolsData.map(school => school["School Year"]))].sort().reverse()

    // Tooltip related state
    let tooltipVisible = false
    let tooltipData = null
    let tooltipX = 0
    let tooltipY = 0

    const globalExtents = {
        // Fixed domains based on analysis of all data
        expenditure: { min: 14000, max: 22000 },  // Per Pupil Spending
        proficiency: { min: 35, max: 85 },       // Combined ELA/Math ranges
        enrollment: { min: 0, max: 500 }         // School enrollment
    }

    let dimensions = {
        width,
        height,
        margin: { top: 40, right: 260, bottom: 130, left: 70 },
        innerWidth: 0,
        innerHeight: 0
    }

    $: {
        dimensions.innerWidth = width - dimensions.margin.left - dimensions.margin.right
        dimensions.innerHeight = height - dimensions.margin.top - dimensions.margin.bottom
    }

    // Function to get both fill and stroke colors for schools
    function getSchoolColors(schoolName) {
        // Check if the school name matches any of the three that should be blue
        if (schoolName.includes('Cedaroak Park') || 
            schoolName.includes('Sunset') || 
            schoolName.includes('Stafford')) {
            return {
                fill: "#01b6e1", // Blue
                stroke: "#0194b5"  // Darker blue for stroke
            }
        }
        // Default gray colors
        return {
            fill: "#ff9900", // Medium orange
            stroke: "#cc7a00"  // Darker orange for stroke
        }
    }

    // Create pie chart segments for disadvantaged percentage
    function createPieSegments(totalRadius, centerX, centerY, percentage) {
        // Calculate angles for the pie slices
        const disadvantagedAngle = percentage * 360 / 100;
        
        // Create SVG arc paths
        // First, the disadvantaged slice (from 0 to the percentage angle)
        const disadvantagedSlice = calculateArc(
            centerX, 
            centerY, 
            totalRadius, 
            0, 
            disadvantagedAngle
        );
        
        // Then, the remaining slice
        const remainingSlice = calculateArc(
            centerX, 
            centerY, 
            totalRadius, 
            disadvantagedAngle, 
            360
        );
        
        return {
            disadvantagedSlice,
            remainingSlice
        };
    }
    
    // Helper function to calculate SVG arc path
    function calculateArc(cx, cy, r, startAngle, endAngle) {
        // Convert angles from degrees to radians
        const startRad = (startAngle - 90) * Math.PI / 180; // -90 to start at the top
        const endRad = (endAngle - 90) * Math.PI / 180;
        
        // Calculate start and end points
        const x1 = cx + r * Math.cos(startRad);
        const y1 = cy + r * Math.sin(startRad);
        const x2 = cx + r * Math.cos(endRad);
        const y2 = cy + r * Math.sin(endRad);
        
        // Determine the large arc flag
        const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
        
        // Create the SVG arc path
        return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    }

    // Filter data by selected year
    $: filteredYearData = smallSchoolsData.filter(school => 
        school["School Year"] === selectedYear
    );

    // Process the data to parse numeric values
    $: processedData = filteredYearData.map(school => {
        // Create a derived name field for display that's more compact
        const shortName = school.School.replace(" Primary School", "");

        // Parse individual metrics
        const expenditure = parseInt(school["Per Pupil Spending"].replace(/\$|,/g, ''));
        
        // Use selected subject proficiency
        const performanceField = selectedSubject === "ELA" 
            ? "ELA Proficient & Above %" 
            : "Math Proficient & Above %";
            
        const performance = parseInt(school[performanceField]?.replace(/%/g, '') || "0");
        
        const disabilityPercent = parseInt(school["Students w/Disabilities %"]?.replace(/%/g, '') || "0");
        const economicDisadvantagePercent = parseInt(school["Economically Disadvantaged %"]?.replace(/%/g, '') || "0");
        const enrollment = parseFloat(school["Total School Enrollment"] || 0);

        // Calculate total disadvantaged percentage (sum of economic disadvantage and disability)
        const totalDisadvantagedPercent = economicDisadvantagePercent + disabilityPercent;

        return {
            ...school,
            shortName,
            expenditure,
            performance,
            disabilityPercent,
            economicDisadvantagePercent,
            totalDisadvantagedPercent,
            enrollment
        }
    });

    // Create a scale for circle radius based on enrollment (uses sqrt to scale by area not radius)
    $: rScale = scaleSqrt()
        .domain([globalExtents.enrollment.min, globalExtents.enrollment.max])
        .range([1, 26])

    // Calculate the average per pupil spending
    $: avgSpending = processedData.reduce((sum, d) => sum + d.expenditure, 0) / processedData.length

    // Calculate the average performance
    $: avgPerformance = processedData.reduce((sum, d) => sum + d.performance, 0) / processedData.length

    // Create scales with fixed domains to ensure all schools are visible
    $: xScale = scaleLinear()
        .domain([globalExtents.expenditure.min, globalExtents.expenditure.max])
        .range([0, dimensions.innerWidth])
        .nice()

    $: yScale = scaleLinear()
        .domain([globalExtents.proficiency.min, globalExtents.proficiency.max])
        .range([dimensions.innerHeight, 0])
        .nice()

    // Format numbers with commas
    const formatMoney = value => `$${value.toLocaleString()}`
    
    // Grid configuration for dot grid
    const dotSize = 1.5 // Size of each dot
    
    // Generate dots for the grid based on axis ticks
    $: dots = []
    $: {
        dots = []
        
        // Get tick values for both axes
        const xTicks = xScale.ticks(5) // Same number as we're using for the axis
        const yTicks = yScale.ticks(5) // Same number as we're using for the axis
        
        // Create half-interval ticks for x-axis
        const xTicksWithHalves = []
        for (let i = 0; i < xTicks.length - 1; i++) {
            xTicksWithHalves.push(xTicks[i]) // Add the main tick
            // Calculate and add the half-interval tick
            const halfInterval = (xTicks[i] + xTicks[i+1]) / 2
            xTicksWithHalves.push(halfInterval)
        }
        // Add the last main tick
        if (xTicks.length > 0) {
            xTicksWithHalves.push(xTicks[xTicks.length - 1])
        }
        
        // Generate dots at the intersections of ticks
        xTicksWithHalves.forEach(xTick => {
            yTicks.forEach(yTick => {
                dots.push({
                    x: xScale(xTick),
                    y: yScale(yTick)
                })
            })
        })
    }
    
    // Define positions for leader line labels with more control options
    const leaderLineLabels = {
        "Lowrie": { 
            offsetX: 42, 
            offsetY: 24,
            lineStartX: 21,  // Offset from circle center where line begins
            lineStartY: 14,
            lineEndX: 40,  // Control where the leader line ends
            lineEndY: 20,
            anchor: "end"   // text-anchor: start, middle, or end
        },
        "Stafford": { 
            offsetX: 60, 
            offsetY: 15,
            lineStartX: 20,
            lineStartY: 2,
            lineEndX: 58,
            lineEndY: 11,
            anchor: "end"
        },
        "Sunset": { 
            offsetX: 65, 
            offsetY: 10,
            lineStartX: 18,
            lineStartY: 8,
            lineEndX: 63,
            lineEndY: 6,
            anchor: "start"
        },
        "Cedaroak Park": { 
            offsetX: 30, 
            offsetY: -25,
            lineStartX: 13,
            lineStartY: -13,
            lineEndX: 28,
            lineEndY: -28,
            anchor: "middle"
        },
        "Willamette": { 
            offsetX: 45, 
            offsetY: 25,
            lineStartX: 18,
            lineStartY: 12,
            lineEndX: 43,
            lineEndY: 20,
            anchor: "start"
        }
    };
    
    // Check if a school needs a leader line
    function needsLeaderLine(schoolName) {
        return Object.keys(leaderLineLabels).includes(schoolName);
    }

    // Handle tooltip display
    function showTooltip(school, event) {
        tooltipData = school;
        // Adjust tooltip position to be near the mouse but not directly under it
        tooltipX = event.offsetX + 15;
        tooltipY = event.offsetY - 10;
        
        // Make sure tooltip stays in view
        const tooltipWidth = 250; // Approximate tooltip width
        const tooltipHeight = 150; // Approximate tooltip height
        
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


<div class="scatterplot-container" bind:clientWidth={width} bind:clientHeight={height}>
    <div class="controls">
        <h2 class="text-width">School Performance vs. Per Pupil Spending</h2>
        
        <div class="selectors">
            <div class="year-selector">
                <label for="year-select">School Year:</label>
                <select id="year-select" bind:value={selectedYear}>
                    {#each availableYears as year}
                        <option value={year}>{year}</option>
                    {/each}
                </select>
            </div>
            
            <div class="subject-selector">
                <label>Subject:</label>
                <div class="radio-group">
                    <label class="radio-label">
                        <input type="radio" bind:group={selectedSubject} value="ELA" name="subject">
                        <span>ELA</span>
                    </label>
                    <label class="radio-label">
                        <input type="radio" bind:group={selectedSubject} value="Math" name="subject">
                        <span>Math</span>
                    </label>
                </div>
            </div>
        </div>
    </div>
    
    <div class="scatterplot">
        <SVGChart {dimensions}>
            <!-- Dot grid background -->
            <g class="dot-grid">
                {#each dots as dot}
                    <circle 
                        cx={dot.x}
                        cy={dot.y}
                        r={dotSize}
                        fill={colors.colorLightGray}
                        opacity="0.6"
                    />
                {/each}
            </g>

            <!-- X-axis -->
            <g class="x-axis">
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
                            {formatMoney(tick)}
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
                    Per Pupil Spending
                </text>
            </g>

            <!-- Y-axis -->
            <g class="y-axis">
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
                            {tick}%
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
                    {selectedSubject} Proficient & Above
                </text>
            </g>

            <!-- Average lines -->
            <g class="average-lines">
                <!-- Avg per pupil spending line -->
                <line 
                    x1={xScale(avgSpending)}
                    y1={0}
                    x2={xScale(avgSpending)}
                    y2={dimensions.innerHeight + 20}
                    stroke={colors.colorMediumGray}
                    stroke-width="1"
                    stroke-dasharray="4"
                />

                <!-- Avg per pupil spending label -->
                <text 
                    x={xScale(avgSpending) - 75}
                    y={dimensions.innerHeight - 10}
                    font-size="12px"
                    fill={colors.colorDarkGray}
                >
                    Avg Spending
                </text>

                <!-- Avg performance line -->
                <line 
                    x1={-30}
                    y1={yScale(avgPerformance)}
                    x2={dimensions.innerWidth + 19}
                    y2={yScale(avgPerformance)}
                    stroke={colors.colorMediumGray}
                    stroke-width="1"
                    stroke-dasharray="4"
                />
                
                <!-- Avg performance label -->
                <text 
                    x={dimensions.innerWidth - 102}
                    y={yScale(avgPerformance) - 10}
                    font-size="12px"
                    fill={colors.colorDarkGray}
                >
                    Avg {selectedSubject} Performance
                </text>
            </g>

            <!-- Plot points -->
            {#each processedData as school}
                <g class="data-point" 
                   on:mouseenter={(e) => showTooltip(school, e)} 
                   on:mouseleave={hideTooltip}>
                    <!-- Pie chart showing disadvantaged percentage -->
                    <g>
                        {#if school.totalDisadvantagedPercent}
                            {@const segments = createPieSegments(
                                rScale(school.enrollment), 
                                xScale(school.expenditure),
                                yScale(school.performance),
                                school.totalDisadvantagedPercent
                            )}
                            
                            <!-- Regular portion slice -->
                            <path 
                                d={segments.remainingSlice}
                                fill={getSchoolColors(school.School).fill}
                                opacity="0.9"
                            />
                            
                            <!-- Disadvantaged portion slice (slightly more opaque) -->
                            <path 
                                d={segments.disadvantagedSlice}
                                fill={getSchoolColors(school.School).fill}
                                opacity="0.65"
                                stroke={getSchoolColors(school.School).stroke}
                                stroke-width="1"
                            />
                        {/if}
                    </g>
                    
                    <!-- Circle outline around the whole pie for consistency -->
                    <circle
                        cx={xScale(school.expenditure)}
                        cy={yScale(school.performance)}
                        r={rScale(school.enrollment)}
                        fill="none"
                        stroke={colors.colorBackgroundWhite}
                        stroke-width="1"
                    />
                    
                    {#if needsLeaderLine(school.shortName)}
                        <!-- Leader line -->
                        <line 
                            x1={xScale(school.expenditure) + leaderLineLabels[school.shortName].lineStartX}
                            y1={yScale(school.performance) + leaderLineLabels[school.shortName].lineStartY}
                            x2={xScale(school.expenditure) + leaderLineLabels[school.shortName].lineEndX}
                            y2={yScale(school.performance) + leaderLineLabels[school.shortName].lineEndY}
                            stroke={colors.colorDarkGray}
                            stroke-width="0.5"
                            stroke-dasharray="2,1"
                        />
                        <!-- Offset label with leader line -->
                        <text
                            x={xScale(school.expenditure) + leaderLineLabels[school.shortName].offsetX}
                            y={yScale(school.performance) + leaderLineLabels[school.shortName].offsetY}
                            text-anchor={leaderLineLabels[school.shortName].offsetX < 0 ? "end" : "start"}
                            font-size="11px"
                            fill={colors.colorText}
                        >
                            <tspan font-weight="600">{school.shortName}</tspan>
                            <tspan> ({school.totalDisadvantagedPercent}% disadv)</tspan>
                        </text>
                    {:else}
                        <!-- Regular inline label -->
                        <text
                            x={xScale(school.expenditure)}
                            y={yScale(school.performance) - rScale(school.enrollment) - 8}
                            text-anchor="middle"
                            font-size="11px"
                            fill={colors.colorText}
                        >
                            <tspan font-weight="600">{school.shortName}</tspan>
                            <tspan> ({school.totalDisadvantagedPercent}% disadv)</tspan>
                        </text>
                    {/if}
                </g>
            {/each}

            <!-- School Size legend - restored to original position -->
            <g class="legend" transform="translate({dimensions.innerWidth - 57}, 220)">
                <text font-size="12px" font-weight="600" fill={colors.colorDarkGray}>School Size:</text>
                
                <!-- Calculate legend circle sizes based on actual enrollment values -->
                <circle cx="28" cy={36 + rScale(500) - rScale(200)} r={rScale(200)} fill="none" stroke={colors.colorMediumGray} stroke-width=1/>
                <text x="60" y="53" font-size="10px">200</text>

                <circle cx="28" cy={36 + rScale(500) - rScale(300)} r={rScale(300)} fill="none" stroke={colors.colorMediumGray} stroke-width=1/>
                <text x="60" y="41" font-size="10px">300</text>
                
                <circle cx="28" cy={36 + rScale(500) - rScale(400)} r={rScale(400)} fill="none" stroke={colors.colorMediumGray} stroke-width=1/>
                <text x="60" y="29" font-size="10px">400</text>
                
                <circle cx="28" cy="36" r={rScale(500)} fill="none" stroke={colors.colorMediumGray} stroke-width=1/>
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
                    <div class="tooltip-row">
                        <span class="tooltip-label">Students with Disabilities:</span>
                        <span class="tooltip-value">{tooltipData["Students w/Disabilities %"]}</span>
                    </div>
                    <div class="tooltip-row">
                        <span class="tooltip-label">Economically Disadvantaged:</span>
                        <span class="tooltip-value">{tooltipData["Economically Disadvantaged %"]}</span>
                    </div>
                    <div class="tooltip-row">
                        <span class="tooltip-label">ELA Proficient:</span>
                        <span class="tooltip-value">{tooltipData["ELA Proficient & Above %"]}</span>
                    </div>
                    <div class="tooltip-row">
                        <span class="tooltip-label">Math Proficient:</span>
                        <span class="tooltip-value">{tooltipData["Math Proficient & Above %"]}</span>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    .scatterplot-container {
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

    .year-selector, .subject-selector {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .year-selector label, .subject-selector label {
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

    .radio-group {
        display: flex;
        gap: 1rem;
    }

    .radio-label {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        cursor: pointer;
    }

    .radio-label input {
        cursor: pointer;
    }

    .radio-label span {
        font-size: 1rem;
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
    
    .dot-grid circle {
        pointer-events: none; /* Ensure dots don't interfere with hover interactions */
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

        .year-selector, .subject-selector {
            width: 100%;
        }

        .radio-group {
            flex: 1;
            justify-content: flex-start;
        }
        
        .tooltip {
            width: 220px;
            font-size: 11px;
        }
    }
</style>