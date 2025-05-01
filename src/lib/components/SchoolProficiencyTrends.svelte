<script>
    import { onMount, afterUpdate } from 'svelte';
    import { scaleLinear, scalePoint } from 'd3-scale';
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
    
    // Get unique schools from the data
    let availableSchools = [...new Set(smallSchoolsData.map(school => school.School))].sort();
    
    // Set default selected school
    $: if (availableSchools.length > 0 && !selectedSchool) {
        selectedSchool = availableSchools[0];
    }

    // Get unique school years
    let schoolYears = [...new Set(smallSchoolsData.map(school => school["School Year"]))].sort();

    // Filter data by selected school
    $: filteredData = smallSchoolsData
        .filter(school => school.School === selectedSchool)
        .sort((a, b) => a["School Year"].localeCompare(b["School Year"]));

    // Process data for visualization based on selected subject
    $: chartData = filteredData.map(school => {
        const proficiencyField = selectedSubject === "ELA" 
            ? "ELA Proficient & Above %" 
            : "Math Proficient & Above %";
            
        const proficiencyValue = parseInt(school[proficiencyField]?.replace(/%/g, '') || "0");
        
        return {
            year: school["School Year"],
            proficiency: proficiencyValue,
            enrollment: parseFloat(school["Total School Enrollment"] || 0),
            economicallyDisadvantaged: parseInt(school["Economically Disadvantaged %"]?.replace(/%/g, '') || "0"),
            studentsWithDisabilities: parseInt(school["Students w/Disabilities %"]?.replace(/%/g, '') || "0")
        };
    });

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
    }

    // Create scales
    $: xScale = scalePoint()
        .domain(chartData.map(d => d.year))
        .range([0, dimensions.innerWidth])
        .padding(0.5);

    $: yScale = scaleLinear()
        .domain([0, 100]) // Percentage scale from 0-100%
        .range([dimensions.innerHeight, 0])
        .nice();

    // Create line generator for the proficiency trend
    $: lineGenerator = line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.proficiency));

    // Line path for the trend
    $: linePath = lineGenerator(chartData);

    // Get chart title based on selections
    $: chartTitle = selectedSchool 
        ? `${selectedSubject} Proficiency Trends for ${selectedSchool}` 
        : "Select a school to view proficiency trends";
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
                {#each chartData as point}
                    <g transform="translate({xScale(point.year)}, {dimensions.innerHeight})">
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
                            {point.year}
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

            <!-- Line representing proficiency trend -->
            {#if chartData.length > 1}
                <path
                    d={linePath}
                    fill="none"
                    stroke="#01b6e1"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            {/if}

            <!-- Data points with tooltips -->
            {#each chartData as point}
                <g class="data-point">
                    <circle
                        cx={xScale(point.year)}
                        cy={yScale(point.proficiency)}
                        r="6"
                        fill="#01b6e1"
                        stroke="white"
                        stroke-width="2"
                    >
                        <title>
                            {point.year}
                            {selectedSubject} Proficiency: {point.proficiency}%
                            Enrollment: {point.enrollment} students
                            Economically Disadvantaged: {point.economicallyDisadvantaged}%
                            Students with Disabilities: {point.studentsWithDisabilities}%
                        </title>
                    </circle>
                    
                    <!-- Point value labels -->
                    <text
                        x={xScale(point.year)}
                        y={yScale(point.proficiency) - 12}
                        text-anchor="middle"
                        fill={colors.colorText}
                        font-size="12px"
                        font-weight="600"
                    >
                        {point.proficiency}%
                    </text>
                </g>
            {/each}

            <!-- Additional school information in legend area -->
            <g class="school-info" transform="translate({dimensions.innerWidth + 10}, 20)">
                {#if chartData.length > 0}
                    <text font-size="12px" font-weight="600" fill={colors.colorText}>
                        School Details:
                    </text>
                    <text y="20" font-size="12px" fill={colors.colorDarkGray}>
                        Enrollment: {chartData[chartData.length-1].enrollment}
                    </text>
                    <text y="40" font-size="12px" fill={colors.colorDarkGray}>
                        Econ. Disadvantaged: {chartData[chartData.length-1].economicallyDisadvantaged}%
                    </text>
                    <text y="60" font-size="12px" fill={colors.colorDarkGray}>
                        Students w/Disabilities: {chartData[chartData.length-1].studentsWithDisabilities}%
                    </text>
                    
                    <!-- Change indicators for most recent year if data available -->
                    {#if chartData.length > 1}
                        {@const change = chartData[chartData.length-1].proficiency - chartData[chartData.length-2].proficiency}
                        <text y="80" font-size="12px" font-weight="600" fill={change >= 0 ? colors.colorInclusive : colors.colorSeparate}>
                            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from previous
                        </text>
                    {/if}
                {/if}
            </g>
        </SVGChart>
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
    }

    .data-point:hover circle {
        r: 8;
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
    }
</style>