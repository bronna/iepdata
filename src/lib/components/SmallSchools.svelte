<!-- Add a legend for the color scale -->
<g class="legend" transform="translate({dimensions.innerWidth - 200}, 180)">
    <text font-size="12px" font-weight="600">Disadvantaged %:</text>
    
    <!-- Color legend -->
    <rect x="10" y="20" width="20" height="15" fill="#f7c16f" />
    <text x="40" y="33" font-size="10px">Below average ({Math.round(avgDisadvantagedPercent)}%)</text>
    
    <rect x="10" y="45" width="20" height="15" fill="#6acf96" />
    <text x="40" y="58" font-size="10px">Above average ({Math.round(avgDisadvantagedPercent)}%)</text>
</g>

<script>
    import { scaleLinear, scaleSqrt, scaleThreshold } from 'd3-scale'
    import { extent } from 'd3-array'
    import { colors } from '$lib/styles/colorConfig'
    import SVGChart from '$lib/components/SVGChart.svelte'

    // Import the data
    import smallSchoolsData from '$lib/data/small_schools.json'

    export let width = 800
    export let height = 400

    let dimensions = {
        width,
        height,
        margin: { top: 40, right: 190, bottom: 130, left: 70 },
        innerWidth: 0,
        innerHeight: 0
    }

    $: {
        dimensions.innerWidth = width - dimensions.margin.left - dimensions.margin.right
        dimensions.innerHeight = height - dimensions.margin.top - dimensions.margin.bottom
    }

    // Process the data to parse numeric values
    $: processedData = smallSchoolsData.map(school => {
        // Create a derived name field for display that's more compact
        const shortName = school.School.replace(" Primary School", "");

        // Parse individual metrics
        const expenditure = parseInt(school["Per Pupil Spending"].replace(/\$|,/g, ''));
        const performance = parseInt(school["Proficient & Above %"].replace(/%/g, ''));
        const disabilityPercent = parseInt(school["Students w/Disabilities %"].replace(/%/g, ''));
        const economicDisadvantagePercent = parseInt(school["Economically Disadvantaged %"].replace(/%/g, ''));
        const enrollment = parseFloat(school["Total School Enrollment"]);

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
    })

    // Create a scale for circle radius based on enrollment (uses sqrt to scale by area not radius)
    $: rScale = scaleSqrt()
        .domain(extent(processedData, d => d.enrollment))
        .range([10, 20])

    // Log the processed data to check values
    console.log("Processed school data:", processedData)

    // Calculate the average disadvantaged percentage
    $: avgDisadvantagedPercent = processedData.reduce((sum, d) => sum + d.totalDisadvantagedPercent, 0) / processedData.length

    // Create a color scale for disadvantaged percentage
    $: colorScale = scaleThreshold()
        .domain([avgDisadvantagedPercent])
        .range(["#6acf96", "#f7c16f"]) // Schools below average: #f7c16f, Schools above average: #6acf96

    // Create scales with fixed domains to ensure all schools are visible
    $: xScale = scaleLinear()
        .domain([16000, 22000]) // Fixed domain to include all schools
        .range([0, dimensions.innerWidth])
        .nice()

    $: yScale = scaleLinear()
        .domain([40, 75]) // Fixed domain to include all schools' performance values
        .range([dimensions.innerHeight, 0])
        .nice()

    // Format numbers with commas
    const formatMoney = num => `${num.toLocaleString()}`
</script>


<div class="scatterplot-container" bind:clientWidth={width} bind:clientHeight={height}>
<h2 class="text-width">School Performance vs. Per Pupil Spending</h2>
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
        y={-60}
        text-anchor="middle"
        fill={colors.colorText}
        font-size="14px"
        font-weight="600"
    >
        Proficient & Above
    </text>
</g>

<!-- Plot points -->
{#each processedData as school}
    <g class="data-point">
        <!-- Circles sized by school enrollment and colored by disadvantaged percentage -->
        <circle
            cx={xScale(school.expenditure)}
            cy={yScale(school.performance)}
            r={rScale(school.enrollment)}
            fill={colorScale(school.totalDisadvantagedPercent)}
            opacity= 0.8
            stroke={colors.colorBackgroundWhite}
            stroke-width="1"
        >
            <title>
                {school.School}
                Per Pupil Spending: {formatMoney(school.expenditure)}
                Proficient & Above: {school.performance}%
                Students with Disabilities: {school.disabilityPercent}%
                Economically Disadvantaged: {school.economicDisadvantagePercent}%
                Total Disadvantaged: {school.totalDisadvantagedPercent}%
                Total Enrollment: {school.enrollment} students
            </title>
        </circle>
        
        <text
            x={xScale(school.expenditure)}
            y={
                // Adjust vertical position to ensure labels stay within chart
                Math.max(
                    yScale(school.performance) - rScale(school.enrollment) - 5, 
                    0 // Minimum distance from top
                )
            }
            text-anchor="middle"
            font-size="10px"
            fill={colors.colorText}
        >
            {school.shortName}
        </text>
    </g>
{/each}

<!-- Add a legend with grid lines for x-axis -->
<g class="legend" transform="translate({dimensions.innerWidth - 200}, 100)">
    <text font-size="12px" font-weight="600">Circle Size:</text>
    <text y="20" font-size="11px">Total School Enrollment</text>
    
    <!-- Calculate legend circle sizes based on actual enrollment values -->
    <circle cx="20" cy="50" r={rScale(200)} fill=#f7c16f opacity="0.8"/>
    <text x="40" y="53" font-size="10px">200 students</text>
    
    <circle cx="20" cy="85" r={rScale(350)} fill=#f7c16f opacity="0.8"/>
    <text x="40" y="88" font-size="10px">350 students</text>
    
    <circle cx="20" cy="130" r={rScale(500)} fill=#f7c16f opacity="0.8"/>
    <text x="40" y="133" font-size="10px">500 students</text>
</g>

<!-- Add horizontal grid lines for better readability -->
{#each yScale.ticks(5) as tick}
    <line 
        x1={0}
        y1={yScale(tick)}
        x2={dimensions.innerWidth}
        y2={yScale(tick)}
        stroke={colors.colorLightGray}
        stroke-width="0.5"
        stroke-dasharray="4"
    />
{/each}
</SVGChart>
</div>
</div>

<style>
    .scatterplot-container {
        padding: 1rem;
        margin-bottom: 2rem;
    }

    h2 {
        text-align: center;
        margin-bottom: 1rem;
        color: var(--colorText);
        font-family: var(--font-headers);
    }

    .scatterplot {
        width: 100%;
        height: 400px;
        margin: 0 auto;
    }

    .data-point {
        transition: opacity 0.2s;
    }

    .data-point:hover {
        opacity: 1;
    }

    .data-point:hover circle {
        stroke-width: 2;
        stroke: var(--colorText);
    }
</style>