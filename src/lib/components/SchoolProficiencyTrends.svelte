<script>
    import { onMount, afterUpdate } from 'svelte';
    import { scaleLinear, scalePoint, scaleSqrt } from 'd3-scale';
    import { line } from 'd3-shape';
    import { extent } from 'd3-array';
    import { colors } from '$lib/styles/colorConfig';
    import SVGChart from '$lib/components/SVGChart.svelte';

    // Import the data
    import smallSchoolsData from '$lib/data/small_schools.json';

    export let width = 800;
    export let height = 400;

    // State variables
    let selectedSchool = null;
    let selectedSubject = "ELA"; // Default to ELA
    let isMobile = false;
    
    // Tooltip related state
    let tooltipVisible = false;
    let tooltipData = null;
    let tooltipX = 0;
    let tooltipY = 0;
    let tooltipSchool = null; // Track which school's data is shown in tooltip
    
    // Get unique schools from the data
    let availableSchools = [...new Set(smallSchoolsData.map(school => school.School))].sort();
    
    // Set default selected school
    $: if (availableSchools.length > 0 && !selectedSchool) {
        selectedSchool = availableSchools[0];
    }

    // Get unique school years
    let schoolYears = [...new Set(smallSchoolsData.map(school => school["School Year"]))].sort();

    // Create radius scale for dots
    $: rScale = scaleSqrt()
        .domain([200, 500])
        .range([8, 16])

    // Process all schools data for both visualization and tooltips
    $: processedSchoolsData = availableSchools.map(school => {
        // Get all data for this school
        const schoolRecords = smallSchoolsData
            .filter(record => record.School === school)
            .sort((a, b) => a["School Year"].localeCompare(b["School Year"]));
            
        // Map each record to the format we need
        const dataPoints = schoolRecords.map(record => {
            const proficiencyField = selectedSubject === "ELA" 
                ? "ELA Proficient & Above %" 
                : "Math Proficient & Above %";
                
            const proficiencyValue = parseInt(record[proficiencyField]?.replace(/%/g, '') || "0");
            
            return {
                school: record.School,
                year: record["School Year"],
                proficiency: proficiencyValue,
                enrollment: parseFloat(record["Total School Enrollment"] || 0),
                economicallyDisadvantaged: parseInt(record["Economically Disadvantaged %"]?.replace(/%/g, '') || "0"),
                studentsWithDisabilities: parseInt(record["Students w/Disabilities %"]?.replace(/%/g, '') || "0"),
                original: record // Keep the original data object for reference
            };
        });
        
        return {
            name: school,
            isSelected: school === selectedSchool,
            data: dataPoints
        };
    });

    // Create line generator
    $: lineGenerator = line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.proficiency));

    // Filter data for selected school
    $: selectedSchoolData = processedSchoolsData.find(s => s.name === selectedSchool)?.data || [];

    // Dimensions setup
    let dimensions = {
        width,
        height,
        margin: { top: 40, right: 100, bottom: 140, left: 60 },
        innerWidth: 0,
        innerHeight: 0
    };

    $: {
        dimensions.innerWidth = width - dimensions.margin.left - dimensions.margin.right;
        dimensions.innerHeight = height - dimensions.margin.top - dimensions.margin.bottom;
        // Detect mobile screen size
        isMobile = width < 640;
    }

    // Create scales
    $: xScale = scalePoint()
        .domain(schoolYears)
        .range([0, dimensions.innerWidth])
        .padding(0.5);

    $: yScale = scaleLinear()
        .domain([0, 100]) // Percentage scale from 0-100%
        .range([dimensions.innerHeight, 0])
        .nice();

    // Line paths for all schools
    $: backgroundLinePaths = processedSchoolsData.map(school => ({
        ...school,
        path: lineGenerator(school.data)
    }));

    // Get chart title based on selections
    $: chartTitle = selectedSchool 
        ? `${selectedSubject} Proficiency Trends for ${selectedSchool}` 
        : "Select a school to view proficiency trends";
        
    // Format numbers with commas
    const formatNumber = num => num.toLocaleString();
    const formatPercent = value => `${value}%`;
    
    // Handle tooltip display for data points 
    function showTooltip(point, event, school = null) {
        tooltipData = point;
        tooltipSchool = school || selectedSchool;
        
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

    // Handle tooltip display for background trend lines
    function showLineTooltip(event, schoolData) {
        // Find the nearest point on the line to show in tooltip
        if (!schoolData || !schoolData.data || schoolData.data.length === 0) return;
        
        // Get mouse position relative to chart
        const rect = event.target.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        
        // Find the closest year point on the x-axis
        let closestYear = schoolYears[0];
        let minDistance = Infinity;
        
        schoolYears.forEach(year => {
            const distance = Math.abs(xScale(year) - (mouseX - dimensions.margin.left));
            if (distance < minDistance) {
                minDistance = distance;
                closestYear = year;
            }
        });
        
        // Find the corresponding data point
        const point = schoolData.data.find(d => d.year === closestYear);
        if (point) {
            showTooltip(point, event, schoolData.name);
        }
    }

    function hideTooltip() {
        tooltipVisible = false;
    }
    
    // Initialize component
    onMount(() => {
        // Update the mobile detection on mount
        isMobile = width < 640;
    });
    
    // Find previous year's data for tooltip change calculation
    function findPreviousYearData(schoolName, currentYear) {
        // Get the school data
        const school = processedSchoolsData.find(s => s.name === schoolName);
        if (!school) return null;
        
        // Find current year index
        const yearIndex = schoolYears.indexOf(currentYear);
        if (yearIndex <= 0) return null; // No previous year
        
        // Get previous year
        const prevYear = schoolYears[yearIndex - 1];
        
        // Find data point for previous year
        return school.data.find(d => d.year === prevYear);
    }
</script>

<div class="proficiency-trends-container" bind:clientWidth={width} bind:clientHeight={height}>
    <div class="controls">
        <h2 class="text-width">{chartTitle}</h2>
        
        <div class="selectors">
            <div class="school-selector">
                <label for="school-select">School:</label>
                <select id="school-select" bind:value={selectedSchool}>
                    {#each availableSchools as school}
                        <option value={school}>{school}</option>
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
    
    <div class="chart">
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
                {#each schoolYears as year}
                    <g transform="translate({xScale(year)}, {dimensions.innerHeight})">
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
                            {year}
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
                    School Year
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
                            {tick}%
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
                    {selectedSubject} Proficient & Above
                </text>
            </g>

            <!-- Gridlines -->
            {#each yScale.ticks(10) as tick}
                <line 
                    x1={0}
                    y1={yScale(tick)}
                    x2={dimensions.innerWidth}
                    y2={yScale(tick)}
                    stroke={colors.colorLightGray}
                    stroke-width="0.5"
                    stroke-dasharray="2,2"
                    opacity="0.5"
                />
            {/each}

            <!-- Background trend lines for all schools -->
            {#each backgroundLinePaths as schoolPath}
                {#if schoolPath.name !== selectedSchool && schoolPath.path}
                    <path
                        d={schoolPath.path}
                        fill="none"
                        stroke={colors.colorLightGray}
                        stroke-width="3"
                        stroke-opacity="0.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="background-path"
                        on:mouseenter={(e) => showLineTooltip(e, schoolPath)}
                        on:mouseleave={hideTooltip}
                    />
                    <!-- Invisible wider stroke area for better hover target -->
                    <path
                        d={schoolPath.path}
                        fill="none"
                        stroke="transparent"
                        stroke-width="10"
                        class="hover-path"
                        on:mouseenter={(e) => showLineTooltip(e, schoolPath)}
                        on:mouseleave={hideTooltip}
                    />
                {/if}
            {/each}

            <!-- Selected school trend line (highlighted) -->
            {#if selectedSchool}
                {@const selectedPath = backgroundLinePaths.find(s => s.name === selectedSchool)}
                {#if selectedPath && selectedPath.path}
                    <path
                        d={selectedPath.path}
                        fill="none"
                        stroke="#01b6e1"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                {/if}
            {/if}

            <!-- Data points for selected school with hover interactions -->
            {#each selectedSchoolData as point, i}
                <g 
                    class="data-point"
                    on:mouseenter={(e) => showTooltip(point, e)}
                    on:mouseleave={hideTooltip}
                >
                    <circle
                        cx={xScale(point.year)}
                        cy={yScale(point.proficiency)}
                        r={rScale(point.enrollment)}
                        fill="#01b6e1"
                        stroke="white"
                        stroke-width="2"
                    />
                    
                    <!-- Point value labels -->
                    <text
                        x={xScale(point.year)}
                        y={yScale(point.proficiency) - rScale(point.enrollment) - 5}
                        text-anchor="middle"
                        dominant-baseline="middle"
                        fill={colors.colorText}
                        font-size="12px"
                        font-weight="600"
                    >
                        {point.proficiency}%
                    </text>
                </g>
            {/each}

            <!-- School Size legend with adjusted circles to account for the stroke width -->
            <g class="legend" transform="translate({dimensions.innerWidth - 214}, 220)">
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

            <!-- Additional school information in legend area -->
            <g class="school-info" transform="translate({dimensions.innerWidth + 10}, 20)">
                {#if selectedSchoolData.length > 0}
                    <text font-size="12px" font-weight="600" fill={colors.colorText}>
                        School Details:
                    </text>
                    <text y="20" font-size="12px" fill={colors.colorDarkGray}>
                        Enrollment: {selectedSchoolData[selectedSchoolData.length-1].enrollment}
                    </text>
                    <text y="40" font-size="12px" fill={colors.colorDarkGray}>
                        Econ. Disadvantaged: {selectedSchoolData[selectedSchoolData.length-1].economicallyDisadvantaged}%
                    </text>
                    <text y="60" font-size="12px" fill={colors.colorDarkGray}>
                        Students w/Disabilities: {selectedSchoolData[selectedSchoolData.length-1].studentsWithDisabilities}%
                    </text>
                    
                    <!-- Change indicators for most recent year if data available -->
                    {#if selectedSchoolData.length > 1}
                        {@const change = selectedSchoolData[selectedSchoolData.length-1].proficiency - selectedSchoolData[selectedSchoolData.length-2].proficiency}
                        <text y="80" font-size="12px" font-weight="600" fill={change >= 0 ? colors.colorInclusive : colors.colorSeparate}>
                            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from previous
                        </text>
                    {/if}
                {/if}
            </g>
        </SVGChart>

        <!-- Custom tooltip - works for both selected school points and background lines -->
        {#if tooltipVisible && tooltipData}
            <div class="tooltip" style="left: {tooltipX}px; top: {tooltipY}px">
                <div class="tooltip-header">
                    {tooltipSchool} ({tooltipData.year})
                    {#if tooltipSchool !== selectedSchool}
                        <button class="select-school-button" on:click={() => selectedSchool = tooltipSchool}>Select</button>
                    {/if}
                </div>
                <div class="tooltip-content">
                    <div class="tooltip-row">
                        <span class="tooltip-label">{selectedSubject} Proficiency:</span>
                        <span class="tooltip-value">{formatPercent(tooltipData.proficiency)}</span>
                    </div>
                    <div class="tooltip-row">
                        <span class="tooltip-label">Enrollment:</span>
                        <span class="tooltip-value">{formatNumber(tooltipData.enrollment)} students</span>
                    </div>
                    <div class="tooltip-row">
                        <span class="tooltip-label">Economically Disadvantaged:</span>
                        <span class="tooltip-value">{formatPercent(tooltipData.economicallyDisadvantaged)}</span>
                    </div>
                    <div class="tooltip-row">
                        <span class="tooltip-label">Students with Disabilities:</span>
                        <span class="tooltip-value">{formatPercent(tooltipData.studentsWithDisabilities)}</span>
                    </div>
                    
                    <!-- Previous year comparison if available -->
                    {#if tooltipData.year !== schoolYears[0]}
                        {@const prevYearData = findPreviousYearData(tooltipSchool, tooltipData.year)}
                        {#if prevYearData}
                            {@const yearChange = tooltipData.proficiency - prevYearData.proficiency}
                            <div class="tooltip-row change-row">
                                <span class="tooltip-label">Change from {prevYearData.year}:</span>
                                <span class="tooltip-value" style="color: {yearChange >= 0 ? colors.colorInclusive : colors.colorSeparate}">
                                    {yearChange >= 0 ? '+' : ''}{yearChange}%
                                </span>
                            </div>
                        {/if}
                    {/if}
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    .proficiency-trends-container {
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

    .school-selector, .subject-selector {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .school-selector label, .subject-selector label {
        font-weight: 600;
        color: var(--colorText);
        white-space: nowrap;
    }

    .school-selector select {
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

    .chart {
        width: 100%;
        height: 400px;
        margin: 0 auto;
        position: relative;
    }

    .data-point circle {
        transition: r 0.2s ease-out;
        cursor: pointer;
    }

    .data-point:hover circle {
        filter: brightness(1.1);
        stroke-width: 3px;
    }
    
    /* Background line hover effects */
    .background-path {
        cursor: pointer;
        transition: stroke-opacity 0.2s;
    }
    
    .background-path:hover {
        stroke-opacity: 0.8;
    }
    
    .hover-path {
        cursor: pointer;
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
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .select-school-button {
        font-size: 11px;
        padding: 2px 6px;
        background: var(--colorInclusive);
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        pointer-events: auto;
    }

    .tooltip-content {
        font-size: 12px;
    }

    .tooltip-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 4px;
    }
    
    .change-row {
        margin-top: 6px;
        padding-top: 4px;
        border-top: 1px dashed #eee;
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

        .school-selector {
            width: 100%;
        }
        
        .school-selector select {
            flex-grow: 1;
        }
        
        .tooltip {
            width: 220px;
            font-size: 11px;
        }
    }
</style>