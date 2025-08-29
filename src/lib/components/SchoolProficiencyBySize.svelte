<script>
    import { scaleLinear } from 'd3-scale'
    import { extent } from 'd3-array'
    import { colors } from '$lib/styles/colorConfig'
    import SVGChart from '$lib/components/SVGChart.svelte'
    
    // Import the small schools data
    import smallSchoolsData from '$lib/data/oregon_elementary_schools_complete.json';

    export let width = 800;
    export let height = 500;

    // State variables
    let showSchoolLines = false;
    let selectedCategories = ['Low', 'High']; // Array to track multiple selected categories
    let selectedPeriod = 'post-covid'; // 'pre-covid' or 'post-covid'
    let selectedMetric = 'combined'; // 'economic', 'disability', 'combined'
    let selectedDistrict = 'All Districts'; // Selected district filter
    
    // Define the periods based on our methodological discussion
    const periods = {
        'pre-covid': {
            label: 'Pre-COVID (2016-2019)',
            years: ['2016-2017', '2017-2018', '2018-2019'],
            description: 'Data collected using pre-2021 ODE methodology'
        },
        'post-covid': {
            label: 'Post-COVID (2021-2024)',
            years: ['2021-2022', '2022-2023', '2023-2024'],
            description: 'Data collected using updated ODE methodology'
        }
    };

    // Define the disadvantage metrics
    const disadvantageMetrics = {
        'economic': {
            label: 'Economic Disadvantage Only',
            description: 'Based on economically disadvantaged students only'
        },
        'disability': {
            label: 'Disability Only',
            description: 'Based on students with disabilities only'
        },
        'combined': {
            label: 'Combined Disadvantage',
            description: 'Based on economically disadvantaged + students with disabilities'
        }
    };
    
    // Get unique districts for dropdown
    $: uniqueDistricts = (() => {
        const districts = [...new Set(smallSchoolsData.map(school => school["District Name"]).filter(Boolean))];
        return districts.sort();
    })();
    
    // Process the imported data to match our component's needs
    $: allSchoolData = smallSchoolsData.map(school => {
        // Parse numeric values and calculate proficiency as average of ELA and Math
        const elaProf = parseFloat(school["ELA Proficient & Above %"]?.replace(/%/g, '') || "0");
        const mathProf = parseFloat(school["Math Proficient & Above %"]?.replace(/%/g, '') || "0");
        const proficiency = (elaProf + mathProf) / 2;
        
        // Parse other numeric fields
        const econDisadv = parseFloat(school["Economically Disadvantaged %"]?.replace(/%/g, '') || "0");
        const disability = parseFloat(school["Students w/Disabilities %"]?.replace(/%/g, '') || "0");
        const spendingStr = school["Per Pupil Spending"]?.replace(/\$|,/g, '') || "0";
        const spending = spendingStr === "" || spendingStr === "x" ? 0 : parseInt(spendingStr);
        const students = school["Total School Enrollment"];
        
        // Create simplified school name
        const shortName = school.School.replace(" Primary School", "");
        
        // Assign year order for connecting lines within each period
        let yearOrder;
        if (periods['pre-covid'].years.includes(school["School Year"])) {
            yearOrder = periods['pre-covid'].years.indexOf(school["School Year"]) + 1;
        } else if (periods['post-covid'].years.includes(school["School Year"])) {
            yearOrder = periods['post-covid'].years.indexOf(school["School Year"]) + 1;
        }
        
        return {
            school: shortName,
            year: school["School Year"],
            students: students,
            econDisadv: econDisadv,
            disability: disability,
            proficiency: proficiency,
            spending: spending,
            yearOrder: yearOrder,
            period: periods['pre-covid'].years.includes(school["School Year"]) ? 'pre-covid' : 'post-covid',
            districtName: school["District Name"]
        };
    });

    // Filter data based on selected period and district
    $: schoolData = allSchoolData.filter(school => {
        const periodMatch = school.period === selectedPeriod;
        const districtMatch = selectedDistrict === 'All Districts' || school.districtName === selectedDistrict;
        return periodMatch && districtMatch;
    });
    
    // Tooltip state
    let tooltipVisible = false;
    let tooltipData = null;
    let tooltipX = 0;
    let tooltipY = 0;

    let dimensions = {
        width,
        height,
        margin: { top: 40, right: 350, bottom: 80, left: 70 },
        innerWidth: 0,
        innerHeight: 0
    };

    $: {
        dimensions.innerWidth = width - dimensions.margin.left - dimensions.margin.right;
        dimensions.innerHeight = height - dimensions.margin.top - dimensions.margin.bottom;
    }

    // Get the disadvantage value based on selected metric
    const getDisadvantageValue = (school, metric) => {
        switch (metric) {
            case 'economic':
                return school.econDisadv;
            case 'disability':
                return school.disability;
            case 'combined':
            default:
                return school.econDisadv + school.disability;
        }
    };

    // Calculate dynamic thresholds for equal distribution across categories (binary split)
    $: filteredThresholds = (() => {
        const filteredData = allSchoolData.filter(school => {
            const periodMatch = school.period === selectedPeriod;
            const districtMatch = selectedDistrict === 'All Districts' || school.districtName === selectedDistrict;
            return periodMatch && districtMatch;
        });
        const disadvValues = filteredData.map(school => getDisadvantageValue(school, selectedMetric)).sort((a, b) => a - b);
        
        if (disadvValues.length === 0) return { median: 30 };
        
        const n = disadvValues.length;
        
        // For binary split, use median
        const medianIndex = Math.floor(n / 2);
        const medianThreshold = disadvValues[medianIndex] + 0.001;
        
        return { median: medianThreshold };
    })();

    // Define disadvantage categories with binary split
    const getDisadvantageCategory = (disadvValue) => {
        const thresholds = filteredThresholds;
        
        if (disadvValue < thresholds.median) return { category: 'Low', color: '#01b6e1' }; // Blue
        return { category: 'High', color: '#ff9900' }; // Orange
    };

    // Process data
    $: coloredData = schoolData.map(item => {
        const disadvValue = getDisadvantageValue(item, selectedMetric);
        const { category, color } = getDisadvantageCategory(disadvValue);
        return {
            ...item,
            disadvValue,
            totalDisadv: item.econDisadv + item.disability, // Keep for tooltip
            color: color,
            disadvCategory: category
        };
    });

    // Create scales - dynamic based on data
    $: xExtent = extent(coloredData, d => d.students);
    $: yExtent = extent(coloredData, d => d.proficiency);
    
    $: xScale = scaleLinear()
        //.domain([Math.max(200, xExtent[0] - 50), xExtent[1] + 50])
        .domain([200, 900])
        .range([0, dimensions.innerWidth])
        .nice();

    $: yScale = scaleLinear()
        //.domain([Math.max(30, yExtent[0] - 5), Math.min(85, yExtent[1] + 5)])
        .domain([0, 90])
        .range([dimensions.innerHeight, 0])
        .nice();

    // Group data by school for connecting lines
    $: schoolGroups = (() => {
        const groups = {};
        coloredData.forEach(item => {
            if (!groups[item.school]) {
                groups[item.school] = [];
            }
            groups[item.school].push(item);
        });
        
        // Sort each school's data by year order
        Object.keys(groups).forEach(school => {
            groups[school].sort((a, b) => a.yearOrder - b.yearOrder);
        });
        
        return groups;
    })();

    // Generate line segments for each school
    $: schoolLines = (() => {
        const lines = [];
        Object.keys(schoolGroups).forEach(school => {
            const schoolData = schoolGroups[school];
            for (let i = 0; i < schoolData.length - 1; i++) {
                const startPoint = schoolData[i];
                const endPoint = schoolData[i + 1];
                
                lines.push({
                    x1: startPoint.students,
                    y1: startPoint.proficiency,
                    x2: endPoint.students,
                    y2: endPoint.proficiency,
                    school: school,
                    segment: `${startPoint.year} → ${endPoint.year}`
                });
            }
        });
        return lines;
    })();

    // Calculate trendlines for each category
    $: categoryTrendlines = (() => {
        const categories = ['Low', 'High'];
        const categoryColors = {
            'Low': '#01b6e1',
            'High': '#ff9900'
        };
        
        const trendlines = categories.map(category => {
            const categoryData = coloredData.filter(item => item.disadvCategory === category);
            
            if (categoryData.length < 2) return null; // Need at least 2 points for a trendline
            
            // Calculate linear regression
            const n = categoryData.length;
            let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
            
            categoryData.forEach(item => {
                sumX += item.students;
                sumY += item.proficiency;
                sumXY += item.students * item.proficiency;
                sumX2 += item.students * item.students;
            });
            
            const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
            const intercept = (sumY - slope * sumX) / n;
            
            // Generate trendline points
            const minX = Math.min(...categoryData.map(item => item.students));
            const maxX = Math.max(...categoryData.map(item => item.students));
            
            return {
                category,
                color: categoryColors[category],
                points: [
                    { x: minX, y: intercept + slope * minX },
                    { x: maxX, y: intercept + slope * maxX }
                ],
                dataCount: categoryData.length
            };
        }).filter(Boolean); // Remove null entries
        
        return trendlines;
    })();

    // Format functions
    const formatNumber = num => num.toLocaleString();
    const formatMoney = value => value > 0 ? `$${value.toLocaleString()}` : 'N/A';

    // Get the metric label for display
    const getMetricLabel = (metric) => {
        switch (metric) {
            case 'economic':
                return 'Economic Disadvantage';
            case 'disability':
                return 'Students with Disabilities';
            case 'combined':
            default:
                return 'Combined Disadvantage';
        }
    };

    // Legend data - dynamic based on filtered data and actual thresholds
    $: categoricalLegend = (() => {
        const thresholds = filteredThresholds;
        const metricLabel = getMetricLabel(selectedMetric);
        return [
            { category: `Low Combined Disadvantage`, range: `<${thresholds.median.toFixed(1)}%`, color: '#01b6e1' },
            { category: `High Combined Disadvantage`, range: `≥${thresholds.median.toFixed(1)}%`, color: '#ff9900' }
        ];
    })();

    // Handle tooltip
    function showTooltip(item, event) {
        tooltipData = item;
        tooltipX = event.offsetX + 15;
        tooltipY = event.offsetY - 10;
        
        const tooltipWidth = 250;
        const tooltipHeight = 200;
        
        if (tooltipX + tooltipWidth > width) {
            tooltipX = tooltipX - tooltipWidth - 30;
        }
        
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
        <h2 class="text-width">School Size, % Disadvantaged and Proficiency</h2>
        
        <!-- Period and Metric selectors -->
        <div class="selector-container">
            <div class="period-selector">
                <label for="period-select" class="period-label">Data Period:</label>
                <select id="period-select" bind:value={selectedPeriod} class="period-dropdown">
                    <option value="post-covid">{periods['post-covid'].label}</option>
                    <option value="pre-covid">{periods['pre-covid'].label}</option>
                </select>
            </div>
            
            <div class="metric-selector">
                <label for="metric-select" class="metric-label">Disadvantage Metric:</label>
                <select id="metric-select" bind:value={selectedMetric} class="metric-dropdown">
                    <option value="combined">{disadvantageMetrics['combined'].label}</option>
                    <option value="economic">{disadvantageMetrics['economic'].label}</option>
                    <option value="disability">{disadvantageMetrics['disability'].label}</option>
                </select>
            </div>
            
            <div class="district-selector">
                <label for="district-select" class="district-label">School District:</label>
                <select id="district-select" bind:value={selectedDistrict} class="district-dropdown">
                    <option value="All Districts">All Districts</option>
                    {#each uniqueDistricts as district}
                        <option value={district}>{district}</option>
                    {/each}
                </select>
            </div>
        </div>
        
        <!-- Legend with integrated checkboxes -->
        <div class="legend-container">
            <p class="filter">Select to filter:</p>
            {#each categoricalLegend as item}
                <label class="legend-item interactive-legend" style="cursor: pointer;">
                    <input 
                        type="checkbox" 
                        bind:group={selectedCategories} 
                        value={item.category.split(' ')[0]}
                        class="legend-checkbox"
                    >
                    <div class="legend-color" style="background-color: {item.color}"></div>
                    <span class="legend-text">
                        <strong>{item.category}</strong>
                        <span class="legend-range">({item.range})</span>
                    </span>
                </label>
            {/each}
        </div>
        
        <!-- Controls -->
        <div class="chart-controls">
            <label class="control-label">
                <input type="checkbox" bind:checked={showSchoolLines}>
                Show School Progress Lines
            </label>
        </div>
    </div>
    
    <div class="scatterplot">
        <SVGChart {dimensions}>
            <!-- Grid lines -->
            <g class="grid">
                {#each xScale.ticks(8) as tick}
                    <line 
                        x1={xScale(tick)}
                        y1={0}
                        x2={xScale(tick)}
                        y2={dimensions.innerHeight}
                        stroke={colors.colorLightGray}
                        stroke-width="0.5"
                        stroke-dasharray="2,2"
                    />
                {/each}
                {#each yScale.ticks(6) as tick}
                    <line 
                        x1={0}
                        y1={yScale(tick)}
                        x2={dimensions.innerWidth}
                        y2={yScale(tick)}
                        stroke={colors.colorLightGray}
                        stroke-width="0.5"
                        stroke-dasharray="2,2"
                    />
                {/each}
            </g>

            <!-- X-axis -->
            <g class="x-axis">
                <line 
                    x1={0}
                    y1={dimensions.innerHeight}
                    x2={dimensions.innerWidth}
                    y2={dimensions.innerHeight}
                    stroke={colors.colorLightGray}
                    stroke-width="1"
                />
                
                {#each xScale.ticks(8) as tick}
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

                <text
                    x={dimensions.innerWidth / 2}
                    y={dimensions.innerHeight + 50}
                    text-anchor="middle"
                    fill={colors.colorText}
                    font-size="14px"
                    font-weight="600"
                >
                    Number of Students
                </text>
            </g>

            <!-- Y-axis -->
            <g class="y-axis">
                <line 
                    x1={0}
                    y1={0}
                    x2={0}
                    y2={dimensions.innerHeight}
                    stroke={colors.colorLightGray}
                    stroke-width="1"
                />
                
                {#each yScale.ticks(6) as tick}
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

                <text
                    transform="rotate(-90)"
                    x={-dimensions.innerHeight / 2}
                    y={-50}
                    text-anchor="middle"
                    fill={colors.colorText}
                    font-size="14px"
                    font-weight="600"
                >
                    Proficiency (ELA/Math Average)
                </text>
            </g>

            <!-- School progress lines -->
            {#if showSchoolLines}
                <g class="school-lines">
                    {#each schoolLines as line}
                        <line
                            x1={xScale(line.x1)}
                            y1={yScale(line.y1)}
                            x2={xScale(line.x2)}
                            y2={yScale(line.y2)}
                            stroke="#999"
                            stroke-width="1.5"
                            stroke-opacity="0.6"
                            stroke-dasharray="4,4"
                        />
                    {/each}
                </g>
            {/if}

            <!-- Category trendlines -->
            {#if selectedCategories.length > 0}
                <g class="category-trendlines">
                    {#each categoryTrendlines as trendline}
                        {@const isSelected = selectedCategories.includes(trendline.category)}
                        {#if isSelected}
                            <line
                                x1={xScale(trendline.points[0].x)}
                                y1={yScale(trendline.points[0].y)}
                                x2={xScale(trendline.points[1].x)}
                                y2={yScale(trendline.points[1].y)}
                                stroke={trendline.color}
                                stroke-width="3"
                                stroke-opacity="0.8"
                            />
                            
                            <!-- Trendline label -->
                            <text
                                x={xScale(trendline.points[1].x) + 5}
                                y={yScale(trendline.points[1].y)}
                                fill={trendline.color}
                                font-size="12px"
                                font-weight="600"
                                dominant-baseline="middle"
                            >
                                {trendline.category} {getMetricLabel(selectedMetric)}
                            </text>
                        {/if}
                    {/each}
                </g>
            {/if}

            <!-- Data points -->
            <g class="data-points">
                {#each coloredData as item}
                    {@const isSelected = selectedCategories.length === 0 || selectedCategories.includes(item.disadvCategory)}
                    <circle
                        cx={xScale(item.students)}
                        cy={yScale(item.proficiency)}
                        r="6"
                        fill={isSelected ? item.color : '#ccc'}
                        stroke="white"
                        stroke-width="1"
                        opacity={isSelected ? 0.8 : 0.3}
                        on:mouseenter={(e) => showTooltip(item, e)}
                        on:mouseleave={hideTooltip}
                        style="cursor: pointer;"
                    />
                {/each}
            </g>
        </SVGChart>

        <!-- Custom tooltip -->
        {#if tooltipVisible && tooltipData}
            <div class="tooltip" style="left: {tooltipX}px; top: {tooltipY}px">
                <div class="tooltip-header">{tooltipData.school}</div>
                <div class="tooltip-year">{tooltipData.year}</div>
                <div class="tooltip-content">
                    <div class="tooltip-row">
                        <span class="tooltip-label">Students:</span>
                        <span class="tooltip-value">{formatNumber(tooltipData.students)}</span>
                    </div>
                    <div class="tooltip-row">
                        <span class="tooltip-label">Proficiency:</span>
                        <span class="tooltip-value">{tooltipData.proficiency.toFixed(1)}%</span>
                    </div>
                    <div class="tooltip-row">
                        <span class="tooltip-label">Econ. Disadvantaged:</span>
                        <span class="tooltip-value">{tooltipData.econDisadv.toFixed(1)}%</span>
                    </div>
                    <div class="tooltip-row">
                        <span class="tooltip-label">Students w/ Disabilities:</span>
                        <span class="tooltip-value">{tooltipData.disability.toFixed(1)}%</span>
                    </div>
                    <div class="tooltip-row">
                        <span class="tooltip-label">Selected Metric:</span>
                        <span class="tooltip-value">{tooltipData.disadvValue.toFixed(1)}% ({tooltipData.disadvCategory})</span>
                    </div>
                    <div class="tooltip-row">
                        <span class="tooltip-label">Per Pupil Spending:</span>
                        <span class="tooltip-value">{formatMoney(tooltipData.spending)}</span>
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
        margin-bottom: 1.5rem;
    }

    h2 {
        margin: 0 auto 0.5rem;
        color: var(--colorText);
        font-family: var(--font-headers);
        text-align: center;
    }

    .selector-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        margin-bottom: 0.75rem;
        flex-wrap: wrap;
    }

    .period-selector,
    .metric-selector,
    .district-selector {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .period-label,
    .metric-label,
    .district-label {
        font-weight: 600;
        color: var(--colorText);
        white-space: nowrap;
    }

    .period-dropdown,
    .metric-dropdown,
    .district-dropdown {
        padding: 0.5rem 1rem;
        border: 2px solid var(--colorLightGray);
        border-radius: 6px;
        background: white;
        font-size: 0.9rem;
        cursor: pointer;
        transition: border-color 0.2s ease;
        min-width: 200px;
    }

    .period-dropdown:focus,
    .metric-dropdown:focus,
    .district-dropdown:focus {
        outline: none;
        border-color: var(--colorPrimary);
    }

    .subtitle {
        text-align: center;
        color: var(--colorDarkGray);
        margin-bottom: 1rem;
        font-size: 0.9rem;
    }

    .methodology-notice {
        background-color: #fff3cd;
        border: 1px solid #ffeaa7;
        border-radius: 6px;
        padding: 0.75rem;
        margin-bottom: 1rem;
        text-align: center;
        font-size: 0.85rem;
        color: #856404;
    }

    .legend-container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1.5rem;
        margin-bottom: 1rem;
    }

    .filter {
        font-style: italic;
        font-size: 0.9rem;
        font-weight: 600;
        padding-top: 0.5rem;
    }

    .legend-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: opacity 0.2s ease;
    }

    .interactive-legend {
        padding: 0.5rem;
        border-radius: 6px;
        border: 2px solid transparent;
        transition: all 0.2s ease;
    }

    .interactive-legend:hover {
        background-color: rgba(0, 0, 0, 0.05);
        border-color: rgba(0, 0, 0, 0.1);
    }

    .interactive-legend input[type="checkbox"]:checked + .legend-color {
        box-shadow: 0 0 0 2px white, 0 0 0 4px var(--colorText);
    }

    .legend-checkbox {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    .legend-color {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        transition: box-shadow 0.2s ease;
    }

    .legend-text {
        font-size: 0.9rem;
        user-select: none;
    }

    .legend-range {
        color: var(--colorDarkGray);
        font-weight: normal;
    }

    .chart-controls {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        margin-bottom: 1rem;
    }

    .control-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        font-size: 0.9rem;
    }

    .control-label input[type="checkbox"] {
        cursor: pointer;
    }

    .scatterplot {
        width: 100%;
        height: 500px;
        margin: 0 auto;
        position: relative;
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
        margin-bottom: 4px;
        font-size: 14px;
        color: var(--colorText);
    }

    .tooltip-year {
        font-size: 12px;
        color: var(--colorDarkGray);
        margin-bottom: 8px;
    }

    .tooltip-content {
        font-size: 12px;
    }

    .tooltip-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 3px;
    }

    .tooltip-label {
        font-weight: 600;
        color: var(--colorDarkGray);
    }

    .tooltip-value {
        text-align: right;
        color: var(--colorText);
    }

    .category-trendlines line {
        stroke-linecap: round;
    }

    @media (max-width: 768px) {
        .selector-container {
            flex-direction: column;
            gap: 1rem;
        }

        .period-selector,
        .metric-selector,
        .district-selector {
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
        }

        .period-dropdown,
        .metric-dropdown,
        .district-dropdown {
            min-width: 250px;
        }

        .chart-controls {
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
        }

        .legend-container {
            gap: 1rem;
        }

        .legend-item {
            font-size: 0.8rem;
        }

        .tooltip {
            width: 220px;
            font-size: 11px;
        }

        .scatterplot {
            height: 400px;
        }
    }
</style>