# .gitignore

```
.DS_Store
node_modules
/build
/.svelte-kit
/package
.env
.env.*
!.env.example
vite.config.js.timestamp-*
vite.config.ts.timestamp-*
codebase.md
.aidigestignore
```

# .npmrc

```
engine-strict=true

```

# feedback.json

```json
{"type":"negative","feedback":"it's this and this and this and this","timestamp":"2024-12-09T21:09:44.712Z"}
{"type":"positive","feedback":"this is amazinnngggg!!!!!!!!!","timestamp":"2024-12-09T21:09:55.904Z"}

```

# package.json

```json
{
	"name": "adadata",
	"version": "0.0.1",
	"private": true,
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"preview": "vite preview"
	},
	"devDependencies": {
		"@sveltejs/adapter-auto": "^3.0.0",
		"@sveltejs/kit": "^2.0.0",
		"@sveltejs/vite-plugin-svelte": "^3.0.0",
		"svelte": "^4.2.17",
		"vite": "^5.0.3"
	},
	"type": "module",
	"dependencies": {
		"@sveltejs/svelte-scroller": "^2.0.7",
		"d3": "^7.9.0",
		"lucide-svelte": "^0.453.0",
		"svelecte": "^4.1.0",
		"tippy.js": "^6.3.7",
		"topojson-client": "^3.1.0"
	}
}

```

# README.md

```md
# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

\`\`\`bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
\`\`\`

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

\`\`\`bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
\`\`\`

## Building

To create a production version of your app:

\`\`\`bash
npm run build
\`\`\`

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

```

# src/app.html

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="%sveltekit.assets%/favicon.png" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />

		<script defer data-domain="specialeducationdata.org" src="https://plausible.io/js/script.js"></script>

		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Bitter:wght@400;600;700;800;900&family=Source+Sans+3:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600;1,700;1,900&display=swap" rel="stylesheet">

		%sveltekit.head%
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>

```

# src/lib/components/AlertsCards.svelte

```svelte
<script>
    import { colors } from "$lib/styles/colorConfig"

    export let alertsData
    
    // Filter out alerts with no data
    $: validAlerts = alertsData.filter(alert => 
        alert.value !== undefined && 
        alert.value !== null
    )
</script>


<div class="alerts">
    {#each validAlerts as alert}
        <div class="alert-card">
            {#if alert.value === "Yes"}
                <div class="svg-container">
                    <!-- exclamation mark -->
                    <svg width="20px" height="90px" viewBox="0 0 20 90" xmlns="http://www.w3.org/2000/svg" style="transform: scale(0.75);">
                        <line 
                            x1="10" y1="20" 
                            x2="10" y2="60" 
                            stroke={colors.colorSeparate} 
                            stroke-width="12" 
                            stroke-linecap="round"
                        />
                        <circle 
                            cx="10" cy="80" 
                            r="8" 
                            fill={colors.colorSeparate}
                        />
                    </svg>
                    <!-- check mark -->
                    <svg width="77px" height="90px" viewBox="0 0 77 90" style="transform: scale(0.75);">
                        <path 
                            d="M7,55 L27,75 L67,25" 
                            stroke={colors.colorLightGray} 
                            stroke-width="12" 
                            fill="none" 
                            stroke-linecap="round" 
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
            {:else}
                <div class="svg-container">
                    <!-- exclamation mark -->
                    <svg width="20px" height="90px" viewBox="0 0 20 90" style="transform: scale(0.75);">
                        <line 
                            x1="10" y1="20" 
                            x2="10" y2="60" 
                            stroke={colors.colorLightGray} 
                            stroke-width="12" 
                            stroke-linecap="round"
                        />
                        <circle 
                            cx="10" cy="80" 
                            r="8" 
                            fill={colors.colorLightGray}
                        />
                    </svg>
                    <!-- check mark -->
                    <svg width="77px" height="90px" viewBox="0 0 77 90" style="transform: scale(0.75);">
                        <path 
                            d="M7,55 L27,75 L67,25" 
                            stroke={colors.colorInclusive} 
                            stroke-width="12" 
                            fill="none" 
                            stroke-linecap="round" 
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
            {/if}

            {#if alert.name === "Suspension/Expulsion"}
                <p class="alert-description">{alert.value === "Yes" ? "This district reported disproportionate discipline of students with IEPs" : "No reports of disproportionate discipline of students with IEPs" }</p>
            {:else if alert.name === "Suspension/Expulsion by race"}
                <p class="alert-description">{alert.value === "Yes" ? "This district reported disproportionate discipline of students with IEPs in certain racial groups" : "No reports of disproportionate discipline of students with IEPs in certain racial groups" }</p>
            {:else if alert.name === "Disproportionate representation"}
                <p class="alert-description">{alert.value === "Yes" ? "This district reported disproportionate identification of students in certain racial groups as having a disability" : "No reports of disproportionate identification of students in certain racial groups as having a disability" }</p>
            {:else if alert.name === "Disproportionate representation by disability"}
                <p class="alert-description">{alert.value === "Yes" ? "This district reported disproportionate identification of students in certain racial groups as having a specific disability" : "No reports of disproportionate identification of students in certain racial groups as having a certain disability" }</p>
            {/if}
        </div>
    {/each}
</div>


<style>
    .alerts {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1rem;
        max-width: 100%;
    }

    .alert-card {
        width: 100%;
        max-width: 140px;
        margin-top: -0.5rem;
    }

    .alert-card p {
        margin-top: -1rem;
        line-height: 1.4rem;
    }

    .alert-description {
        font-size: 0.9rem;
        margin-bottom: 0;
    }

    .svg-container {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-bottom: 1rem;
    }
</style>
```

# src/lib/components/Beeswarm.svelte

```svelte
<script>
  import { onMount } from 'svelte'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { data, minWeightedInclusion, maxWeightedInclusion } from '$lib/stores/stores.js'
  import { scaleLinear, scaleSqrt } from 'd3-scale'
  import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force'
  import { extent } from 'd3-array'
  import { colors } from '$lib/styles/colorConfig'

  import SVGChart from './SVGChart.svelte'

  // Filter out data rows with no "weighted_inclusion" value
  let filteredData = $data.filter(d => d.properties.weighted_inclusion !== null && d.properties.weighted_inclusion !== undefined)

  // Chart dimensions & initial values
  let width = 800
  let height = 400
  let dimensions = {}
  const margin = { top: 0, right: 0, bottom: 0, left: 0 }

  $: dimensions = { 
    width, 
    height, 
    margin,
    innerWidth: width - margin.left - margin.right,
    innerHeight: height - margin.top - margin.bottom
  }

  $: xScale = scaleLinear()
    .domain($minWeightedInclusion !== undefined && $maxWeightedInclusion !== undefined 
      ? [$minWeightedInclusion, $maxWeightedInclusion] 
      : [0, 1])
    .range([dimensions.margin.left, dimensions.innerWidth])

  $: rScale = scaleSqrt()
    .domain(extent(filteredData, d => d.properties['Total Student Count']))
    .range(width < 568 ? [2, 20] : [3, 50])

  // Force simulation
  let bubblePadding = 2
  let simulatedData = []

  $: {
    if (dimensions.innerWidth && xScale) {
      runSimulation()
    }
  }

  function runSimulation() {
    const simulation = forceSimulation(filteredData)
      .force('x', forceX(d => xScale(d.properties.weighted_inclusion)).strength(1))
      .force('y', forceY(dimensions.innerHeight / 2))
      .force('collide', forceCollide(d => rScale(d.properties['Total Student Count']) + bubblePadding))
      .stop()

    for (let i = 0; i < 120; ++i) simulation.tick()

    simulatedData = filteredData.map(d => ({
      ...d,
      x: d.x,
      y: d.y,
      opacity: 0
    }))
  }

  let animationProgress = tweened(0, {
    duration: 500,
    easing: cubicOut
  })

  onMount(() => {
    runSimulation()
    setTimeout(() => animationProgress.set(1), 0)
  })

  $: {
    if (simulatedData.length > 0 && $animationProgress > 0) {
      simulatedData = simulatedData.map((d, i) => ({
        ...d,
        opacity: Math.max(0, Math.min(0.4, ($animationProgress * simulatedData.length - i + 5) / 5))
      }))
    }
  }
</script>

<div class="districts-beeswarm" bind:clientWidth={width} bind:clientHeight={height}>
  <SVGChart dimensions={dimensions}>
      {#each simulatedData as district, i}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
            <circle
              cx={district.x}
              cy={district.y}
              r={rScale(district.properties['Total Student Count'])}
              fill={colors.colorInclusive}
              opacity={district.opacity}
            />
      {/each}
  </SVGChart>
</div>

<style>
  .districts-beeswarm {
    height: 400px;
    min-width: 500px;
    width: 100%;
  }
</style>
```

# src/lib/components/BubbleMap.svelte

```svelte
<script>
    import { onMount, afterUpdate } from 'svelte'
    import { writable } from 'svelte/store'
    import { 
        geoBounds, 
        geoTransverseMercator, 
        geoPath, 
        scaleOrdinal, 
        scaleSqrt, 
        extent,
        forceSimulation,
        forceCollide,
        forceX,
        forceY
    } from 'd3'
    import { data, selectedDistricts, primaryDistrictId } from '$lib/stores/stores.js'
    import { colors } from "$lib/styles/colorConfig"
    import { browser } from '$app/environment'
    import { fade } from 'svelte/transition'
    import tippy from 'tippy.js'
    import 'tippy.js/dist/tippy.css'
  
    // Reference cities to help with orientation
    const majorCities = [
        { name: "Portland", lon: -122.6784, lat: 45.5152 },
        { name: "Salem", lon: -123.0351, lat: 44.9429 },
        { name: "Eugene", lon: -123.0868, lat: 44.0521 },
        { name: "Bend", lon: -121.3153, lat: 44.0582 },
        { name: "Medford", lon: -122.8756, lat: 42.3265 }
    ];
    
    $: featureCollection = {
      type: "FeatureCollection",
      features: $data
    }
  
    let dims = { width: 0, height: 0 }
    let centralLat = 43.9
    let centralLong = -120.5
  
    let projection
    let districtPathGenerator
    let mapElement
    let simulation
    let nodes = []  // Will store our circle data
    let mapReady = false // Flag to track if the map is ready to render
    let showLabels = true // Option to toggle city labels
    
    // Find the bounds encompassing all districts in the state
    let minLng = Infinity, minLat = Infinity, maxLng = -Infinity, maxLat = -Infinity;
  
    $: {
        $data.forEach(feature => {
            if(feature.geometry) {
                const [[featureMinLng, featureMinLat], [featureMaxLng, featureMaxLat]] = geoBounds(feature);
        
                if (featureMinLng < minLng) minLng = featureMinLng
                if (featureMinLat < minLat) minLat = featureMinLat
                if (featureMaxLng > maxLng) maxLng = featureMaxLng
                if (featureMaxLat > maxLat) maxLat = featureMaxLat
            }
        })
    }

    // Get the selected district data for highlighting
    $: selectedDistrictData = $data.find(d => d.properties.GEOID === $primaryDistrictId);

    function updateProjection() {
        if (!browser || !mapElement || !$data.length) return
        
        // Use setTimeout to ensure DOM is fully ready
        setTimeout(() => {
            // Make sure mapElement has dimensions before proceeding
            if (mapElement.offsetWidth === 0 || mapElement.offsetHeight === 0) {
                // Set default dimensions if not available from the element
                dims.width = dims.width || 800;
                dims.height = dims.height || 400;
            } else {
                dims.width = mapElement.offsetWidth
                dims.height = mapElement.offsetHeight
            }
            
            // Only proceed if we have valid dimensions and data
            if (dims.width > 0 && dims.height > 0 && $data.length > 0) {
                projection = geoTransverseMercator()
                    .rotate([-centralLong, -centralLat])
                    .fitSize([dims.width, dims.height], featureCollection);
            
                districtPathGenerator = geoPath(projection);

                // Update nodes with new positions
                updateNodesData();
                
                // Mark map as ready to render
                mapReady = true;
            }
        }, 100); // Small delay to ensure DOM is ready
    }
  
    let currentTransform = writable({ x: 0, y: 0, k: 1 })
    let svgElement
    let gElement
  
    $: colorScale = scaleOrdinal()
        .domain([1, 2, 3, 4])
        .range([colors.colorSeparate, colors.colorNonInclusive, colors.colorSemiInclusive, colors.colorInclusive])

    $: rScale = scaleSqrt()
        .domain(extent($data, d => d.properties['Total Student Count'] || 0))
        .range([3, 50])

    function updateNodesData() {
        if (!districtPathGenerator || !$data.length) return

        // Create nodes array with initial positions from centroids
        nodes = $data
            .filter(d => 
                d.properties.GEOID !== "999999" && 
                d.properties.weighted_inclusion !== null && 
                d.properties.weighted_inclusion !== undefined &&
                d.geometry // Ensure geometry exists
            )
            .map(district => {
                try {
                    const centroid = districtPathGenerator.centroid(district);
                    // Check if centroid is valid (not NaN)
                    const x = isNaN(centroid[0]) ? dims.width / 2 : centroid[0];
                    const y = isNaN(centroid[1]) ? dims.height / 2 : centroid[1];
                    
                    return {
                        x,
                        y,
                        originalX: x,
                        originalY: y,
                        r: rScale(district.properties['Total Student Count'] || 0),
                        district: district,
                        isSelected: $selectedDistricts.includes(district.properties.GEOID),
                        isPrimary: district.properties.GEOID === $primaryDistrictId
                    }
                } catch (e) {
                    console.warn("Error processing district:", district.properties.GEOID);
                    // Provide fallback values
                    return {
                        x: dims.width / 2,
                        y: dims.height / 2,
                        originalX: dims.width / 2,
                        originalY: dims.height / 2,
                        r: 5, // Default small radius
                        district: district,
                        isSelected: $selectedDistricts.includes(district.properties.GEOID),
                        isPrimary: district.properties.GEOID === $primaryDistrictId
                    }
                }
            });

        // Initialize or update force simulation
        if (!simulation) {
            simulation = forceSimulation(nodes)
                .force('collision', forceCollide().radius(d => d.r + 1))
                .force('x', forceX(d => d.originalX).strength(0.2))
                .force('y', forceY(d => d.originalY).strength(0.2))
                .on('tick', () => {
                    // Force Svelte to update by assigning to nodes
                    nodes = [...nodes]
                })
        } else {
            simulation.nodes(nodes)
            simulation.alpha(1).restart()
        }
    }

    // Toggle city labels
    function toggleLabels() {
        showLabels = !showLabels;
    }

    // Calculate selected district's label position
    $: selectedLabelPosition = (() => {
        if (!selectedDistrictData || !projection || !selectedDistrictData.geometry) return null;
        
        const centroid = districtPathGenerator.centroid(selectedDistrictData);
        if (isNaN(centroid[0]) || isNaN(centroid[1])) return null;
        
        return {
            x: centroid[0],
            y: centroid[1] - 15 // Position label above the district
        };
    })();

    onMount(() => {
        if (!browser) return
        
        // Wait a bit before initializing to make sure DOM is ready
        setTimeout(updateProjection, 200)
        
        // Set up resize handler
        const handleResize = () => {
            // Add debounce to avoid too many updates
            clearTimeout(window.resizeTimer);
            window.resizeTimer = setTimeout(updateProjection, 250);
        };
        
        window.addEventListener('resize', handleResize)
        
        return () => {
            if (simulation) simulation.stop()
            window.removeEventListener('resize', handleResize)
            clearTimeout(window.resizeTimer);
        }
    })

    // Re-initialize when data changes
    $: if (browser && $data.length) {
        setTimeout(updateProjection, 200)
    }

    // Update nodes when selection changes
    $: if (nodes.length > 0) {
        nodes = nodes.map(node => ({
            ...node,
            isSelected: $selectedDistricts.includes(node.district.properties.GEOID),
            isPrimary: node.district.properties.GEOID === $primaryDistrictId
        }));
    }

    // Handle clicks on districts
    function handleDistrictClick(district) {
        const districtId = district.properties.GEOID;
        
        selectedDistricts.update(districts => {
            // If the district is already selected, move it to the front (make it primary)
            if (districts.includes(districtId)) {
                const filtered = districts.filter(id => id !== districtId);
                return [districtId, ...filtered];
            } else {
                // If it's not selected, add it to the front
                return [districtId, ...districts];
            }
        });
    }

    // Tooltip content generation function to match DistrictsBeeswarm
    function tooltipContent(nodeData) {
        return `
            <span style="font-family:'Source Sans 3', sans-serif;"><strong>${nodeData["Institution Name"]}</strong><br>
            Inclusion score: <strong>${nodeData.quartile}</strong> out of 4 ${nodeData["Total Student Count"] < 500 ? '<strong>*</strong>' : ''}<br>
            <strong>${nodeData["Total Student Count"]}</strong> students with IEPs<br>
            <a class="tooltip-link" href="/${nodeData.GEOID}"><strong>Learn more ></strong></a></span>
        `;
    }

    // Tooltip action for Svelte
    function tooltipAction(element, nodeContent) {
        const tooltip = tippy(element, {
            content: nodeContent,
            allowHTML: true,
            interactive: true,
            appendTo: document.body,
            animation: 'fade',
            delay: [100, 0],
            placement: 'top',
            theme: 'custom'
        });

        return {
            update(newContent) {
                tooltip.setContent(newContent);
            },
            destroy() {
                tooltip.destroy();
            }
        };
    }
</script>

<div id="map" bind:this={mapElement} style="width: 100%; height: 100%;">
    <div class="map-controls">
        <button class="control-btn" on:click={toggleLabels}>
            {showLabels ? 'Hide' : 'Show'} City Labels
        </button>
    </div>

    {#if mapReady && projection && districtPathGenerator && dims.width > 0 && dims.height > 0}
        <svg bind:this={svgElement} width={dims.width} height={dims.height}>
            <g bind:this={gElement}>
                <!-- Background map shapes -->
                <g>
                    {#each $data as district}
                        {#if district.properties.GEOID !== "999999" && district.geometry}
                            <path
                                class="districtShape"
                                d={districtPathGenerator(district)}
                                fill="none"
                                fill-rule="evenodd"
                                stroke={colors.colorLightGray}
                                stroke-width="0.5"
                            ></path>
                        {/if}
                    {/each}
                    
                    <!-- First render non-selected circles -->
                    {#each nodes as node}
                        {#if !isNaN(node.x) && !isNaN(node.y) && node.r > 0 && !node.isPrimary}
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <circle
                                cx={node.x}
                                cy={node.y}
                                r={node.r}
                                fill={colorScale(node.district.properties.quartile)}
                                stroke={node.isSelected ? colors.colorDarkGray : colors.colorBackgroundWhite}
                                stroke-width={node.isSelected ? 2 : 1}
                                opacity={node.isSelected ? 0.9 : 0.7}
                                on:click={() => handleDistrictClick(node.district)}
                                class="district-circle"
                                use:tooltipAction={tooltipContent(node.district.properties)}
                            ></circle>
                        {/if}
                    {/each}
                    
                    <!-- Then render primary circle with highlight effect -->
                    {#each nodes as node}
                        {#if !isNaN(node.x) && !isNaN(node.y) && node.r > 0 && node.isPrimary}
                            <!-- Background highlight circle -->
                            <circle
                                cx={node.x}
                                cy={node.y}
                                r={node.r + 6}
                                fill="none"
                                stroke={colors.colorDarkGray}
                                stroke-width={6}
                                stroke-opacity={0.5}
                            />
                            <!-- Primary circle -->
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <circle
                                cx={node.x}
                                cy={node.y}
                                r={node.r}
                                fill={colorScale(node.district.properties.quartile)}
                                stroke={colors.colorWhite}
                                stroke-width={2}
                                on:click={() => handleDistrictClick(node.district)}
                                class="district-circle selected"
                                use:tooltipAction={tooltipContent(node.district.properties)}
                            ></circle>
                        {/if}
                    {/each}

                    <!-- Selected district label -->
                    {#if selectedLabelPosition && $primaryDistrictId}
                        <g in:fade={{ duration: 300 }}>
                            <!-- White text stroke for better readability -->
                            <text 
                                x={selectedLabelPosition.x}
                                y={selectedLabelPosition.y - 15}
                                text-anchor="middle"
                                dominant-baseline="middle"
                                fill="white"
                                stroke="white"
                                stroke-width="5"
                                stroke-linejoin="round"
                                font-size="14px"
                                font-weight="400"
                            >
                                {selectedDistrictData?.properties["Institution Name"]}
                            </text>
                            <!-- Label text -->
                            <text 
                                x={selectedLabelPosition.x}
                                y={selectedLabelPosition.y - 15}
                                text-anchor="middle"
                                dominant-baseline="middle"
                                fill="black"
                                font-size="14px"
                                font-weight="400"
                            >
                                {selectedDistrictData?.properties["Institution Name"]}
                            </text>
                        </g>
                    {/if}

                    <!-- Major cities markers -->
                    {#if showLabels}
                        {#each majorCities as city}
                            {#if projection}
                                {@const [x, y] = projection([city.lon, city.lat])}
                                <g class="city-marker" in:fade={{ duration: 300 }}>
                                    <!-- City dot -->
                                    <circle 
                                        cx={x} 
                                        cy={y} 
                                        r="3" 
                                        fill={colors.colorWhite}
                                        stroke={colors.colorDarkGray}
                                        stroke-width="1"
                                    />
                                    <!-- City label with background -->
                                    <rect 
                                        x={x + 5} 
                                        y={y - 10} 
                                        width={city.name.length * 6 + 10} 
                                        height="16" 
                                        rx="4" 
                                        fill="white" 
                                        opacity="0.8"
                                    />
                                    <text 
                                        x={x + 10} 
                                        y={y} 
                                        font-size="11px" 
                                        fill={colors.colorDarkGray}
                                        font-style="italic"
                                    >
                                        {city.name}
                                    </text>
                                </g>
                            {/if}
                        {/each}
                    {/if}
                </g>
            </g>
        </svg>
    {:else}
        <div class="loading">
            <p>Loading map...</p>
        </div>
    {/if}
</div>

<style>
    #map {
        width: var(--map-width, 100%);
        height: var(--map-height, 100%);
        position: relative;
    }
  
    svg {
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
  
    .districtShape {
        vector-effect: non-scaling-stroke;
    }

    .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        color: var(--colorDarkGray);
    }

    .map-controls {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 10;
        background: rgba(255,255,255,0.8);
        border-radius: 4px;
        padding: 5px;
    }

    .control-btn {
        background: var(--colorText);
        color: white;
        border: none;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        cursor: pointer;
    }

    .control-btn:hover {
        background: var(--colorDarkGray);
    }

    .district-circle {
        cursor: pointer;
        transition: opacity 0.2s;
    }

    .district-circle:hover {
        opacity: 1;
    }
    
    .district-circle.selected {
        opacity: 1;
    }

    .city-marker {
        pointer-events: none;
    }
    
    /* Tooltip styles matching DistrictsBeeswarm */
    :global(.tippy-box) {
        background-color: white;
        color: black;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        font-size: 14px;
        padding: 8px;
    }

    :global(.tippy-arrow) {
        color: white;
    }

    :global(.tooltip-link) {
        color: #0066cc;
        text-decoration: none;
    }

    :global(.tooltip-link:hover) {
        text-decoration: underline;
    }
</style>
```

# src/lib/components/BubbleSwarm.svelte

```svelte
<script>
    import { tweened } from 'svelte/motion'
    import { fade } from 'svelte/transition'
    import { scaleLinear, scaleSqrt, scaleOrdinal } from 'd3-scale'
    import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force'
    import { extent } from 'd3-array'
    import { interpolateRgb } from 'd3-interpolate'
    import tippyJs from 'tippy.js'
    import 'tippy.js/dist/tippy.css'
    import { colors } from '$lib/styles/colorConfig'
  
    export let data
    export let dimensions
    export let selectedDistricts
    export let highlightedDistricts
    export let index
    export let quartileRanges
  
    let fadeDuration = 300
  
    $: xScale = scaleLinear()
      .domain(extent(data, d => d.properties.weighted_inclusion))
      .range([0, dimensions.width - dimensions.margin.right - dimensions.margin.left])
  
    $: rScale = scaleSqrt()
      .domain(extent(data, d => d.properties['Total Student Count']))
      .range(dimensions.width < 768 ? [2, 20] : [3, 50])
  
    let colorScale = scaleOrdinal()
      .domain([1, 2, 3, 4])
      .range([colors.colorSeparate, colors.colorNonInclusive, colors.colorSemiInclusive, colors.colorInclusive])
  
    let bubblePadding = 2
    let useScaledRadius = false
    $: defaultRadius = dimensions.width <= 768 ? 5 : 10
  
    let simulation = forceSimulation(data)
  
    $: {
      simulation
        .force('x', forceX().x(d => xScale(d.properties.weighted_inclusion)).strength(1.5))
        .force('y', forceY().y(dimensions.height / 2).strength(0.1))
        .force('collide', forceCollide().radius(d => useScaledRadius ? rScale(d.properties['Total Student Count']) + bubblePadding : defaultRadius + bubblePadding).strength(0.8))
        .alpha(0.5)
        .alphaMin(0.01)
        .alphaDecay(0.05)
        .velocityDecay(0.4)
        .restart()
    }
  
    let nodes = []
    simulation.on('tick', () => {
      nodes = simulation.nodes()
    })
  
    function tooltipContent(nodeData) {
      return `
        <span style="font-family:'Source Sans 3', sans-serif;"><strong>${nodeData["Institution Name"]}</strong><br>
        Inclusion score: <strong>${nodeData.quartile}</strong> out of 4 ${nodeData["Total Student Count"] < 500 ? '<strong>*</strong>' : ''}<br>
        <strong>${nodeData["Total Student Count"]}</strong> students with IEPs<br>
        <a class="tooltip-link" href="/${nodeData.GEOID}"><strong>More info >></strong></a></span>
      `
    }
  
    function tippy(element, nodeContent) {
      let tooltipInstance = null
  
      function initialize() {
        tooltipInstance = tippyJs(element, {
          content: nodeContent,
          allowHTML: true,
          interactive: true,
          appendTo: document.body,
        })
      }
  
      function destroy() {
        if (tooltipInstance) {
          tooltipInstance.destroy()
          tooltipInstance = null
        }
      }
  
      initialize()
  
      return {
        update(newContent) {
          if (index > 2) {
            if (tooltipInstance) {
              tooltipInstance.setContent(newContent)
            } else {
              initialize()
            }
          } else {
            destroy()
          }
        },
        destroy() {
          destroy()
        },
      }
    }
  
    let tweenedOpacity = tweened(0, { duration: fadeDuration })
    $: tweenedOpacity.set(index > 0 ? 0.85 : 0)
  
    let tweenedRadii = tweened(new Array(data.length).fill(defaultRadius), { duration: fadeDuration })
    $: {
      if (index >= 3) {
        useScaledRadius = true
        tweenedRadii.set(data.map(d => rScale(d.properties['Total Student Count'])))
      } else {
        useScaledRadius = false
        tweenedRadii.set(data.map(d => 
          selectedDistricts && selectedDistricts.includes(d.properties.GEOID) ? 16 : defaultRadius
        ))
      }
    }
  
    function interpolateColor(a, b) {
      const interpolate = interpolateRgb(a, b)
      return t => interpolate(t)
    }
  
    let tweenedColors = tweened(
      data.map(() => colors.colorLightGray),
      {
        duration: fadeDuration,
        interpolate: (a, b) => {
          return t => a.map((color, i) => interpolateColor(color, b[i])(t))
        }
      }
    )
    $: {
      tweenedColors.set(
        data.map(d => {
          if (index === 0) {
            return colorScale(d.properties.quartile)
          } else {
            return highlightedDistricts.includes(d.properties.GEOID)
              ? colorScale(d.properties.quartile)
              : colors.colorLightGray
          }
        })
      )
    }
  
    $: legendWidth = rScale(6000) + 140
    $: legendHeight = rScale(6000) + 1
  </script>
  
  <g>
    {#each nodes as node, i}
      <circle
        cx={node.x}
        cy={node.y}
        r={$tweenedRadii[i]}
        fill={$tweenedColors[i]}
        stroke={selectedDistricts && selectedDistricts.includes(node.properties.GEOID) ? colors.colorText : 'none'}
        stroke-width={selectedDistricts && selectedDistricts.includes(node.properties.GEOID) ? 2 : 0}
        use:tippy={tooltipContent(node.properties)}
      />
    {/each}
  
    {#if index === 1}
      <g transition:fade="{{ duration: fadeDuration }}">
        {#each quartileRanges as range, i}
          <rect 
            x={xScale(range.min)}
            y={-dimensions.margin.top}
            width={xScale(range.max) - xScale(range.min)}
            height={dimensions.height}
            fill={colorScale(range.quartile)}
            fill-opacity="0.5"
          />
          <text 
            x={xScale((range.min + range.max) / 2)}
            y={dimensions.margin.top + dimensions.height - 30}
            text-anchor="middle"
            fill={colors.colorBackgroundWhite}
            style="font-size: 4rem; font-weight:600;"
            opacity="0.6"
          >
            {i + 1}
          </text>
        {/each}
      </g>
    {/if}
  
    {#if index > 0}
      <g class="chart-labels" transition:fade="{{ duration: fadeDuration }}">
        <text 
          x={0}
          y={60} 
          text-anchor="start"
          font-size="14px"
          font-weight="600"
          fill={colors.colorText}
        >
          &#8592; Less inclusive
        </text>
        <text 
          x={dimensions.width - dimensions.margin.right - dimensions.margin.left}
          y={60} 
          text-anchor="end"
          font-size="14px"
          font-weight="600"
          fill={colors.colorText}
        >
          More inclusive &#8594;
        </text>
      </g>
    {/if}
  
    {#if index > 2}
      <g class="legend" transform="translate({dimensions.width - legendWidth}, {dimensions.height - legendHeight})" transition:fade="{{ duration: fadeDuration}}">
        <!-- Legend content here -->
        <circle r={rScale(6000)} fill="none" stroke={colors.colorText} stroke-width="1" />
        <line 
          x1="0" x2={rScale(6000) + 5}
          y1={-rScale(6000)} y2={-rScale(6000)}
          stroke={colors.colorText} 
          stroke-width="1" 
          stroke-dasharray="2,2" 
        />
        <text 
          x={rScale(6000) + 10} 
          y={-rScale(6000)} 
          style="font-size: 12px; fill:{colors.colorText}" 
          dominant-baseline="middle"
        >
          6,000 students
        </text>
        
        <!-- Add similar circles and labels for 3,000 and 1,000 students -->
      </g>
    {/if}
  </g>
```

# src/lib/components/Card.svelte

```svelte
<script>
    import { goto } from '$app/navigation'

    export let linkId
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-missing-attribute -->
<a 
    on:click={() => goto(`/${linkId}`)}
    class="card-link"
    tabindex="0"
    role="button"
>
    <div class="card">
        <header>
            <slot name="header"></slot>
        </header>
        <div class="content">
            <slot name="content"></slot>
        </div>
    </div>
</a>


<style>
    .card-link {
        text-decoration: none;
        color: inherit;
    }
    
    .card {
        flex: 0 0 auto;
        background-color: var(--colorBackgroundWhite);
        cursor: pointer;
        border-radius: 1rem;
        box-shadow: var(--shadow);
        padding: 1.5rem 1rem;
        margin: 1.5rem 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 170px;
        min-height: 210px;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .card:hover {
        transform: scale(1.03);
        box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.18);
    }

    header {
        font-size: 1.1rem;
        font-weight: 700;
        font-family: 'Bitter', serif;
        text-align: center;
        white-space: normal;
        word-wrap: break-word;
        max-width: 100%;
        overflow-wrap: break-word;
        flex-grow: 1;
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;
    }

    .card:hover header {
        opacity: 1;
    }

    .content {
        display: flex;
        align-items: center;
        white-space: normal;
        word-wrap: break-word;
        max-width: 100%;
        overflow-wrap: break-word;
    }
</style>
```

# src/lib/components/CardCarousel.svelte

```svelte
<script>
    import { onMount, afterUpdate } from "svelte"
    import Card from "$lib/components/Card.svelte"
    import InclusionRing from "$lib/components/InclusionRing.svelte"
    import { arrowLeft, arrowRight } from "$lib/utils/arrows.js"

    export let districtData
    export let data

    $: neighborIDs = districtData.neighbors
    $: neighbors = data.filter(d => neighborIDs.includes(d.properties.GEOID))

    let cardsContainer
    let isOverflowing = false

    onMount(checkOverflow)
    afterUpdate(checkOverflow)

    function checkOverflow() {
        if (cardsContainer) {
            isOverflowing = cardsContainer.scrollWidth > cardsContainer.offsetWidth
        }
    }

    function scrollLeft() {
        if (cardsContainer) {
            cardsContainer.scrollBy({ left: -300, behavior: 'smooth' })
        }
    }

    function scrollRight() {
        if (cardsContainer) {
            cardsContainer.scrollBy({ left: 300, behavior: 'smooth' })
        }
    }
</script>

<div class="card-carousel text-width">
    <h3 class="header">Neighboring Districts</h3>
    <div class="cards-container" bind:this={cardsContainer}>
        {#if isOverflowing}
            <div class="arrow arrow-left" on:click={scrollLeft} on:touchend={scrollLeft}>
                {@html arrowLeft}
            </div>
        {/if}
        {#each neighbors as neighbor (neighbor.properties.GEOID)}
            <Card linkId={neighbor.properties.GEOID}>
                <svelte:fragment slot="header">
                    <h4>{neighbor.properties["Institution Name"]}</h4>
                </svelte:fragment>
                <svelte:fragment slot="content">
                    <div class="card-content">
                        <div class="inclusion-ring-container">
                            <InclusionRing 
                                data={neighbor.properties}
                            />
                            {#if neighbor.properties["Total Student Count"] < 500 && neighbor.properties.weighted_inclusion}
                                <span class="uncertainty">*</span>
                            {/if}
                        </div>
                        {#if neighbor.properties["Total Student Count"]}
                            <div class="card-info">
                                <span class="highlight">{neighbor.properties["Total Student Count"]}</span> students with IEPs
                            </div>
                        {:else}
                            <div class="card-info">
                                No data available
                            </div>
                        {/if}
                    </div>
                </svelte:fragment>
            </Card>
        {/each}
        {#if isOverflowing}
            <div class="arrow arrow-right" on:click={scrollRight} on:touchend={scrollRight}>
                {@html arrowRight}
            </div>
        {/if}
    </div>
</div>

<style>
    .card-carousel {
        margin-bottom: 2.5rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        position: relative;
    }

    .cards-container {
        display: flex;
        flex-direction: row;
        overflow-x: auto;
        gap: 1rem;
        max-width: 100%;
        padding: 0 0.5rem;
        white-space: nowrap;
        background-color: var(--colorBackgroundLightGray);
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.08);
        scroll-behavior: smooth;
        scrollbar-width: none;
        -ms-overflow-style: none;
        transition: scrollbar-width 0.3s ease, -ms-overflow-style 0.3s ease;
    }

    .cards-container:hover {
        scrollbar-width: thin;
        -ms-overflow-style: -ms-autohiding-scrollbar;
    }

    .cards-container::-webkit-scrollbar {
        width: 0;
        height: 0;
        background: transparent;
        transition: all 0.3s ease;
    }

    .cards-container:hover::-webkit-scrollbar {
        width: auto;
        height: 8px;
    }

    .cards-container::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    .cards-container::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
    }

    .cards-container::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    .arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: rgba(0, 0, 0, 0.15);
        opacity: 1;
        transition: opacity 0.3s ease;
        padding: 0.5rem;
        cursor: pointer;
        z-index: 1;
    }

    .arrow-left {
        left: 0;
    }

    .arrow-right {
        right: 0;
    }

    .card-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .card-info {
        margin-top: 0.8rem;
    }

    .highlight {
        font-weight: 700;
        font-size: 1rem;
    }

    .inclusion-ring-container {
        display: flex;
        align-items: center;
    }

    .uncertainty {
        margin-left: 4px;
        align-self: flex-start;
        font-size: 1.6rem;
        color: var(--colorDarkGray);
        margin-left: 0.25rem;
    }
</style>
```

# src/lib/components/DistrictsBeeswarm.svelte

```svelte
<script>
  import { tweened } from 'svelte/motion'
  import { fade } from 'svelte/transition'
  import { cubicOut } from 'svelte/easing'
  import { data, selectedDistricts, selectedDistrictsData, stateData, primaryDistrictId } from '$lib/stores/stores.js'
  import { scaleLinear, scaleSqrt, scaleOrdinal } from 'd3-scale'
  import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force'
  import { extent } from 'd3-array'
  import { interpolateRgb } from 'd3-interpolate'
  import tippy from 'tippy.js'
  import 'tippy.js/dist/tippy.css'
  import { colors } from '$lib/styles/colorConfig'
  import SVGChart from '$lib/components/SVGChart.svelte'

  export let index = 0
  let fadeDuration = 300

  // Filter out data rows with no "weighted_inclusion" value
  $: filteredData = $data ? $data.filter(d => d.properties.weighted_inclusion !== null && d.properties.weighted_inclusion !== undefined) : []
  
  // Chart dimensions & initial values
  let width = 800
  let height = 500
  $: dimensions = { 
    width: width || 800, 
    height: height || 400, 
    margin: (width && width <= 768) ? { top: 0, right: 20, bottom: 40, left: 20 } : { top: 0, right: 30, bottom: 40, left: 30 },
  }

  $: innerWidth = (dimensions.width || 800) - (dimensions.margin?.right || 30) - (dimensions.margin?.left || 30)
  $: innerHeight = (dimensions.height || 400) - (dimensions.margin?.top || 0) - (dimensions.margin?.bottom || 20)

  $: xScale = filteredData.length > 0 && innerWidth > 0 ? scaleLinear()
    .domain(extent(filteredData, d => d.properties.weighted_inclusion))
    .range([0, innerWidth]) : scaleLinear().domain([0, 1]).range([0, 100])

  $: separationTimeScale = filteredData.length > 0 && innerWidth > 0 ? scaleLinear()
    .domain(extent(filteredData, d => d.properties.average_separation_time).reverse())
    .range([0, innerWidth])
    .nice() : scaleLinear().domain([100, 0]).range([0, 100])

  $: rScale = filteredData.length > 0 ? scaleSqrt()
    .domain(extent(filteredData, d => d.properties['Total Student Count']))
    .range((width && width < 768) ? [2, 20] : [3, 50]) : scaleSqrt().domain([0, 1000]).range([3, 50])

  let colorScale = scaleOrdinal()
    .domain([1, 2, 3, 4])
    .range([colors.colorSeparate, colors.colorNonInclusive, colors.colorSemiInclusive, colors.colorInclusive])

  // Force simulation - only run once when data/dimensions change, NOT when index changes
  let bubblePadding = 2
  let simulation
  let nodes = []
  let simulationInitialized = false

  // Create tweened stores for animated values (only colors and opacities now)
  const tweenedColors = tweened([], {
    duration: fadeDuration,
    interpolate: (a, b) => {
      return t => a.map((color, i) => {
        if (!b[i]) return color
        return interpolateRgb(color, b[i])(t)
      })
    }
  })

  const tweenedOpacities = tweened([], {
    duration: fadeDuration,
    easing: cubicOut
  })

  // SEPARATE: Simulation initialization (only runs when data/scales change, NOT index)
  $: {
    if (filteredData.length > 0 && width && height && xScale && rScale && !simulationInitialized) {
      initializeSimulation()
    }
  }

  function initializeSimulation() {
    // Create a copy of the data for the simulation
    const simData = filteredData.map(d => ({ ...d }))
    
    // Create the simulation with scaled collision detection from the start
    simulation = forceSimulation(simData)
      .force('x', 
        forceX(d => xScale(d.properties.weighted_inclusion))
          .strength(1.5)
      )
      .force('y', 
        forceY(height / 2)
          .strength(0.1)
      )
      .force('collide', 
        forceCollide(d => rScale(d.properties['Total Student Count']) + bubblePadding).strength(0.8)
      )
      .alpha(0.5)
      .alphaMin(0.01)
      .alphaDecay(0.05)
      .velocityDecay(0.4)
      .stop()
    
    // Run manual ticks for immediate positioning
    for (let i = 0; i < 120; ++i) {
      simulation.tick()
    }
    
    // Get the positioned nodes
    nodes = simulation.nodes()
    
    // Initialize tweened values
    initializeTweenedValues()
    
    // Set up ongoing tick handler
    simulation.on('tick', () => {
      nodes = [...simulation.nodes()]
    })
    
    // Mark as initialized and restart
    simulationInitialized = true
    simulation.restart()
  }

  // SEPARATE: Visual updates when index, selection, or highlighted districts change
  $: if (nodes.length > 0 && simulationInitialized && highlightedDistricts && index !== undefined) {
    updateColors()
  }

  $: if (nodes.length > 0 && simulationInitialized && $selectedDistricts) {
    updateOpacities()
  }

  function updateColors() {
    const newColors = nodes.map(node => {
      if (index === 0) {
        return colorScale(node.properties.quartile)
      } else {
        return highlightedDistricts.includes(node.properties.GEOID)
          ? colorScale(node.properties.quartile)
          : colors.colorLightGray
      }
    })
    tweenedColors.set(newColors)
  }

  function updateOpacities() {
    const newOpacities = nodes.map(node => {
      if ($selectedDistricts && $selectedDistricts.includes(node.properties.GEOID)) {
        return 1
      }
      return 0.9
    })
    tweenedOpacities.set(newOpacities)
  }

  // Function to initialize tweened values
  function initializeTweenedValues() {
    const initialColors = nodes.map(node => {
      return colorScale(node.properties.quartile) // Start with all districts colored
    })
    
    const initialOpacities = nodes.map(() => 0.9)
    
    tweenedColors.set(initialColors, { duration: 0 })
    tweenedOpacities.set(initialOpacities, { duration: 0 })
  }

  // Reset simulation when key parameters change (but not index)
  $: {
    if (simulationInitialized && (width || height)) {
      simulationInitialized = false
    }
  }

  // Create derived store only when dependencies are available
  $: visibleLabels = (() => {
    if (!$selectedDistricts || !$selectedDistrictsData || !nodes || nodes.length === 0) {
      return []
    }
    
    if (index < 7) {
      return nodes.filter(node => highlightedDistricts.includes(node.properties.GEOID))
    } else if ($selectedDistricts && $selectedDistricts.length > 0) {
      return nodes.filter(node => $selectedDistricts.includes(node.properties.GEOID))
    }
    return []
  })()

  $: legendWidth = filteredData.length > 0 ? rScale(6000) + 140 : 140
  $: legendHeight = filteredData.length > 0 ? rScale(6000) + 1 : 1

  // Get selected district's x position
  let selectedDistrictX = 0
  $: {
    if ($selectedDistricts && $selectedDistricts.length > 0 && nodes.length > 0 && dimensions.margin) {
      const selectedGEOID = $selectedDistricts[0]
      
      const selectedNode = nodes.find(node => {
        return node.properties.GEOID === selectedGEOID
      })
      
      if (selectedNode && selectedNode.x && !isNaN(selectedNode.x)) {
        selectedDistrictX = selectedNode.x + (dimensions.margin.left || 0)
      } else {
        selectedDistrictX = 0
      }
    } else {
      selectedDistrictX = 0
    }
  }

  // Improved tooltip implementation
  function tooltipContent(nodeData) {
    return `
      <span style="font-family:'Source Sans 3', sans-serif;"><strong>${nodeData["Institution Name"]}</strong><br>
      Inclusion score: <strong>${nodeData.quartile}</strong> out of 4 ${nodeData["Total Student Count"] < 500 ? '<strong>*</strong>' : ''}<br>
      <strong>${nodeData["Total Student Count"]}</strong> students with IEPs<br>
      <a class="tooltip-link" href="/${nodeData.GEOID}"><strong>Learn more ></strong></a></span>
    `
  }

  function tooltipAction(element, nodeContent) {
    const tooltip = tippy(element, {
      content: nodeContent,
      allowHTML: true,
      interactive: true,
      appendTo: document.body,
      animation: 'fade',
      delay: [100, 0],
      placement: 'top',
      theme: 'custom'
    })

    return {
      update(newContent) {
        tooltip.setContent(newContent)
      },
      destroy() {
        tooltip.destroy()
      }
    }
  }

  let largestDistricts = []
  $: if ($stateData && $stateData.length > 0) {
    largestDistricts = $stateData[0].properties.largestDistricts || []
  }

  let neighborDistrictIds = []
  $: {
    if ($selectedDistricts && $selectedDistricts.length > 0 && $selectedDistrictsData && $selectedDistrictsData.length > 0) {
        neighborDistrictIds = $selectedDistrictsData[0].properties.neighbors || []
    } else {
        neighborDistrictIds = []
    }
  }

  let highPerformingLargeDistricts = []
  $: {
    if (filteredData.length > 0) {
      highPerformingLargeDistricts = filteredData
        .filter(district => 
          district.properties['Total Student Count'] >= 500 && 
          district.properties.quartile === 4
        )
        .map(district => district.properties.GEOID)
    }
  }

  let lowPerformingLargeDistricts = []
  $: {
    if (filteredData.length > 0) {
      lowPerformingLargeDistricts = filteredData
        .filter(district => 
          district.properties['Total Student Count'] >= 500 && 
          district.properties.quartile === 1
        )
        .map(district => district.properties.GEOID)
    }
  }

  let highlightedDistricts = []
  $: {
      if ($selectedDistricts && $selectedDistricts.length > 0) {
          if (index < 3) {
              highlightedDistricts = [$primaryDistrictId]
          } else if (index === 3) {
              highlightedDistricts = [$primaryDistrictId, ...largestDistricts]
          } else if (index === 4) {
              highlightedDistricts = [$primaryDistrictId, ...neighborDistrictIds]
          } else if (index === 5) {
              highlightedDistricts = [...highPerformingLargeDistricts]
          } else if (index === 6) {
              highlightedDistricts = [...lowPerformingLargeDistricts]
          } else {
              highlightedDistricts = filteredData.map(d => d.properties.GEOID)
          }
      } else {
          highlightedDistricts = index < 7 ? [] : filteredData.map(d => d.properties.GEOID)
      }
  }

  // Format function for separation time axis
  const formatSeparationTime = (value) => `${Math.round(value)}%`

  // Set dimensions context for Axis component
  $: dimensionsWithInner = {
    ...dimensions,
    innerWidth,
    innerHeight
  }
</script>

<div class="districts-beeswarm" bind:clientWidth={width} bind:clientHeight={height}>
    <SVGChart dimensions={dimensions}>
      {#each nodes as node, i}
          {#if !($selectedDistricts && $selectedDistricts.includes(node.properties.GEOID))}
              <circle
                  cx={node.x}
                  cy={node.y}
                  r={rScale(node.properties['Total Student Count'])}
                  fill={$tweenedColors[i] || colors.colorLightGray}
                  opacity={$tweenedOpacities[i] || 0.9}
                  use:tooltipAction={tooltipContent(node.properties)}
                  style="cursor: pointer; transition: stroke-width 0.3s ease;"
              />
          {/if}
      {/each}
      
      {#each nodes as node, i}
          {#if $selectedDistricts && $selectedDistricts.includes(node.properties.GEOID)}
              <circle
                  cx={node.x}
                  cy={node.y}
                  r={rScale(node.properties['Total Student Count']) + 3}
                  fill="none"
                  stroke={colors.colorDarkGray}
                  stroke-width={2}
                  stroke-opacity={0.3}
                  style="transition: all 0.3s ease;"
              />
              <circle
                  cx={node.x}
                  cy={node.y}
                  r={rScale(node.properties['Total Student Count'])}
                  fill={$tweenedColors[i] || colors.colorLightGray}
                  opacity={$tweenedOpacities[i] || 1}
                  stroke={colors.colorWhite}
                  stroke-width={1}
                  use:tooltipAction={tooltipContent(node.properties)}
                  style="cursor: pointer; transition: all 0.3s ease;"
              />
          {/if}
      {/each}

        {#each visibleLabels as node}
            <text
              x={node.x}
              y={node.y}
              dy=".3em"
              text-anchor="middle"
              fill="white"
              stroke="white"
              stroke-width="5"
              style="font-size: 14px; font-weight:400;"
              transition:fade={{duration: fadeDuration}}
            >
              {node.properties["Institution Name"]}
            </text>
            <text
              x={node.x}
              y={node.y}
              dy=".3em"
              text-anchor="middle"
              fill="black"
              style="font-size: 14px; font-weight:400;"
              transition:fade={{duration: fadeDuration}}
            >
              {node.properties["Institution Name"]}
            </text>
        {/each}

        {#if index > 1 && filteredData.length > 0}
          <g class="separation-axis" transition:fade={{duration: fadeDuration}}>
            <!-- Axis line -->
            <line 
              x1={0}
              y1={innerHeight}
              x2={innerWidth}
              y2={innerHeight}
              stroke={colors.colorLightGray}
              stroke-width="1"
            />
            
            <!-- Ticks and labels -->
            {#each separationTimeScale.ticks(5) as tick}
              <g transform="translate({separationTimeScale(tick)}, {innerHeight})">
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
                  {formatSeparationTime(tick)}
                </text>
              </g>
            {/each}

            <!-- Axis label -->
            <text
              x={dimensions.margin.left - 30}
              y={innerHeight + 16}
              text-anchor="start"
              fill={colors.colorText}
              font-size="14px"
              font-weight="600"
            >
              average % of
            </text>
            <text
              x={dimensions.margin.left - 30}
              y={innerHeight + 32}
              text-anchor="start"
              fill={colors.colorText}
              font-size="14px"
              font-weight="600"
            >
              day separated
            </text>
          </g>
        {/if}
  
        <g class="chart-labels" transition:fade="{{ duration: fadeDuration }}">
          <text 
            x={50}
            y={60} 
            text-anchor="start"
            font-size="14px"
            font-weight="600"
            fill={colors.colorText}
          >
            &#8592; Less inclusive
          </text>
          <text 
            x={Math.max(50, innerWidth - 50)}
            y={60} 
            text-anchor="end"
            font-size="14px"
            font-weight="600"
            fill={colors.colorText}
          >
            More inclusive &#8594;
          </text>
        </g>
  
        <!-- Circle size legend -->
        {#if rScale && innerWidth > 0 && innerHeight > 0}
          <g class="legend" transform="translate({Math.max(0, innerWidth - legendWidth)}, {Math.max(0, innerHeight - legendHeight - 40)})" transition:fade="{{ duration: fadeDuration}}">
            <circle r={rScale(6000)} fill="none" stroke={colors.colorText} stroke-width="1" />
            <line 
              x1="0" x2={rScale(6000) + 5}
              y1={-rScale(6000)} y2={-rScale(6000)}
              stroke={colors.colorText} 
              stroke-width="1" 
              stroke-dasharray="2,2" 
            />
            <text 
              x={rScale(6000) + 10} 
              y={-rScale(6000)} 
              style="font-size: 12px; fill:{colors.colorText}" 
              dominant-baseline="middle"
            >
              6,000
            </text>
          
            <circle r={rScale(3000)} cy={rScale(6000) - rScale(3000)} fill="none" stroke={colors.colorText} stroke-width="1" />
            <line 
              x1="0" x2={rScale(6000) + 5}
              y1={rScale(6000) - (rScale(3000) * 2)} y2={rScale(6000) - (rScale(3000) * 2)}
              stroke={colors.colorText} 
              stroke-width="1" 
              stroke-dasharray="2,2" 
            />
            <text 
              x={rScale(6000) + 10} 
              y={rScale(6000) - (rScale(3000) * 2)} 
              style="font-size: 12px; fill:{colors.colorText}" 
              dominant-baseline="middle"
            >
              3,000
            </text>
          
            <circle r={rScale(1000)} cy={rScale(6000) - rScale(1000)} fill="none" stroke={colors.colorText} stroke-width="1" />
            <line 
              x1="0" x2={rScale(6000) + 5}
              y1={rScale(6000) - (rScale(1000) * 2)} y2={rScale(6000) - (rScale(1000) * 2)}
              stroke={colors.colorText} 
              stroke-width="1" 
              stroke-dasharray="2,2" 
            />
            <text 
              x={rScale(6000) + 10} 
              y={rScale(6000) - (rScale(1000) * 2)} 
              style="font-size: 12px; fill:{colors.colorText}" 
              dominant-baseline="middle"
            >
              1,000
            </text>
            <text 
              x={rScale(6000) + 10} 
              y={rScale(6000) - (rScale(1000) * 2) + 15} 
              style="font-size: 12px; fill:{colors.colorText}" 
              dominant-baseline="middle"
            >
              students with IEPs
            </text>
          </g>
        {/if}
    </SVGChart>
</div>

<style>
    .districts-beeswarm {
      height: 500px;
      width: 90%;
      margin: 0 auto;
    }

    @media (max-width: 767px) {
      .districts-beeswarm {
        width: 100%;
      }
    }

    text {
      pointer-events: none;
    }

    :global(.tippy-box) {
      background-color: white;
      color: black;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      font-size: 14px;
      padding: 8px;
    }

    :global(.tippy-arrow) {
      color: white;
    }

    :global(.tooltip-link) {
      color: #0066cc;
      text-decoration: none;
    }

    :global(.tooltip-link:hover) {
      text-decoration: underline;
    }
</style>
```

# src/lib/components/Divider.svelte

```svelte
<script>
    import { colors } from "$lib/styles/colorConfig"
  
    export let color = colors.colorText
    export let width = "80%"
    export let iconSize = 24
    export let iconStrokeWidth = 2.5
  </script>
  
  <div 
    class="divider" 
    style="
        --color: {color}; 
        --width: {width}; 
        --icon-size: {iconSize}px; 
        --icon-stroke-width: {iconStrokeWidth};
        opacity: 0.25;
    "
  >
    <hr />
    <div class="icon">
      <slot>
        <!-- Default icon or placeholder can go here if needed -->
      </slot>
    </div>
    <hr />
  </div>
  
  <style>
    .divider {
      padding-top: 1rem;
      display: flex;
      align-items: center;
      width: var(--width);
      margin: auto;
    }
  
    hr {
      flex-grow: 1;
      border: none;
      border-top: 2.5px solid var(--color);
      opacity: 35%;
      margin: 0;
    }
  
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10px;
      color: var(--color);
    }
  
    .icon :global(svg) {
      width: var(--icon-size);
      height: var(--icon-size);
      stroke-width: var(--icon-stroke-width);
    }
  </style>
```

# src/lib/components/DonutChart.svelte

```svelte
<script>
    import { scaleOrdinal, pie, arc } from "d3"
    import { colors } from "$lib/styles/colorConfig"
    import SVGChart from "$lib/components/SVGChart.svelte"

    export let data
    export let innerRadius = 70
    export let outerRadius = 100
    export let width = 200
    export let height = 200
    export let chartColors = []
    export let centerText = ''
    export let centerText2 = ''
    export let centerText3 = ''
    export let centerTextScore = ''
    export let barSpacing = 0.5
    export let indicator = null
    export let indicatorLabel = null

    let dimensions = {
        width: width,
        height: height,
        margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    }

    const padAngle = barSpacing * 0.0174533  // Convert from degrees to radians

    let colorScale, pieFunc, pieData, arcGenerator, indicatorAngle, angle

    $: if (data && data.length > 0) {
        colorScale = scaleOrdinal()
            .domain(data.map(d => d.group))
            .range(chartColors)

        pieFunc = pie()
            .value(d => d.value)
            .sort(null)
            .padAngle(padAngle)

        pieData = pieFunc(data)
        
        arcGenerator = arc().innerRadius(innerRadius).outerRadius(outerRadius)

        // calculate angle if there's an indicator line
        angle = pie().value(d => d.value).sort(null)

        if (indicator !== null) {
            indicatorAngle = angle(indicator)[0].endAngle - (Math.PI / 2)
        }
    }
</script>


<div class="donut-chart">
    <SVGChart {dimensions} originCenter=true>
        {#each pieData as d (d.data.group)}
            <path d={arcGenerator(d)} fill={colorScale(d.data.group)} />
        {/each}

        {#if indicator !== null}
            <line 
                x1={Math.cos(indicatorAngle) * (innerRadius - 5)} 
                y1={Math.sin(indicatorAngle) * (innerRadius - 5)} 
                x2={Math.cos(indicatorAngle) * (outerRadius + 5)}
                    y2={Math.sin(indicatorAngle) * (outerRadius + 5)}
                stroke={colors.colorWhite} 
                stroke-width="5" 
            />
            <line 
                x1={Math.cos(indicatorAngle) * (innerRadius - 5)} 
                y1={Math.sin(indicatorAngle) * (innerRadius - 5)} 
                x2={Math.cos(indicatorAngle) * (outerRadius + 5)}
                    y2={Math.sin(indicatorAngle) * (outerRadius + 5)}
                stroke={colors.colorDarkGray} 
                stroke-width="3" 
            />
            <text
                x=-38
                y=30
                dominant-baseline="start"
                text-anchor="start"
                fill={colors.colorWhite}
                font-size="0.9rem"
                font-weight="600"
                stroke={colors.colorWhite}
                stroke-width="3"
            >
                {indicatorLabel}
            </text>
            <text
                x=-38
                y=30
                dominant-baseline="start"
                text-anchor="start"
                fill={colors.colorText}
                font-size="0.9rem"
                font-weight="600"
            >
                {indicatorLabel}
            </text>
        {/if}

        <text x="0" y={centerText2 ? "-18" : "0"} dominant-baseline="middle" text-anchor="middle" fill={colors.colorText} font-size="2.2rem" font-weight="bold">
            {centerText}
        </text>
        {#if centerText2}
            <text x="0" y="12" dominant-baseline="middle" text-anchor="middle" fill={colors.colorText} font-size="1.2rem">
                {centerText2}
            </text>
        {/if}
        {#if centerText3}
            <text x="0" y="32" dominant-baseline="middle" text-anchor="middle" fill={colors.colorText} font-size="1.2rem">
                {centerText3}
            </text>
        {/if}
        {#if centerTextScore}
            <text x="0" y="2" dominant-baseline="middle" text-anchor="middle" fill={colors.colorText} font-size="1.8rem" font-weight="bold">
                {centerTextScore}
            </text>
        {/if}
    </SVGChart>
</div>


<style>
    /* .donut-chart {
        margin-top: 0.5rem;
        padding-bottom: 1rem;
    } */
</style>
```

# src/lib/components/Explainer.svelte

```svelte
<aside class="text-width">
    <div class="inner-content">

        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            x="0px" 
            y="0px" 
            width="96" 
            height="96" 
            viewBox="0 0 32 32"
            class="comment-icon"
        >
            <path 
                d="M 16 3 C 12.210938 3 8.765625 4.113281 6.21875 5.976563 C 3.667969 7.835938 2 10.507813 2 13.5 C 2 17.128906 4.472656 20.199219 8 22.050781 L 8 29 L 14.746094 23.9375 C 15.15625 23.96875 15.570313 24 16 24 C 19.789063 24 23.234375 22.886719 25.78125 21.027344 C 28.332031 19.164063 30 16.492188 30 13.5 C 30 10.507813 28.332031 7.835938 25.78125 5.976563 C 23.234375 4.113281 19.789063 3 16 3 Z M 16 5 C 19.390625 5 22.445313 6.015625 24.601563 7.589844 C 26.757813 9.164063 28 11.246094 28 13.5 C 28 15.753906 26.757813 17.835938 24.601563 19.410156 C 22.445313 20.984375 19.390625 22 16 22 C 15.507813 22 15.015625 21.972656 14.523438 21.925781 L 14.140625 21.894531 L 10 25 L 10 20.859375 L 9.421875 20.59375 C 6.070313 19.019531 4 16.386719 4 13.5 C 4 11.246094 5.242188 9.164063 7.398438 7.589844 C 9.554688 6.015625 12.609375 5 16 5 Z">
            </path>
        </svg>

        <slot></slot>

    </div>
</aside>


<style>
    aside {
        margin: 0 auto;
    }

    aside .inner-content {
        padding: 1rem;
        display: flex;
        align-items: top;
    }

    aside .inner-content .comment-icon {
        padding-left: 0.25rem;
    }

    .comment-icon {
        padding-right: 0.5rem;
        width: 60px;
        min-width: 30px;
        height: 60px;
        transform: translateY(-18px);
    }

    .inner-content svg {
        color: #fff;
        margin-right: 10px;
    }
</style>
```

# src/lib/components/FeedbackComponent.svelte

```svelte
<script>
    import { fade } from 'svelte/transition';
    import { MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-svelte';
  
    let isOpen = false;
    let feedbackType = null;
    let feedbackText = '';
    let showThankYou = false;
  
    async function handleSubmit() {
      try {
          const formData = new FormData();
          formData.append('form-name', 'site-feedback');
          formData.append('feedback-type', feedbackType);
          formData.append('message', feedbackText);
          formData.append('page', window.location.pathname);
  
          const response = await fetch('/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: new URLSearchParams(formData).toString()
          });
          
          if (response.ok) {
              showThankYou = true;
              setTimeout(() => {
                  showThankYou = false;
                  isOpen = false;
                  feedbackText = '';
                  feedbackType = null;
              }, 2000);
          } else {
              throw new Error('Failed to submit feedback');
          }
      } catch (error) {
          console.error('Error:', error);
      }
    }
  </script>
  
  <!-- Hidden form for Netlify to detect -->
  <form name="site-feedback" data-netlify="true" hidden>
    <input type="text" name="feedback-type" />
    <textarea name="message"></textarea>
    <input type="text" name="page" />
  </form>
  
  <div class="feedback">
    <button
      class="feedback__trigger"
      on:click={() => isOpen = true}
    >
      <MessageSquare class="feedback__trigger-icon" />
      Feedback
    </button>
  
    {#if isOpen}
      <div
        class="feedback__overlay"
        on:click|self={() => isOpen = false}
        transition:fade
      >
        <div 
          class="feedback__modal"
          role="dialog"
          aria-labelledby="feedback-title"
        >
          <div class="feedback__header">
            <h2 
              id="feedback-title"
              class="feedback__title"
            >
              {showThankYou ? "Thank you!" : "Share Your Feedback"}
            </h2>
            <p class="feedback__description">
              {showThankYou
                ? "Your feedback helps make this tool better for everyone."
                : "How was your experience using this tool? Your feedback helps us improve."}
            </p>
          </div>
  
          {#if !showThankYou}
            <div class="feedback__buttons">
              <button
                class="feedback__type-button {feedbackType === 'positive' ? 'feedback__type-button--selected' : ''}"
                on:click={() => feedbackType = 'positive'}
              >
                <ThumbsUp class="feedback__button-icon" />
                Helpful
              </button>
              <button
                class="feedback__type-button {feedbackType === 'negative' ? 'feedback__type-button--selected' : ''}"
                on:click={() => feedbackType = 'negative'}
              >
                <ThumbsDown class="feedback__button-icon" />
                Needs Work
              </button>
            </div>
  
            <textarea
              bind:value={feedbackText}
              placeholder="Tell us more about your experience..."
              class="feedback__textarea"
            ></textarea>
  
            <div class="feedback__actions">
              <button
                class="feedback__action-button feedback__action-button--secondary"
                on:click={() => isOpen = false}
              >
                Cancel
              </button>
              <button
                class="feedback__action-button feedback__action-button--primary"
                on:click={handleSubmit}
                disabled={!feedbackType}
              >
                Submit Feedback
              </button>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
  

  <style>
    .feedback {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      z-index: 50;
    }
  
    .feedback__trigger {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      background-color: var(--colorInclusiveDark);
      color: white;
      border: none;
      border-radius: 9999px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: background-color 0.2s;
    }
  
    .feedback__trigger:hover {
      background-color: var(--colorInclusive);
    }
  
    .feedback__trigger-icon {
      width: 1.25rem;
      height: 1.25rem;
    }
  
    .feedback__overlay {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      z-index: 100;
    }
  
    .feedback__modal {
      background-color: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      width: 100%;
      max-width: 28rem;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }
  
    .feedback__header {
      margin-bottom: 1rem;
    }
  
    .feedback__title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
  
    .feedback__description {
      color: #4b5563;
      font-size: 0.875rem;
    }
  
    .feedback__buttons {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin: 1rem 0;
    }
  
    .feedback__type-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.375rem;
      background-color: white;
      cursor: pointer;
      transition: all 0.2s;
    }
  
    .feedback__type-button:hover:not(.feedback__type-button--selected) {
      background-color: #f9fafb;
    }
  
    .feedback__type-button--selected {
      background-color: var(--colorInclusive);
      color: white;
      border-color: var(--colorInclusive);
    }
  
    .feedback__button-icon {
      width: 1rem;
      height: 1rem;
    }
  
    .feedback__textarea {
      width: 100%;
      min-height: 100px;
      padding: 0.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.375rem;
      resize: vertical;
      font-family: inherit;
    }
  
    .feedback__textarea:focus {
      outline: none;
      border-color: var(--colorInclusive);
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
    }
  
    .feedback__actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      margin-top: 1rem;
    }
  
    .feedback__action-button {
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 0.2s;
    }
  
    .feedback__action-button--secondary {
      background-color: white;
      border: 1px solid #e5e7eb;
    }
  
    .feedback__action-button--secondary:hover {
      background-color: #f9fafb;
    }
  
    .feedback__action-button--primary {
      background-color: var(--colorInclusive);
      color: white;
      border: none;
    }
  
    .feedback__action-button--primary:hover:not([disabled]) {
      background-color: var(--colorInclusiveDark);
    }
  
    .feedback__action-button--primary[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
  
    /* Focus styles for accessibility */
    .feedback__trigger:focus,
    .feedback__type-button:focus,
    .feedback__textarea:focus,
    .feedback__action-button:focus {
      outline: 2px solid var(--colorInclusive);
      outline-offset: 2px;
    }
  
    /* Add some basic responsive adjustments */
    @media (max-width: 640px) {
      .feedback__modal {
        margin: 1rem;
        padding: 1rem;
      }
  
      .feedback__buttons {
        flex-direction: column;
      }
    }
  </style>
```

# src/lib/components/Footer.svelte

```svelte
<script>
  import Logo from "./Logo.svelte";
  import NavLinks from "./NavLinks.svelte";
  import { colors } from "$lib/styles/colorConfig.js";
</script>


<div class="color-bar"></div>
<footer>
  <div class="footer-content">
    <div class="footer-column">
      <div class="logo">
        <Logo color={colors.colorInclusive} textColor={colors.colorText} />
      </div>
    </div>
    <div class="footer-column">
      <NavLinks direction="vertical" colorTheme="dark" />
    </div>
    <div class="footer-column">
      <span class="label">
        created by Brianna Wilson
      </span> 
      <span class="label" id="copyright">
        &copy; 2025 All rights reserved
      </span>
    </div>
  </div>
</footer>


<style>
  footer {
    background-color: var(--colorText);
    color: white;
    padding: 4rem 0;
  }

  .color-bar {
        width: 100%;
        height: 8px;
        background-color: var(--colorInclusive);
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .footer-column {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  footer a {
    font-weight: bold;
    color: white;
  }

  .label {
    font-size: 0.95rem;
    letter-spacing: 0.025rem;
  }

  #email {
    margin-top: 0.4rem;
  }

  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 0 1rem;
    }

    .footer-column {
      width: 100%;
      margin-bottom: 2rem;
    }

    .footer-column:last-child {
      margin-bottom: 0;
    }
  }
</style>
```

# src/lib/components/InclusionLegend.svelte

```svelte
<script>
    import LegendLine from '$lib/components/LegendLine.svelte'

    export let data
    $: lines = data
</script>


<div class="state-data text-width">
    {#each lines as line, i}
        <LegendLine 
            identifier={line.colorIdentifier}
            setting={line.group}
            value={line.value}
            definition={line.definition}
            index={i}
        />
    {/each}
</div>


<style>
    .state-data {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
    }
</style>
```

# src/lib/components/InclusionRing.svelte

```svelte
<script>
    import { minWeightedInclusion, maxWeightedInclusion } from "$lib/stores/stores"
    import DonutChart from "$lib/components/DonutChart.svelte"
    import { colors } from "$lib/styles/colorConfig"
    import { scaleOrdinal } from "d3"

    export let data

    $: donutData = [
        {group: "inclusionScore", value: data.weighted_inclusion - $minWeightedInclusion},
        {group: "remainder", value: $maxWeightedInclusion - data.weighted_inclusion},
    ]

    $: colorScale = scaleOrdinal()
        .domain([1, 2, 3, 4])
        .range([colors.colorSeparate, colors.colorNonInclusive, colors.colorSemiInclusive, colors.colorInclusive])
</script>


<div class="ring">
    <DonutChart 
        data = {donutData}
        innerRadius={17}
        outerRadius={22}
        width={44}
        height={44}
        chartColors={[colorScale(data.quartile), colors.colorBackgroundWhite]}
        centerTextScore={data.quartile ? data.quartile : "-"}
    />
</div>


<style>
    .ring {
        position: relative;
        width: 42px;
        height: 42px;
    }
</style>
```

# src/lib/components/LegendLine.svelte

```svelte
<script>
    import { colors } from "$lib/styles/colorConfig"
    import QuestionBubble from "$lib/components/QuestionBubble.svelte"

    export let setting
    export let value
    export let definition
    export let index
    export let identifier
</script>


<div class="setting">
    <strong 
        class="setting-amount" 
        style:color={colors[identifier]}
    >
        {value != null ? value.toFixed(1) : '-'}%
    </strong>
    {index === 0 ? 'of students with IEPs are in an' : 'are in a'}
    <strong 
        class="setting-name" 
        style:background-color={colors[identifier]} 
        style:color={colors.colorWhite}
    >
        {setting}
    </strong>
    <QuestionBubble definition={definition} />
    setting
</div>


<style>
    .setting {
        margin-top: 0.3rem;
    }

    .setting-amount {
        font-weight: 700;
        font-size: 1.3rem;
        letter-spacing: 0.04rem;
    }

    .setting-name {
        font-weight: 600;
        font-size: 0.9rem;
        text-transform: uppercase;
        padding: 1px 6px;
        letter-spacing: 0.04rem;
    }
</style>
```

# src/lib/components/Logo.svelte

```svelte
<script>
    export let color
    export let textColor
</script>

<div class="logo">
    <a href="/">
        <!-- <svg width="166" height="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 166 100">
            <circle cx="50" cy="50" r="45" fill={color} />
            <text 
                x="51" 
                y="43" 
                font-family="Bitter" 
                font-size="17" 
                font-weight="700"
                fill={textColor} 
                text-anchor="middle"
                letter-spacing="0.04rem"
                alignment-baseline="hanging">
                    inclusion
            </text>
            <text 
                x="92" 
                y="95" 
                font-family="Bitter" 
                font-size="32" 
                font-weight="800"
                fill={color} 
                text-anchor="start" 
                alignment-baseline="alphabetic">
                    Data
            </text>
        </svg> -->
        Disability +<br>Education<br><span class="subtitle">Data</span>
    </a>
</div>

<style>
    .logo {
        height: 60px; /* Adjust this value if needed */
    }

    .logo a {
        text-decoration: none;
        font-weight: 800;
        font-size: 1.8rem;
        line-height: 1.8rem;
        display: inline-block;
        transform: scale(0.7);
        transform-origin: top left;
        color: var(--colorInclusive);
    }

    .logo a .subtitle {
        font-weight: 300;
    }

    svg {
        display: block;
    }
</style>
```

# src/lib/components/NavLinks.svelte

```svelte
<script>
    export let direction = 'horizontal'
    export let colorTheme = 'light'

    $: linkColor = colorTheme === 'light' ? 'var(--colorDarkGray)' : 'var(--colorDarkGray)(--colorWhite)'
</script>

<nav class={direction} style="--linkColor: {linkColor}">
    <a href="/inclusion">Inclusion</a>
    <a href="/funding">Funding</a>
    <a href="/about">About</a>
    <a href="/resources">Resources</a>
    <a href="/contact">Contact</a>
    <a href="/subscribe" class="attention">Stay Updated</a>
</nav>

<style>
    nav {
        display: flex;
        align-items: center;
    }

    .horizontal {
        flex-direction: row;
    }

    .vertical {
        flex-direction: column;
        align-items: flex-start;
    }

    a {
        margin-right: 2.7rem;
        letter-spacing: 0.01rem;
        text-transform: uppercase;
        font-size: 0.9rem;
        text-decoration: none;
        color: var(--linkColor);
        font-weight: bold;
        line-height: 1.2;
        transition: color 0.3s ease;
    }

    .vertical a {
        margin-right: 0;
        margin-bottom: 1rem;
    }

    a:hover {
        color: var(--colorInclusiveGray);
    }

    a:last-child {
        margin-right: 0;
    }

    .attention {
        background-color: var(--colorNonInclusive);
        color: var(--colorWhite);
        padding: 0.45rem 0.9rem;
        border-radius: 90px;
        display: inline-block;
        text-align: center;
        transition: background-color 0.3s ease;
    }

    .attention:hover {
        background-color: var(--colorInclusiveDark);
        color: var(--colorWhite);
    }
</style>
```

# src/lib/components/QuestionBubble.svelte

```svelte
<script>
    export let definition

    // Hold the currently opened tooltip
    let currentOpenTooltip = null

    function tooltip(node, content) {

        function showTooltip(event) {
            let tooltip = node.nextElementSibling
            tooltip.innerHTML = content

            // Close the currently open tooltip if it exists
            if (currentOpenTooltip && currentOpenTooltip !== tooltip) {
                currentOpenTooltip.style.display = 'none'
            }

            // Update the currently open tooltip
            currentOpenTooltip = tooltip.style.display === 'block' ? null : tooltip

            if (tooltip.style.display === 'block') {
                tooltip.style.display = 'none'
                document.removeEventListener('click', outsideClickListener)
            } else {
                tooltip.style.display = 'block'
                setTimeout(() => {
                    document.addEventListener('click', outsideClickListener)
                }, 0)
            }

            // Prevent this click from being propagated to document
            event.stopPropagation()
        }

        function outsideClickListener() {
            let tooltip = node.nextElementSibling
            tooltip.style.display = 'none'

            // If this tooltip was the current one open, set currentOpenTooltip to null
            if (currentOpenTooltip === tooltip) {
                currentOpenTooltip = null
            }

            document.removeEventListener('click', outsideClickListener)
        }

        node.addEventListener('click', showTooltip)

        return {
            destroy() {
                node.removeEventListener('click', showTooltip)
                document.removeEventListener('click', outsideClickListener)
            }
        }
    }
</script>


<div class="tooltip-container">
    <span class="question-bubble" style="cursor:pointer;" use:tooltip={definition}></span>
    <div class="tooltip">{definition}</div>
</div>


<style>
    .tooltip-container {
        display: inline-flex;
        position: relative;
        padding-right: 4px;
    }

    .question-bubble {
        display: inline-block;
        position: absolute;
        top: -20px;
        left: -3px;
        width: 14px;
        height: 14px;
        background-color: var(--colorBackgroundWhite);
        border-radius: 50%;
        border: 1px solid var(--colorText);
        margin-left: -5px;
        cursor: pointer;
        text-align: center;
        line-height: 13px;
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--colorText);
        transition: background-color 0.3s, color 0.3s;
    }

    .question-bubble:before {
        content: '?';
    }

    .question-bubble:hover {
        background-color: var(--colorText);
        color: white;
    }

    .tooltip {
        display: none;
        padding: 10px;
        color: var(--colorText);
        background-color: white;
        position: absolute;
        top: -6px;
        right: 10px;
        z-index: 1;
        border-radius: 4px;
        min-width: 200px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    }
</style>
```

# src/lib/components/ScatterplotIdentificationSize.svelte

```svelte
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
        d.properties["Students with Disabilities"] &&
        d.properties.GEOID !== '999999'
    )

    // Create scales
    $: xScale = scaleLinear()
        .domain([0, extent(filteredData, d => d.properties['Total Student Count'])[1]])
        .range([0, dimensions.innerWidth])
        .nice()

    $: yScale = scaleLinear()
        .domain(extent(filteredData, d => d.properties["Students with Disabilities"]))
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
                % Students with IEPs
            </text>
        </g>

        <!-- Plot points -->
        {#each filteredData as district}
            <circle
                cx={xScale(district.properties['Total Student Count'])}
                cy={yScale(district.properties["Students with Disabilities"])}
                r={rScale(district.properties['Total Student Count'])}
                fill={colorScale(district.properties.quartile)}
                opacity="0.8"
                stroke={colors.colorBackgroundWhite}
                stroke-width="1"
            >
                <title>
                    {district.properties['Institution Name']}
                    Students with IEPs: {formatNumber(district.properties['Total Student Count'])}
                    Percent Students with IEPs: {district.properties["Students with Disabilities"]}
                    Quartile: {district.properties.quartile} of 4
                </title>
            </circle>
        {/each}

        <!-- Add horizontal line at 11% -->
        <line
            x1={0}
            y1={yScale(11)}
            x2={dimensions.innerWidth}
            y2={yScale(11)}
            stroke={colors.colorInclusive}
            stroke-width="1"
            stroke-dasharray="4"
        />
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
```

# src/lib/components/ScatterplotInclSize.svelte

```svelte
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
```

# src/lib/components/SchoolProficiencyBySize.svelte

```svelte
<script>
    import { scaleLinear } from 'd3-scale'
    import { extent } from 'd3-array'
    import { colors } from '$lib/styles/colorConfig'
    import SVGChart from '$lib/components/SVGChart.svelte'
    
    // Import the small schools data
    import smallSchoolsData from '$lib/data/small_schools_expanded.json';

    export let width = 800;
    export let height = 500;

    // State variables
    let showSchoolLines = false;
    let selectedCategories = ['Low', 'Medium', 'High']; // Array to track multiple selected categories
    let selectedPeriod = 'post-covid'; // 'pre-covid' or 'post-covid'
    
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
            period: periods['pre-covid'].years.includes(school["School Year"]) ? 'pre-covid' : 'post-covid'
        };
    });

    // Filter data based on selected period
    $: schoolData = allSchoolData.filter(school => school.period === selectedPeriod);
    
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

    // Calculate dynamic thresholds for equal distribution across categories
    $: periodThresholds = (() => {
        const periodData = allSchoolData.filter(school => school.period === selectedPeriod);
        const totalDisadvValues = periodData.map(school => school.econDisadv + school.disability).sort((a, b) => a - b);
        
        if (totalDisadvValues.length === 0) return { low: 0, high: 100 };
        
        const n = totalDisadvValues.length;
        
        // For equal tertiles, we want as close to n/3 in each group as possible
        // Calculate the exact indices for tertile splits
        const lowIndex = Math.floor(n / 3) - 1; // Index of last item in low group
        const highIndex = Math.floor(2 * n / 3) - 1; // Index of last item in medium group
        
        // The thresholds are the values at these positions
        // We add a small amount to ensure clean breaks
        const lowThreshold = totalDisadvValues[lowIndex] + 0.001;
        const highThreshold = totalDisadvValues[highIndex] + 0.001;
        
        return { low: lowThreshold, high: highThreshold };
    })();

    // Define disadvantage categories with equal distribution
    const getDisadvantageCategory = (totalDisadv, period) => {
        const thresholds = periodThresholds;
        
        if (totalDisadv < thresholds.low) return { category: 'Low', color: '#01b6e1' }; // Blue
        if (totalDisadv < thresholds.high) return { category: 'Medium', color: '#9acd32' }; // Green
        return { category: 'High', color: '#ff9900' }; // Orange
    };

    // Process data
    $: coloredData = schoolData.map(item => {
        const totalDisadv = item.econDisadv + item.disability;
        const { category, color } = getDisadvantageCategory(totalDisadv, item.period);
        return {
            ...item,
            totalDisadv,
            color: color,
            disadvCategory: category
        };
    });

    // Create scales - dynamic based on data
    $: xExtent = extent(coloredData, d => d.students);
    $: yExtent = extent(coloredData, d => d.proficiency);
    
    $: xScale = scaleLinear()
        .domain([Math.max(200, xExtent[0] - 50), xExtent[1] + 50])
        .range([0, dimensions.innerWidth])
        .nice();

    $: yScale = scaleLinear()
        .domain([Math.max(30, yExtent[0] - 5), Math.min(85, yExtent[1] + 5)])
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
        const categories = ['Low', 'Medium', 'High'];
        const categoryColors = {
            'Low': '#01b6e1',
            'Medium': '#9acd32', 
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

    // Legend data - dynamic based on period and actual thresholds
    $: categoricalLegend = (() => {
        const thresholds = periodThresholds;
        return [
            { category: 'Low Disadvantage', range: `<${thresholds.low.toFixed(1)}%`, color: '#01b6e1' },
            { category: 'Medium Disadvantage', range: `${thresholds.low.toFixed(1)}%-${(thresholds.high - 0.001).toFixed(1)}%`, color: '#9acd32' },
            { category: 'High Disadvantage', range: `≥${thresholds.high.toFixed(1)}%`, color: '#ff9900' }
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
        
        <!-- Period selector -->
        <div class="period-selector">
            <label for="period-select" class="period-label">Data Period:</label>
            <select id="period-select" bind:value={selectedPeriod} class="period-dropdown">
                <option value="post-covid">{periods['post-covid'].label}</option>
                <option value="pre-covid">{periods['pre-covid'].label}</option>
            </select>
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
                                {trendline.category} Disadvantage
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
                        <span class="tooltip-label">Total Disadvantaged:</span>
                        <span class="tooltip-value">{tooltipData.totalDisadv.toFixed(1)}% ({tooltipData.disadvCategory})</span>
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

    .period-selector {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.75rem;
    }

    .period-label {
        font-weight: 600;
        color: var(--colorText);
    }

    .period-dropdown {
        padding: 0.5rem 1rem;
        border: 2px solid var(--colorLightGray);
        border-radius: 6px;
        background: white;
        font-size: 0.9rem;
        cursor: pointer;
        transition: border-color 0.2s ease;
    }

    .period-dropdown:focus {
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
        .period-selector {
            flex-direction: column;
            gap: 0.5rem;
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
```

# src/lib/components/SchoolProficiencyTrends.svelte

```svelte
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
```

# src/lib/components/SchoolSizeExpenditureChart.svelte

```svelte
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
    export let selectedYear = "2022-2023"; // Default to newest year (excluding 2023-2024)

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
```

# src/lib/components/Scroller.svelte

```svelte
<!-- Adapted from https://github.com/sveltejs/svelte-scroller -->

<script context="module">
	const handlers = [];
	let manager;

	if (typeof window !== 'undefined') {
		const run_all = () => handlers.forEach(fn => fn());

		window.addEventListener('scroll', run_all);
		window.addEventListener('resize', run_all);
	}

	if (typeof IntersectionObserver !== 'undefined') {
		const map = new Map();

		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				const update = map.get(entry.target);
				const index = handlers.indexOf(update);

				if (entry.isIntersecting) {
					if (index === -1) handlers.push(update);
				} else {
					update();
					if (index !== -1) handlers.splice(index, 1);
				}
			});
		}, {
			rootMargin: '400px 0px' // TODO why 400?
		});

		manager = {
			add: ({ outer, update }) => {
				const { top, bottom } = outer.getBoundingClientRect();

				if (top < window.innerHeight && bottom > 0) handlers.push(update);

				map.set(outer, update);
				observer.observe(outer);
			},

			remove: ({ outer, update }) => {
				const index = handlers.indexOf(update);
				if (index !== -1) handlers.splice(index, 1);

				map.delete(outer);
				observer.unobserve(outer);
			}
		};
	} else {
		manager = {
			add: ({ update }) => {
				handlers.push(update);
			},

			remove: ({ update }) => {
				const index = handlers.indexOf(update);
				if (index !== -1) handlers.splice(index, 1);
			}
		};
	}
</script>

<script>
	import { onMount } from 'svelte';

	// config
	export let top = 0;
	export let bottom = 1;
	export let threshold = 0.5;
	export let query = 'section';
	export let parallax = false;
	export let showHelpers = false; // New prop to toggle debug helpers

	// bindings
	export let index = 0;
	export let count = 0;
	export let offset = 0;
	export let progress = 0;
	export let visible = false;

	let outer;
	let foreground;
	let background;
	let left;
	let sections;
	let wh = 0;
	let fixed;
	let offset_top = 0;
	let width = 1;
	let height;
	let inverted;

	$: top_px = Math.round(top * wh);
	$: bottom_px = Math.round(bottom * wh);
	$: threshold_px = Math.round(threshold * wh);

	$: (top, bottom, threshold, parallax, update());

	$: style = `
		position: ${fixed ? 'fixed' : 'absolute'};
		top: 0;
		transform: translate(0, ${offset_top}px);
		z-index: ${inverted ? 3 : 1};
	`;

	$: widthStyle = fixed ? `width:${width}px;` : '';

	onMount(() => {
		sections = foreground.querySelectorAll(query);
		count = sections.length;

		update();

		const scroller = { outer, update };

		manager.add(scroller);
		return () => manager.remove(scroller);
	});

	function update() {
		if (!foreground) return;

		// re-measure outer container
		const bcr = outer.getBoundingClientRect();
		left = bcr.left;
		width = bcr.right - left;

		// determine fix state
		const fg = foreground.getBoundingClientRect();
		const bg = background.getBoundingClientRect();

		visible = fg.top < wh && fg.bottom > 0;

		const foreground_height = fg.bottom - fg.top;
		const background_height = bg.bottom - bg.top;

		const available_space = bottom_px - top_px;
		progress = (top_px - fg.top) / (foreground_height - available_space);

		if (progress <= 0) {
			offset_top = 0;
			fixed = false;
		} else if (progress >= 1) {
			offset_top = parallax
				? (foreground_height - background_height)
				: (foreground_height - available_space);
			fixed = false;
		} else {
			offset_top = parallax ?
				Math.round(top_px - progress * (background_height - available_space)) :
				top_px;
			fixed = true;
		}

		for (let i = 0; i < sections.length; i++) {
			const section = sections[i];
			const { top } = section.getBoundingClientRect();

			const next = sections[i + 1];
			const bottom = next ? next.getBoundingClientRect().top : fg.bottom;

			offset = (threshold_px - top) / (bottom - top);
			if (bottom >= threshold_px) {
				index = i;
				break;
			}
		}
	}
</script>

<svelte:window bind:innerHeight={wh}/>

<svelte-scroller-outer bind:this={outer}>
	<svelte-scroller-background-container class='background-container' style="{style}{widthStyle}">
		<svelte-scroller-background bind:this={background}>
			<slot name="background"></slot>
		</svelte-scroller-background>
	</svelte-scroller-background-container>

	<svelte-scroller-foreground bind:this={foreground}>
		<slot name="foreground"></slot>
	</svelte-scroller-foreground>

	{#if showHelpers}
		<div class="scroller-helper top-helper" style="top: {top_px}px">
			<span class="helper-label">Top ({top})</span>
		</div>
		<div class="scroller-helper threshold-helper" style="top: {threshold_px}px">
			<span class="helper-label">Threshold ({threshold})</span>
		</div>
		<div class="scroller-helper bottom-helper" style="top: {bottom_px}px">
			<span class="helper-label">Bottom ({bottom})</span>
		</div>
	{/if}
</svelte-scroller-outer>

<style>
	svelte-scroller-outer {
		display: block;
		position: relative;
	}

	svelte-scroller-background {
		display: block;
		position: relative;
		width: 100%;
	}

	svelte-scroller-foreground {
		display: block;
		position: relative;
		pointer-events: none;
		z-index: 2;
	}

	svelte-scroller-foreground::after {
		content: ' ';
		display: block;
		clear: both;
	}

	svelte-scroller-background-container {
		display: block;
		position: absolute;
		width: 100%;
		max-width: 100%;

		/* in theory this helps prevent jumping */
		will-change: transform;
		/* -webkit-transform: translate3d(0, 0, 0);
		-moz-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0); */
	}

	/* Debug helpers */
	.scroller-helper {
		position: fixed;
		left: 0;
		right: 0;
		height: 2px;
		z-index: 1000;
		pointer-events: none;
	}

	.top-helper {
		background-color: rgba(255, 0, 0, 0.5);
	}

	.threshold-helper {
		background-color: rgba(0, 255, 0, 0.5);
	}

	.bottom-helper {
		background-color: rgba(0, 0, 255, 0.5);
	}

	.helper-label {
		position: absolute;
		left: 10px;
		top: -20px;
		background-color: rgba(0, 0, 0, 0.7);
		color: white;
		padding: 2px 8px;
		border-radius: 4px;
		font-size: 12px;
		white-space: nowrap;
	}
</style> 
```

# src/lib/components/ScrollyCard.svelte

```svelte
<script>
    // Props for the card
    export let active = false; // Whether this card is currently active
  </script>
  
  <div class="scrolly-card {active ? 'active' : ''}">
    <slot></slot>
  </div>
  
  <style>
    .scrolly-card {
      display: inline-block;
      padding: 1rem;
      color: var(--colorWhite);
      background-color: var(--colorText);
      background-color: color-mix(in srgb, var(--colorText) 90%, transparent);
      border-radius: 0.25rem;
      font-size: 1.3rem;
      text-align: center;
      box-shadow: var(--shadow);
      max-width: 90%;
      position: relative;
      z-index: 100;     
      pointer-events: auto;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
  
    .scrolly-card.active {
      opacity: 1;
      transform: translateY(0);
    }
  
    .scrolly-card:not(.active) {
      opacity: 0.7;
      transform: translateY(10px);
    }
  
    /* Ensure all content within the card has pointer events */
    .scrolly-card :global(*) {
      pointer-events: auto;
    }
  </style>
```

# src/lib/components/ScrollyProgress.svelte

```svelte
<script>
    export let currentIndex = 0;
    export let totalSteps = 0;
    export let onSkip = () => {}; // Function to call when Skip is clicked
  </script>
  
  <div class="scrolly-progress-container">
    <div class="dots-container">
      {#each Array(totalSteps) as _, i}
        <div 
          class="progress-dot {i === currentIndex ? 'active' : ''} {i < currentIndex ? 'completed' : ''}"
          aria-label="Step {i + 1} of {totalSteps}"
        ></div>
      {/each}
    </div>
    
    <!-- <button class="skip-button" on:click={onSkip}>
      go to data table
    </button> -->
  </div>
  
  <style>
    .scrolly-progress-container {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      z-index: 200;
      pointer-events: auto;
    }
  
    .dots-container {
      display: flex;
      gap: 0.5rem;
    }
  
    .progress-dot {
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 50%;
      background-color: var(--colorLightGray);
      transition: all 0.3s ease;
    }
  
    .progress-dot.active {
      background-color: var(--colorInclusive);
      transform: scale(1.2);
    }
  
    .progress-dot.completed {
      background-color: var(--colorInclusive);
    }
  
    .skip-button {
      background-color: var(--colorText);
      color: var(--colorWhite);
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 2rem;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  
    .skip-button:hover {
      background-color: var(--colorDarkGray);
    }
  </style>
```

# src/lib/components/SelectDistricts.svelte

```svelte
<!-- src/lib/components/SelectDistricts.svelte -->

<script>
    import { data, selectedDistricts, hideSmallDistricts } from '$lib/stores/stores.js'
    import Svelecte from 'svelecte'

    // Create array of objects with id and name value for each item in the data array
    let districtNames = $data.map((district) => {
        return { value: district.properties.GEOID, label: district.properties["Institution Name"] }
    })

    function toggleHideSmallDistricts() {
        hideSmallDistricts.update(value => !value)
    }
</script>

<div class="search text-width">
    <!-- <h2 class="search-description text-width">
        Select a school district
    </h2> -->

    <div class="search-container text-width">
        <Svelecte 
            options={districtNames} 
            bind:value={$selectedDistricts} 
            multiple={true} 
            placeholder={"find a school district"}
            closeAfterSelect={true}
        />
    </div>
</div>

<style>
    .search h2 {
        margin: 1rem 0;
    }

    .search-description {
        color: var(--colorInclusive);
        font-size: 1.4rem;
        letter-spacing: 0.01rem;
        font-weight: 700;
        font-family: 'Bitter', serif;
    }

    .search {
        width: 100%;
        padding: 1.5rem 0 2rem 0;
    }

    .filters {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        margin: 2rem 0 2rem 0;
        width: 100%;
        max-width: 72rem;
        gap: 1rem;
    }

    .action-button {
        padding: 0.25rem 0.5rem;
        border-radius: 20px;
        cursor: pointer;
        color: var(--colorText);
        transition: background-color 0.3s, border-color 0.3s;
        border: 1.5px solid var(--colorText);
        background-color: white;
        font-size: 0.9rem;
        white-space: nowrap;
        font-weight: 700;
        letter-spacing: 0.02rem;
        opacity: 0.85;
        margin: 0;
    }

    .action-button:hover {
        background-color: whitesmoke;
    }

    .primary-district-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        color: var(--colorDarkGray);
    }
    
    .info-text {
        font-style: italic;
        font-weight: 600;
    }

    .district-pills {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .district-pill {
        background-color: var(--colorLightGray);
        border: 1px solid var(--colorMediumGray);
        border-radius: 12px;
        padding: 0.25rem 0.5rem;
        font-size: 0.8rem;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .district-pill:hover {
        background-color: var(--colorMediumGray);
        color: white;
    }

    @media (max-width: 768px) {
        .filters {
            width: 100%;
            flex-direction: column;
        }
        
        .primary-district-info {
            margin: 0.5rem 0 0 0;
        }
        
        .district-pills {
            justify-content: center;
        }
    }
</style>
```

# src/lib/components/SideHeader.svelte

```svelte
<script>
    import NavLinks from "./NavLinks.svelte";
    import Logo from "./Logo.svelte"
    import { colors } from "$lib/styles/colorConfig.js"
  
    let menuOpen = false
    let windowWidth = 0;
  
    function slideAndFade(node, { delay = 0, duration = 300 }) {
      return {
        delay,
        duration,
        css: t => `
          transform: translateX(${(1 - t) * 100}%);
          opacity: ${t};
        `
      };
    }
  </script>
  
  <svelte:window bind:innerWidth={windowWidth} />
  
  <header class="side-header">
    <div class="header-content">
      <div class="logo-container">
        <Logo color={colors.colorInclusiveGray} textColor={colors.colorBackgroundWhite} />
      </div>
  
      <div class="menu-container">
        <button
          on:click={() => menuOpen = !menuOpen}
          class="menu-toggle"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </div>
  
    {#if menuOpen}
      <nav class="mobile-nav" transition:slideAndFade>
        <NavLinks direction="vertical" />
      </nav>
    {/if}
  </header>
  
  <style>
    .side-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-top: 2rem 3rem;
      padding: 2rem 2rem;
      background-color: var(--colorBackgroundWhite);
      position: relative;
      z-index: 100;
    }
  
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding-top: 0.4rem;
    }
  
    .logo-container {
      display: flex;
      align-items: center;
      padding-top: 0.4rem;
    }
  
    .menu-container {
      display: flex;
      align-items: center;
      margin-top: -2.4rem
    }
  
    .menu-toggle {
      display: block;
      background: none;
      border: none;
      font-size: 2rem;
      cursor: pointer;
      color: var(--colorInclusive);
      z-index: 20;
      padding: 0;
      margin: 0;
      line-height: 1;
    }
  
    .mobile-nav {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 80%;
      max-width: 300px;
      background-color: rgba(244, 241, 240, 0.94);
      padding: 5rem 1rem 1rem;
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);
      z-index: 10;
      display: flex;
      flex-direction: column;
    }
  
    /* Mobile view adjustments */
    @media (max-width: 768px) {
      .side-header {
        padding: 1rem 1rem;
        width: 100%;
      }
    }
  </style>
```

# src/lib/components/SimpleAccordion.svelte

```svelte
<script>
    import { slide } from 'svelte/transition';
    
    export let title = "Learn more";
    let isOpen = false;
  
    function toggle() {
      isOpen = !isOpen;
    }
  </script>
  
  <div class="accordion-wrapper">
    <button 
      type="button"
      class="accordion-button" 
      on:click={toggle}
      aria-expanded={isOpen}
    >
      {title} {isOpen ? '↑' : '↓'}
    </button>
    
    {#if isOpen}
      <div 
        class="accordion-content"
        transition:slide={{duration: 300}}
      >
        <slot />
      </div>
    {/if}
  </div>
  
  <style>
    .accordion-wrapper {
      margin: 0.5rem 0;
      width: 100%;
      font-family: inherit;
    }
  
    .accordion-button {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer !important;
      padding: 0.5rem;
      text-decoration: underline;
      font-size: 0.9em;
      opacity: 1;
      transition: opacity 0.2s;
      display: inline-block;
      font-family: inherit;
    }
  
    .accordion-button:hover {
      opacity: 0.7;
    }
  
    .accordion-content {
      padding: 0.5rem;
      font-size: 0.9em;
      line-height: 1.4;
      background: inherit;
      font-family: inherit;
    }

    :global(.accordion-content ul) {
        list-style: none;
        padding-left: 0;
        margin: 0.5rem 0;
    }

    :global(.accordion-content li) {
        padding: 0.2rem 0;
    }
  </style>
```

# src/lib/components/SmallSchools.svelte

```svelte
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
    let selectedYear = "2022-2023" // Default to newest year
    
    // Get unique school years from the data
    let availableYears = [...new Set(smallSchoolsData.map(school => school["School Year"]))].sort().reverse()

    // Toggle for showing/hiding school labels
    let showLabels = true
    
    // Tooltip related state
    let tooltipVisible = false
    let tooltipData = null
    let tooltipX = 0
    let tooltipY = 0

    const globalExtents = {
        // Fixed domains based on analysis of all data
        expenditure: { min: 14000, max: 22000 },  // Per Pupil Spending
        proficiency: { min: 20, max: 90 },       // Combined ELA/Math ranges
        enrollment: { min: 200, max: 500 }         // School enrollment
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

    // Process the data to parse numeric values and calculate average proficiency
    $: processedData = filteredYearData.map(school => {
        // Create a derived name field for display that's more compact
        const shortName = school.School.replace(" Primary School", "");

        // Parse individual metrics
        const expenditure = parseInt(school["Per Pupil Spending"].replace(/\$|,/g, ''));
        
        // Calculate average of ELA and Math proficiency
        const elaProf = parseInt(school["ELA Proficient & Above %"]?.replace(/%/g, '') || "0");
        const mathProf = parseInt(school["Math Proficient & Above %"]?.replace(/%/g, '') || "0");
        const averageProficiency = (elaProf + mathProf) / 2;
        
        const disabilityPercent = parseInt(school["Students w/Disabilities %"]?.replace(/%/g, '') || "0");
        const economicDisadvantagePercent = parseInt(school["Economically Disadvantaged %"]?.replace(/%/g, '') || "0");
        const enrollment = parseFloat(school["Total School Enrollment"] || 0);

        // Calculate total disadvantaged percentage (sum of economic disadvantage and disability)
        const totalDisadvantagedPercent = economicDisadvantagePercent + disabilityPercent;

        return {
            ...school,
            shortName,
            expenditure,
            performance: averageProficiency,
            disabilityPercent,
            economicDisadvantagePercent,
            totalDisadvantagedPercent,
            enrollment
        }
    });

    // Create a scale for circle radius based on enrollment (uses sqrt to scale by area not radius)
    $: rScale = scaleSqrt()
        .domain([globalExtents.enrollment.min, globalExtents.enrollment.max])
        .range([12, 24])

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
        <h2 class="text-width">Per Pupil Spending, School Size, and Proficiency</h2>
        
        <div class="selectors">
            <div class="year-selector">
                <label for="year-select">School Year:</label>
                <select id="year-select" bind:value={selectedYear}>
                    {#each availableYears as year}
                        <option value={year}>{year}</option>
                    {/each}
                </select>
            </div>
            
            <div class="toggle-container">
                <label class="toggle-label">
                    <input type="checkbox" bind:checked={showLabels} class="toggle-input">
                    <span class="toggle-text">{showLabels ? 'Hide Labels' : 'Show Labels'}</span>
                </label>
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
                    Proficiency (ELA/Math Average)
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
                    Avg Proficiency
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
                </g>
            {/each}

            {#each processedData as school}
                {#if showLabels}
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
            {/each}

            <!-- School Size legend with adjusted circles to account for the stroke width -->
            <g class="legend" transform="translate({dimensions.innerWidth - 57}, 220)">
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
                <div class="tooltip-highlight-row">
                    <span class="tooltip-highlight-label">Total Disadvantaged:</span>
                    <span class="tooltip-highlight-value">{tooltipData.totalDisadvantagedPercent}%</span>
                </div>
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
                    <div class="tooltip-row">
                        <span class="tooltip-label">Avg Proficiency:</span>
                        <span class="tooltip-value">{tooltipData.performance.toFixed(1)}%</span>
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
    
    .tooltip-highlight-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        padding: 5px 8px;
        background-color: #f0f0f0;
        border-radius: 4px;
        font-weight: 600;
    }
    
    .tooltip-highlight-label {
        color: var(--colorText);
        font-size: 13px;
    }
    
    .tooltip-highlight-value {
        color: var(--colorInclusiveDark);
        font-size: 15px;
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

    .toggle-container {
        display: flex;
        align-items: center;
    }
    
    .toggle-label {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-weight: 600;
        color: var(--colorText);
        gap: 0.5rem;
    }
    
    .toggle-input {
        cursor: pointer;
    }
    
    .toggle-text {
        white-space: nowrap;
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

        .year-selector, .toggle-container {
            width: 100%;
        }
        
        .tooltip {
            width: 220px;
            font-size: 11px;
        }
    }
</style>
```

# src/lib/components/Sources.svelte

```svelte
<div class="sources-container">
    <div class="data-source text-width">
        <p><strong>* Inclusion scores</strong> are more accurate for larger districts (more than 500 students with IEPs)</p>

        <!-- <p><strong>Inclusion scores</strong> are based on reported rates of how much time students with disabilities spend in regular classrooms, compared to other districts in the state.</p> -->

        <!-- <p><strong>Small districts</strong> have less than 500 students with IEPs. <strong>Large districts</strong> have 500 or more.</p> -->

        <p>Data is from the <strong>2023-24 school year</strong> and comes from the <a href="https://www.ode.state.or.us/data/ReportCard/Media" target="_blank">Oregon Department of Education</a>. Map data comes from the <a href="https://www.census.gov/cgi-bin/geo/shapefiles/index.php?year=2023&layergroup=School+Districts" target="_blank">US Census</a>.</p>

        <!-- <p><a href="https://github.com/bronna/inclusion/tree/main/src/data" target="_blank">Methodology</a></p> -->
    </div>
</div>


<style>
    p {
        font-size: 1rem;
        line-height: 1.4rem;
    }

    a {
        color: var(--colorInclusive);
        font-weight: 600;
    }

    .data-source {
        margin-top: 1rem;
        margin-bottom: 3rem;
    }
</style>
```

# src/lib/components/SourcesFunding.svelte

```svelte
<div class="sources-container">
    <div class="data-source text-width">
        <!-- <p><strong>* Inclusion scores</strong> are less accurate for small districts (less than 500 students with IEPs)</p> -->

        <!-- <p><strong>Inclusion scores</strong> are based on reported rates of how much time students with disabilities spend in regular classrooms, compared to other districts in the state.</p> -->

        <!-- <p><strong>Small districts</strong> have less than 500 students with IEPs. <strong>Large districts</strong> have 500 or more.</p> -->

        <p>Data is from the <strong>2023-24 school year</strong> and comes from the <a href="https://www.ode.state.or.us/data/ReportCard/Media" target="_blank">Oregon Department of Education</a>.</p>

        <!-- Map data comes from the <a href="https://www.census.gov/cgi-bin/geo/shapefiles/index.php?year=2023&layergroup=School+Districts" target="_blank">US Census</a> -->

        <!-- <p><a href="https://github.com/bronna/inclusion/tree/main/src/data" target="_blank">Methodology</a></p> -->
    </div>
</div>


<style>
    p {
        font-size: 1rem;
        line-height: 1.4rem;
    }

    a {
        color: var(--colorInclusiveDark);
        font-weight: 600;
    }

    .data-source {
        margin-top: 1rem;
        margin-bottom: 3rem;
    }
</style>
```

# src/lib/components/StateMap.svelte

```svelte
<script>
  import { onMount, afterUpdate } from 'svelte'
  import { writable } from 'svelte/store'
  import { geoBounds, geoTransverseMercator, geoPath, scaleOrdinal } from 'd3'
  import { data } from '$lib/stores/stores.js'
  import { colors } from "$lib/styles/colorConfig"

  export let districtData = {}

  // Reactive declarations for feature collection
  $: featureCollection = $data ? {
    type: "FeatureCollection",
    features: $data
  } : null

  // Set initial values for dimensions and projection
  let dims = { width: 0, height: 0 }
  let centralLat = 43.9
  let centralLong = -120.5

  let projection = null
  let districtPathGenerator = null
  let mapElement
  let svgElement
  let gElement

  // Reactive bounds calculation
  $: bounds = calculateBounds($data)
  
  function calculateBounds(data) {
    if (!data) return { minLng: 0, minLat: 0, maxLng: 0, maxLat: 0 }
    
    let minLng = Infinity, minLat = Infinity, maxLng = -Infinity, maxLat = -Infinity
    
    data.forEach(feature => {
      if(feature.geometry) {
        const [[featureMinLng, featureMinLat], [featureMaxLng, featureMaxLat]] = geoBounds(feature)
        minLng = Math.min(minLng, featureMinLng)
        minLat = Math.min(minLat, featureMinLat)
        maxLng = Math.max(maxLng, featureMaxLng)
        maxLat = Math.max(maxLat, featureMaxLat)
      }
    })
    
    return { minLng, minLat, maxLng, maxLat }
  }

  // resize the map when the window resizes or data changes
  function updateProjection() {
    if (!mapElement || !featureCollection) return
    
    const { minLng, minLat, maxLng, maxLat } = bounds
    const widthStateBounds = maxLng - minLng
    const heightStateBounds = maxLat - minLat

    dims.width = mapElement.offsetWidth
    dims.height = mapElement.offsetHeight

    projection = geoTransverseMercator()
      .rotate([-centralLong, -centralLat])
      .fitSize([dims.width, dims.height], featureCollection)

    districtPathGenerator = geoPath(projection)
  }

  let currentTransform = writable({ x: 0, y: 0, k: 1 })

  let colorScale = scaleOrdinal()
    .domain([1, 2, 3, 4])
    .range([colors.colorSeparate, colors.colorNonInclusive, colors.colorSemiInclusive, colors.colorInclusive])

  // Watch for data changes and update projection
  $: if ($data) {
    // Use setTimeout to ensure DOM is ready
    setTimeout(updateProjection, 0)
  }

  onMount(() => {
    updateProjection()
    window.addEventListener('resize', updateProjection)
    return () => window.removeEventListener('resize', updateProjection)
  })

  afterUpdate(() => {
    updateProjection()
  })
</script>

<div id="map" bind:this={mapElement}>
  {#if $data && projection && districtPathGenerator && dims.width > 0 && dims.height > 0}
    <svg bind:this={svgElement} width={dims.width} height={dims.height}>
      <g bind:this={gElement}>
        <g>
          {#each $data as district}
            {#if district.properties.GEOID !== "999999"}
              <path
                class="districtShape"
                d={districtPathGenerator(district)}
                fill={colors.colorLightGray}
                fill-rule="evenodd"
              />
            {/if}
          {/each}
          
          {#if districtData?.GEOID}
            {#each $data as district}
              {#if district.properties.GEOID === districtData.GEOID && district.properties.INTPTLON && district.properties.INTPTLAT}
                <circle
                  cx={projection([district.properties.INTPTLON, district.properties.INTPTLAT])[0]}
                  cy={projection([district.properties.INTPTLON, district.properties.INTPTLAT])[1]}
                  r="45"
                  fill={colorScale(district.properties.quartile)}
                  stroke={colors.colorBackgroundWhite}
                  stroke-width="10"
                />
              {/if}
            {/each}
          {/if}
        </g>
      </g>
    </svg>
  {/if}
</div>

<style>
  #map {
    width: var(--map-width, 100%);
    height: var(--map-height, 100%);
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .districtShape {
    vector-effect: non-scaling-stroke;
  }
</style>
```

# src/lib/components/SVGChart.svelte

```svelte
<script>
    export let dimensions = {}
    export let originCenter = false
</script>

<svg class="svg-chart" width={dimensions.width} height={dimensions.height}>
    <g transform={
        originCenter === false ? 
            `translate(${dimensions.margin.left}, ${dimensions.margin.top})` : 
            `translate(${dimensions.width / 2}, ${dimensions.height / 2})`}
    >
        <slot />
    </g>
</svg>
```

# src/lib/components/SwarmIdentificationSize.svelte

```svelte
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
```

# src/lib/components/TableOfDistricts.svelte

```svelte
<!-- Enhanced TableOfDistricts.svelte -->
<script>
    import { goto } from '$app/navigation'
    import { writable, derived } from "svelte/store"
    import { arrowUp, arrowDown } from "$lib/utils/arrows.js"
    import InclusionRing from "$lib/components/InclusionRing.svelte"
    import { selectedDistricts } from '$lib/stores/stores.js'

    export let data

    let width
    
    const sortKey = writable("Total Student Count")
    const sortOrder = writable(-1)
    const visibleRows = writable(8) // Increased default to accommodate selected districts
    const showAllRows = writable(false)

    function sortBy(key) {
        sortKey.set(key)
        sortOrder.update(n => -n)
    }

    // Enhanced data processing that prioritizes selected districts
    // Need to make this reactive to selectedDistricts changes
    $: processedData = (() => {
        if (!data) return { selectedData: [], otherData: [] }

        // Filter out invalid districts
        const validData = data.filter(item => 
            item.properties["Institution Name"] != null && 
            item.properties["Institution Name"] !== "undefined" &&
            item.properties["Institution Name"].trim() !== "" &&
            item.properties["GEOID"] !== '999999'
        )

        // Separate selected and non-selected districts
        const selectedData = validData.filter(item => 
            $selectedDistricts && $selectedDistricts.includes(item.properties.GEOID)
        )
        
        const otherData = validData.filter(item => 
            !$selectedDistricts || !$selectedDistricts.includes(item.properties.GEOID)
        )

        // Sort function
        const sortFunction = (a, b) => {
            let aValue = a.properties[$sortKey]
            let bValue = b.properties[$sortKey]
            
            if (["Total Student Count", "weighted_inclusion", "Students with Disabilities", "nAlerts"].includes($sortKey)) {
                aValue = aValue === null || aValue === undefined ? -Infinity : Number(aValue)
                bValue = bValue === null || bValue === undefined ? -Infinity : Number(bValue)
                return $sortOrder * (aValue - bValue)
            }
            
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return $sortOrder * aValue.localeCompare(bValue)
            }
            
            aValue = aValue === null || aValue === undefined ? '' : String(aValue)
            bValue = bValue === null || bValue === undefined ? '' : String(bValue)
            return $sortOrder * aValue.localeCompare(bValue)
        }

        // Sort both arrays
        selectedData.sort(sortFunction)
        otherData.sort(sortFunction)

        return { selectedData, otherData }
    })()

    // Combined data for display - also reactive
    $: displayData = [
        ...processedData.selectedData,
        ...processedData.otherData
    ]

    function navigateToDistrict(districtGEOID) {
        goto(`/${districtGEOID}`)
    }

    function toggleShowMore() {
        showAllRows.update(value => !value)
        if($showAllRows) {
            visibleRows.set(displayData.length)
        } else {
            visibleRows.set(8)
        }
    }

    // Check if we have selected districts to show the divider
    $: hasSelectedDistricts = $selectedDistricts && $selectedDistricts.length > 0
</script>

<div class="table-container">
    <!-- {#if hasSelectedDistricts}
        <div class="selected-districts-header">
            <h3>Selected Districts ({$selectedDistricts.length})</h3>
            <p>These districts are highlighted based on your selection above</p>
        </div>
    {/if} -->

    <table class="district-table">
        <thead>
            <tr>
                <th on:click={() => sortBy("Institution Name")} class:sorted={$sortKey === "Institution Name"}>
                    <span class="header-content">
                        <span class="header-text">DISTRICT </span>
                        <span class="sort-arrow">
                            {@html $sortKey === "Institution Name" ? ($sortOrder === 1 ? arrowUp : arrowDown) : arrowDown}
                        </span>
                    </span>
                </th>
                <th on:click={() => sortBy("weighted_inclusion")} class:sorted={$sortKey === "weighted_inclusion"}>
                    <span class="header-content">
                        <span class="header-text">INCLUSION SCORE</span>
                        <span class="sort-arrow">
                            {@html $sortKey === "weighted_inclusion" ? ($sortOrder === 1 ? arrowUp : arrowDown) : arrowDown}
                        </span>
                    </span>
                </th>
                <th on:click={() => sortBy("Total Student Count")} class:sorted={$sortKey === "Total Student Count"}>
                    <span class="header-content">
                        <span class="header-text">STUDENTS WITH IEPs</span>
                        <span class="sort-arrow">
                            {@html $sortKey === "Total Student Count" ? ($sortOrder === 1 ? arrowUp : arrowDown) : arrowDown}
                        </span>
                    </span>
                </th>
                <th class="hide-mobile" on:click={() => sortBy("Students with Disabilities")} class:sorted={$sortKey === "Students with Disabilities"}>
                    <span class="header-content">
                        <span class="header-text">% OF STUDENTS IN DISTRICT WITH IEPs</span>
                        <span class="sort-arrow">
                            {@html $sortKey === "Students with Disabilities" ? ($sortOrder === 1 ? arrowUp : arrowDown) : arrowDown}
                        </span>
                    </span>
                </th>
                <th class="hide-mobile" on:click={() => sortBy("nAlerts")} class:sorted={$sortKey === "nAlerts"}>
                    <span class="header-content">
                        <span class="header-text">ALERTS</span>
                        <span class="sort-arrow">
                            {@html $sortKey === "nAlerts" ? ($sortOrder === 1 ? arrowUp : arrowDown) : arrowDown}
                        </span>
                    </span>
                </th>
                <th class="hide-mobile settings-column">
                    <div class="settings-header">
                        <div class="settings-title">
                            % STUDENTS WITH IEPs IN A SETTING THAT IS:
                        </div>
                        <div class="settings-categories">
                            <span>INCLUSIVE</span>
                            <span>SEMI-INCL</span>
                            <span>NON-INCL</span>
                            <span>SEPARATE</span>
                        </div>
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            {#each displayData.slice(0, $visibleRows) as district, index (district.properties.GEOID)}
                <!-- Show divider after selected districts -->
                <!-- {#if hasSelectedDistricts && index === processedData.selectedData.length && processedData.otherData.length > 0}
                    <tr class="section-divider">
                        <td colspan="7">
                            <div class="divider-content">
                                <span>All Other Districts</span>
                            </div>
                        </td>
                    </tr>
                {/if} -->
                
                <tr 
                    on:click={() => navigateToDistrict(district.properties.GEOID)} 
                    tabindex="0" 
                    role="button"
                    class:selected-district={$selectedDistricts.includes(district.properties.GEOID)}
                >
                    <!-- Desktop View -->
                    <td class="district-name hide-mobile">
                        <div class="name-container">
                            <!-- {#if $selectedDistricts.includes(district.properties.GEOID)}
                                <span class="selected-indicator">★</span>
                            {/if} -->
                            <span class="underline-on-hover">{district.properties["Institution Name"]}</span>
                        </div>
                    </td>
                    <td class="district-metric hide-mobile">
                        <div class="inclusion-ring-container">
                            <div class="metric-content">
                                <InclusionRing data={district.properties} />
                            </div>
                            {#if district.properties["Total Student Count"] < 500 && district.properties.weighted_inclusion}
                                <span class="uncertainty">*</span>
                            {/if}
                        </div>
                    </td>
                    <td class="hide-mobile">
                        {#if district.properties["Total Student Count"]}
                            <span class="underline-on-hover">{district.properties["Total Student Count"].toLocaleString()}</span>
                        {:else}
                            <span class="no-data">-</span>
                        {/if}
                    </td>
                    <td class="hide-mobile">
                        {#if district.properties["Students with Disabilities"]}
                            <span class="underline-on-hover">{district.properties["Students with Disabilities"].toLocaleString()}%</span>
                        {:else}
                            <span class="no-data">-</span>
                        {/if}
                    </td>
                    <td class="hide-mobile">
                        {#if district.properties["nAlerts"] !== null && district.properties["nAlerts"] !== undefined}
                            {#if district.properties["nAlerts"] > 0}
                                <span class="underline-on-hover" style="font-weight: 900; font-size: 1.4rem; color: rgb(222, 84, 102);">
                                    {'!'.repeat(district.properties["nAlerts"])}
                                </span>
                            {:else}
                                <span class="no-data">0</span>
                            {/if}
                        {:else}
                            <span class="no-data">coming soon</span>
                        {/if}
                    </td>
                    <td class="hide-mobile settings-data">
                        {#if district.properties["LRE Students >80%"]}
                            <div class="settings-values">
                                <span>{district.properties["LRE Students >80%"].toFixed(1)}%</span>
                                <span>{district.properties["LRE Students >40% <80%"].toFixed(1)}%</span>
                                <span>{district.properties["LRE Students <40%"].toFixed(1)}%</span>
                                <span>{district.properties["LRE Students Separate Settings"].toFixed(1)}%</span>
                            </div>
                        {:else}
                            <span class="no-data">-</span>
                        {/if}
                    </td>
                    <td class="arrow-cell hide-mobile">
                        <span class="more underline-on-hover">more ></span>
                    </td>

                    <!-- Mobile View -->
                    <div class="mobile-district-column show-mobile">
                        <div class="mobile-name-container">
                            <!-- {#if $selectedDistricts.includes(district.properties.GEOID)}
                                <span class="selected-indicator">★</span>
                            {/if} -->
                            <span class="district-name">{district.properties["Institution Name"]}</span>
                        </div>
                        <div class="district-stats">
                            {#if district.properties["Total Student Count"] && district.properties["Students with Disabilities"]}
                                <span class="stat-emphasis">{district.properties["Total Student Count"].toLocaleString()}</span>, or <span class="stat-emphasis">{district.properties["Students with Disabilities"].toLocaleString()}%</span>,
                                of students have an IEP
                            {:else}
                                <span class="no-data">No data available</span>
                            {/if}
                        </div>
                    </div>

                    <div class="mobile-inclusion-column show-mobile">
                        <div class="inclusion-score">
                            <InclusionRing data={district.properties} /> 
                            {#if district.properties["Total Student Count"] < 500 && district.properties.weighted_inclusion}
                                <span class="uncertainty">*</span>
                            {/if}
                            <span class="score-proportion"> / 4</span>
                        </div>
                        {#if district.properties["LRE Students >80%"]}
                            <span class="settings-label">educational settings</span>
                            <div class="settings-values">
                                <span class="setting-info">{district.properties["LRE Students >80%"].toFixed(1)}% inclusive</span>
                                <span class="setting-info">{district.properties["LRE Students >40% <80%"].toFixed(1)}% semi-incl</span>
                                <span class="setting-info">{district.properties["LRE Students <40%"].toFixed(1)}% non-incl</span>
                                <span class="setting-info">{district.properties["LRE Students Separate Settings"].toFixed(1)}% separate</span>
                            </div>
                        {:else}
                            <span class="no-data">No settings data available</span>
                        {/if}
                    </div>

                    <div class="mobile-alerts-row show-mobile">
                        <div class="mobile-alerts">
                            {#if district.properties["nAlerts"] !== null && district.properties["nAlerts"] !== undefined}
                                {#if district.properties["nAlerts"] > 0}
                                    <span class="underline-on-hover" style="font-weight: 900; font-size: 1rem; color: rgb(222, 84, 102);">
                                        Alerts: {'!'.repeat(district.properties["nAlerts"])}
                                    </span>
                                {:else}
                                    <span>No alerts</span>
                                {/if}
                            {:else}
                                <span class="no-data">Alerts data coming soon</span>
                            {/if}
                        </div>
                        <span class="mobile-more">more ></span>
                    </div>
                </tr>
            {/each}
        </tbody>
    </table>

    {#if displayData.length > 8}
        <div class="show-more-container">
            <button on:click={toggleShowMore} class="show-more-button">
                {$showAllRows ? "show less" : "show more"}
            </button>
        </div>
    {/if}
</div>

<style>
    .table-container {
        width: 90%;
        margin: 0 auto;
    }

    .selected-districts-header {
        margin: 2rem auto 1rem;
        text-align: center;
        max-width: 600px;
    }

    .selected-districts-header h3 {
        color: var(--colorInclusive);
        font-family: var(--font-headers);
        margin-bottom: 0.5rem;
    }

    .selected-districts-header p {
        color: var(--colorDarkGray);
        font-size: 0.9rem;
        margin: 0;
    }

    /* Selected district styling */
    .selected-district {
        background-color: color-mix(in srgb, var(--colorInclusive) 5%, transparent);
        border-left: 4px solid var(--colorInclusive);
    }

    .selected-indicator {
        color: var(--colorInclusive);
        font-weight: 700;
        margin-right: 0.5rem;
        font-size: 1.1rem;
    }

    .name-container,
    .mobile-name-container {
        display: flex;
        align-items: center;
    }

    /* Section divider */
    .section-divider {
        border: none;
        background: none;
    }

    .section-divider td {
        padding: 1rem 0 0.5rem 0;
        border-bottom: none;
    }

    .divider-content {
        text-align: center;
        font-size: 0.9rem;
        color: var(--colorDarkGray);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
        position: relative;
    }

    .divider-content::before,
    .divider-content::after {
        content: '';
        position: absolute;
        top: 50%;
        width: 30%;
        height: 1px;
        background-color: var(--colorLightGray);
    }

    .divider-content::before {
        left: 0;
    }

    .divider-content::after {
        right: 0;
    }

    /* Rest of existing styles... */
    table {
        border-collapse: collapse;
        width: 100%;
        margin: 2rem 0;
    }

    th, td {
        padding: 8px 12px;
        text-align: left;
    }

    /* Column Widths */
    th:nth-child(1), td:nth-child(1) { width: 20%; }
    th:nth-child(2), td:nth-child(2) { width: 10%; }
    th:nth-child(3), td:nth-child(3) { width: 10%; }
    th:nth-child(4), td:nth-child(4) { width: 10%; }
    th:nth-child(5), td:nth-child(5) { width: 10%; }
    th:nth-child(6), td:nth-child(6) { width: 25%; }
    th:nth-child(7), td:nth-child(7) { width: 5%; }

    /* Header Styles */
    thead {
        border-bottom: 1px solid var(--colorDarkGray);
    }

    th {
        vertical-align: middle;
        line-height: 1rem;
        font-size: 0.85rem;
        letter-spacing: 0.01rem;
        color: var(--colorText);
        cursor: pointer;
        position: relative;
        opacity: 0.8;
    }

    .header-content {
        display: flex;
        text-align: right;
        align-items: center;
    }

    th:not(:nth-child(2), :nth-child(3), :nth-child(4), :nth-child(5)) .header-content {
        text-align: left;
        width: fit-content;
    }

    .header-text {
        width: fit-content;
    }

    /* Center-aligned Headers */
    th:nth-child(2) .header-content,
    th:nth-child(3) .header-content,
    th:nth-child(4) .header-content,
    th:nth-child(5) .header-content {
        justify-content: center;
        width: 100%;
    }

    /* Sort Arrow Styles */
    .sort-arrow {
        display: inline-flex;
        align-items: center;
        margin-left: 8px;
        opacity: 0.5;
    }

    th.sorted {
        color: var(--colorInclusive);
        opacity: 1;
    }

    th.sorted .sort-arrow {
        opacity: 1;
    }

    /* Table Body Styles */
    tbody tr:not(.section-divider) {
        transition: background-color 0.3s ease;
    }

    tbody tr:not(.section-divider):hover {
        background-color: var(--colorLightLightGray);
    }

    tbody tr[tabindex="0"] {
        cursor: pointer;
    }

    /* District Name Column */
    .district-name {
        font-size: 1.2rem;
        font-weight: 700;
        line-height: 1.5rem;
        letter-spacing: 0.0rem;
        white-space: normal;
        cursor: pointer;
    }

    /* Inclusion Score Column */
    .district-metric {
        white-space: normal;
        text-align: center;
    }

    .district-metric .metric-content {
        min-height: 42px;
    }

    .inclusion-ring-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .metric-content {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .uncertainty {
        margin-left: -3px;
        margin-right: -7px;
        align-self: flex-start;
        font-size: 1.6rem;
        color: var(--colorText);
    }

    /* Center-aligned Columns */
    td:nth-child(3),
    td:nth-child(4),
    td:nth-child(5) {
        text-align: center;
    }

    /* Settings Column */
    .settings-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .settings-title {
        text-align: center;
        width: 100%;
        margin-bottom: 0.5rem;
    }

    .settings-categories {
        display: flex;
        justify-content: space-between;
        width: 100%;
        white-space: nowrap;
    }

    .settings-categories span {
        text-align: center;
        flex: 1;
        font-size: 0.8rem;
        background-color: var(--colorInclusive);
        color: var(--colorWhite);
        padding: 2px;
    }

    .settings-values {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .settings-values span {
        text-align: center;
        flex: 1;
        font-weight: 600;
    }

    /* Settings Colors */
    .settings-categories span:nth-child(1) {
        background-color: var(--colorInclusive);
    }
    .settings-values span:nth-child(1) {
        color: var(--colorInclusive);
    }

    .settings-categories span:nth-child(2){
        background-color: var(--colorSemiInclusive);
    }
    .settings-values span:nth-child(2) {
        color: var(--colorSemiInclusive);
    }

    .settings-categories span:nth-child(3) {
        background-color: var(--colorNonInclusive);
    }
    .settings-values span:nth-child(3) {
        color: var(--colorNonInclusive);
    }

    .settings-categories span:nth-child(4) {
        background-color: var(--colorSeparate);
    }
    .settings-values span:nth-child(4) {
        color: var(--colorSeparate);
    }

    /* More Column */
    .arrow-cell {
        white-space: nowrap;
    }

    .more {
        color: var(--colorMediumGray);
    }

    tbody tr:hover .more {
        color: var(--colorText);
    }

    /* Underline Hover Effect */
    .underline-on-hover {
        position: relative;
        display: inline-block;
        padding-right: 0;
    }

    .underline-on-hover::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        bottom: -2px;
        left: 0;
        background-color: var(--colorText);
        color: var(--colorDarkGray);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    tbody tr:hover .underline-on-hover::after {
        opacity: 1;
    }

    /* No Data State */
    .no-data {
        color: var(--colorText);
        font-style: italic;
    }

    /* Mobile/Desktop Visibility */
    .show-mobile {
        display: none;
    }

    /* Show More Button */
    .show-more-container {
        text-align: center;
        margin-top: 1.5rem;
        margin-bottom: 3rem;
    }

    .show-more-button {
        color: var(--colorBackgroundWhite);
        text-transform: uppercase;
        border: 1.5px solid var(--colorText);
        border-radius: 20px;
        background-color: var(--colorDarkGray);
        padding: 0.5rem 1rem;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.04rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .show-more-button:hover {
        background-color: var(--colorMediumGray);
    }

    /* Mobile Styles */
    @media (max-width: 768px) {
        .table-container {
            width: 100%;
        }

        .hide-mobile {
            display: none !important;
        }

        .show-mobile {
            display: block;
        }

        thead {
            display: none;
        }

        tbody tr:not(.section-divider) {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
            gap: 1rem;
            padding: 1.5rem 1rem;
            border-bottom: 1px solid var(--colorLightGray);
        }

        .section-divider {
            display: block;
            grid-column: 1 / -1;
        }

        /* Left Column - District Info */
        .mobile-district-column {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .mobile-district-column .district-name {
            font-size: 1.2rem;
            font-weight: 800;
            line-height: 1.3;
            margin-bottom: 0.5rem;
        }

        .mobile-district-column .district-stats {
            font-size: 1rem;
            line-height: 1.4;
            color: var(--colorText);
        }

        .mobile-district-column .district-stats .stat-emphasis {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--colorText);
        }

        /* Right Column - Inclusion Info */
        .mobile-inclusion-column {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 0.5rem;
        }

        .mobile-inclusion-column .inclusion-score {
            display: flex;
            align-items: end;
            gap: 0.5rem;
            margin-bottom: 0.8rem;
        }

        .mobile-inclusion-column .inclusion-score .score-proportion {
            font-size: 1.2rem;
        }

        .mobile-inclusion-column .settings-label {
            font-size: 0.8rem;
            text-transform: uppercase;
            font-weight: 700;
            color: var(--colorMediumGray);
            margin-bottom: 0rem;
        }

        .mobile-inclusion-column .settings-values {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 0.2rem;
            font-size: 1rem;
        }

        .mobile-inclusion-column .settings-values .setting-info {
            font-weight: 700;
        }

        .mobile-inclusion-column .settings-values span {
            white-space: nowrap;
        }

        /* Bottom Row - Alerts and More */
        .mobile-alerts-row {
            grid-column: 1 / -1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 0.5rem;
            font-size: 0.9rem;
        }

        .mobile-alerts {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--colorDarkGray);
            font-size: 1rem;
        }

        .mobile-more {
            color: var(--colorText);
            font-weight: 700;
        }
    }
</style>
```

# src/lib/components/Tooltip.svelte

```svelte
<script>
    export let data
    export let xScale
    export let yScale
  </script>
  
  <div class='tooltip' style="position: absolute;
    top: {yScale(data.hours)}px;
    left: {xScale(data.grade)}px">
  <h1>{data.name}</h1> 
  <p>{data.hours} hours studied</p>
  </div>
  
  <style>
    .tooltip {
      padding: 6px;
      background: white;
      border: 1px solid rgba(0, 0, 0, 0.5);
      pointer-events: none;
      transition: top 300ms ease, left 300ms ease;
    }
  
    h1 {
      font-weight: 700;
      margin-bottom: 0.25rem;
    }
  </style>
```

# src/lib/components/VisualizationToggle.svelte

```svelte
<script>
    import { fade } from 'svelte/transition'
    import { Map, BarChart2 } from 'lucide-svelte'
    import { colors } from '$lib/styles/colorConfig'
    import { selectedDistricts, primaryDistrictData } from '$lib/stores/stores.js'
    
    // No need to extract the first item - primaryDistrictData is already a single object
    $: districtData = $primaryDistrictData?.properties
    
    import DistrictsBeeswarm from './DistrictsBeeswarm.svelte'
    import BubbleMap from './BubbleMap.svelte'

    export let index
    export let showToggle = false
    
    let currentView = 'beeswarm'
    
    $: showToggle = index >= 7 // Only show toggle after scroller reaches final state
</script>

{#if showToggle}
    <div class="viz-container" transition:fade={{ duration: 300 }}>
        <div class="toggle-buttons" transition:fade={{ duration: 300 }}>
            <button 
                class="toggle-btn {currentView === 'beeswarm' ? 'active' : ''}"
                on:click={() => currentView = 'beeswarm'}
                aria-label="Show beeswarm visualization"
            >
                <BarChart2 
                    size={20} 
                    color={currentView === 'beeswarm' ? colors.colorWhite : colors.colorText} 
                />
                <span>Swarm</span>
            </button>
            <button 
                class="toggle-btn {currentView === 'map' ? 'active' : ''}"
                on:click={() => currentView = 'map'}
                aria-label="Show map visualization"
            >
                <Map 
                    size={20} 
                    color={currentView === 'map' ? colors.colorWhite : colors.colorText} 
                />
                <span>Map</span>
            </button>
        </div>

        <div class="visualization">
            {#if currentView === 'beeswarm'}
                <div transition:fade={{ duration: 300 }}>
                    <DistrictsBeeswarm {index} />
                </div>
            {:else}
                <div transition:fade={{ duration: 300 }}
                     style="width: 100%; height: 400px;">
                    <BubbleMap />
                </div>
            {/if}
        </div>
    </div>
{:else}
    <DistrictsBeeswarm {index} />
{/if}

<style>
    .viz-container {
        width: 100%;
        position: relative;
    }

    .toggle-buttons {
        position: absolute;
        top: -50px;
        right: 2rem;
        display: flex;
        gap: 0.5rem;
        z-index: 10;
    }

    .toggle-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border: 1.5px solid var(--colorText);
        border-radius: 20px;
        background: var(--colorBackgroundWhite);
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .toggle-btn.active {
        background: var(--colorText);
        color: var(--colorBackgroundWhite);
    }

    .toggle-btn:hover:not(.active) {
        background: var(--colorLightLightGray);
    }

    .visualization {
        width: 100%;
        min-height: 400px;
        position: relative;
    }

    @media (max-width: 768px) {
        .toggle-buttons {
            right: 1rem;
        }

        .toggle-btn span {
            display: none;
        }

        .toggle-btn {
            padding: 0.5rem;
        }
    }
</style>
```

# src/lib/data/district_percents.json

```json
{
  "2063": {
    "District ID": 2063,
    "District Name": "Adel SD 21",
    "Student Enrollment": 11.0,
    "Students with Disabilities %": null,
    "Students Experiencing Poverty %": null
  },
  "2113": {
    "District ID": 2113,
    "District Name": "Adrian SD 61",
    "Student Enrollment": 282.0,
    "Students with Disabilities %": 0.12,
    "Students Experiencing Poverty %": 0.29
  },
  "1899": {
    "District ID": 1899,
    "District Name": "Alsea SD 7J",
    "Student Enrollment": 252.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.5
  },
  "2252": {
    "District ID": 2252,
    "District Name": "Amity SD 4J",
    "Student Enrollment": 725.0,
    "Students with Disabilities %": 0.16,
    "Students Experiencing Poverty %": 0.29
  },
  "2111": {
    "District ID": 2111,
    "District Name": "Annex SD 29",
    "Student Enrollment": 104.0,
    "Students with Disabilities %": 0.13,
    "Students Experiencing Poverty %": 0.37
  },
  "2005": {
    "District ID": 2005,
    "District Name": "Arlington SD 3",
    "Student Enrollment": 130.0,
    "Students with Disabilities %": 0.16,
    "Students Experiencing Poverty %": 0.41
  },
  "2115": {
    "District ID": 2115,
    "District Name": "Arock SD 81",
    "Student Enrollment": 11.0,
    "Students with Disabilities %": 0.16,
    "Students Experiencing Poverty %": 0.41
  },
  "2041": {
    "District ID": 2041,
    "District Name": "Ashland SD 5",
    "Student Enrollment": 2506.0,
    "Students with Disabilities %": 0.16,
    "Students Experiencing Poverty %": 0.26
  },
  "2051": {
    "District ID": 2051,
    "District Name": "Ashwood SD 8",
    "Student Enrollment": null,
    "Students with Disabilities %": 0.16,
    "Students Experiencing Poverty %": 0.26
  },
  "1933": {
    "District ID": 1933,
    "District Name": "Astoria SD 1",
    "Student Enrollment": 1746.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.29
  },
  "2208": {
    "District ID": 2208,
    "District Name": "Athena-Weston SD 29RJ",
    "Student Enrollment": 526.0,
    "Students with Disabilities %": 0.13,
    "Students Experiencing Poverty %": 0.38
  },
  "1894": {
    "District ID": 1894,
    "District Name": "Baker SD 5J",
    "Student Enrollment": 5013.0,
    "Students with Disabilities %": 0.14,
    "Students Experiencing Poverty %": 0.3
  },
  "1969": {
    "District ID": 1969,
    "District Name": "Bandon SD 54",
    "Student Enrollment": 628.0,
    "Students with Disabilities %": 0.14,
    "Students Experiencing Poverty %": 0.39
  },
  "2240": {
    "District ID": 2240,
    "District Name": "Banks SD 13",
    "Student Enrollment": 1084.0,
    "Students with Disabilities %": 0.16,
    "Students Experiencing Poverty %": 0.2
  },
  "2243": {
    "District ID": 2243,
    "District Name": "Beaverton SD 48J",
    "Student Enrollment": 38066.0,
    "Students with Disabilities %": 0.13,
    "Students Experiencing Poverty %": 0.22
  },
  "1976": {
    "District ID": 1976,
    "District Name": "Bend-LaPine Administrative SD 1",
    "Student Enrollment": 16954.0,
    "Students with Disabilities %": 0.12,
    "Students Experiencing Poverty %": 0.21
  },
  "2088": {
    "District ID": 2088,
    "District Name": "Bethel SD 52",
    "Student Enrollment": 4927.0,
    "Students with Disabilities %": 0.2,
    "Students Experiencing Poverty %": 0.41
  },
  "2095": {
    "District ID": 2095,
    "District Name": "Blachly SD 90",
    "Student Enrollment": 397.0,
    "Students with Disabilities %": 0.05,
    "Students Experiencing Poverty %": 0.28
  },
  "2052": {
    "District ID": 2052,
    "District Name": "Black Butte SD 41",
    "Student Enrollment": 26.0,
    "Students with Disabilities %": 0.05,
    "Students Experiencing Poverty %": 0.28
  },
  "1974": {
    "District ID": 1974,
    "District Name": "Brookings-Harbor SD 17C",
    "Student Enrollment": 1274.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.41
  },
  "1896": {
    "District ID": 1896,
    "District Name": "Burnt River SD 30J",
    "Student Enrollment": 44.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.45
  },
  "2046": {
    "District ID": 2046,
    "District Name": "Butte Falls SD 91",
    "Student Enrollment": 146.0,
    "Students with Disabilities %": 0.25,
    "Students Experiencing Poverty %": 0.53
  },
  "1995": {
    "District ID": 1995,
    "District Name": "Camas Valley SD 21J",
    "Student Enrollment": 213.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.4
  },
  "1929": {
    "District ID": 1929,
    "District Name": "Canby SD 86",
    "Student Enrollment": 4088.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.27
  },
  "2139": {
    "District ID": 2139,
    "District Name": "Cascade SD 5",
    "Student Enrollment": 2682.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.29
  },
  "2185": {
    "District ID": 2185,
    "District Name": "Centennial SD 28J",
    "Student Enrollment": 5419.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.46
  },
  "1972": {
    "District ID": 1972,
    "District Name": "Central Curry SD 1",
    "Student Enrollment": 411.0,
    "Students with Disabilities %": 0.11,
    "Students Experiencing Poverty %": 0.44
  },
  "2105": {
    "District ID": 2105,
    "District Name": "Central Linn SD 552",
    "Student Enrollment": 512.0,
    "Students with Disabilities %": 0.2,
    "Students Experiencing Poverty %": 0.33
  },
  "2042": {
    "District ID": 2042,
    "District Name": "Central Point SD 6",
    "Student Enrollment": 4697.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.39
  },
  "2191": {
    "District ID": 2191,
    "District Name": "Central SD 13J",
    "Student Enrollment": 3030.0,
    "Students with Disabilities %": 0.14,
    "Students Experiencing Poverty %": 0.42
  },
  "1945": {
    "District ID": 1945,
    "District Name": "Clatskanie SD 6J",
    "Student Enrollment": 658.0,
    "Students with Disabilities %": 0.21,
    "Students Experiencing Poverty %": 0.31
  },
  "1927": {
    "District ID": 1927,
    "District Name": "Colton SD 53",
    "Student Enrollment": 620.0,
    "Students with Disabilities %": 0.16,
    "Students Experiencing Poverty %": 0.26
  },
  "2006": {
    "District ID": 2006,
    "District Name": "Condon SD 25J",
    "Student Enrollment": 136.0,
    "Students with Disabilities %": 0.11,
    "Students Experiencing Poverty %": 0.38
  },
  "1965": {
    "District ID": 1965,
    "District Name": "Coos Bay SD 9",
    "Student Enrollment": 2946.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.48
  },
  "1964": {
    "District ID": 1964,
    "District Name": "Coquille SD 8",
    "Student Enrollment": 1268.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.4
  },
  "2186": {
    "District ID": 2186,
    "District Name": "Corbett SD 39",
    "Student Enrollment": 1068.0,
    "Students with Disabilities %": 0.2,
    "Students Experiencing Poverty %": 0.18
  },
  "1901": {
    "District ID": 1901,
    "District Name": "Corvallis SD 509J",
    "Student Enrollment": 6051.0,
    "Students with Disabilities %": 0.13,
    "Students Experiencing Poverty %": 0.24
  },
  "2216": {
    "District ID": 2216,
    "District Name": "Cove SD 15",
    "Student Enrollment": 303.0,
    "Students with Disabilities %": 0.16,
    "Students Experiencing Poverty %": 0.2
  },
  "2086": {
    "District ID": 2086,
    "District Name": "Creswell SD 40",
    "Student Enrollment": 1107.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.33
  },
  "1970": {
    "District ID": 1970,
    "District Name": "Crook County SD",
    "Student Enrollment": 3233.0,
    "Students with Disabilities %": 0.14,
    "Students Experiencing Poverty %": 0.34
  },
  "2089": {
    "District ID": 2089,
    "District Name": "Crow-Applegate-Lorane SD 66",
    "Student Enrollment": 295.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.34
  },
  "2050": {
    "District ID": 2050,
    "District Name": "Culver SD 4",
    "Student Enrollment": 662.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.43
  },
  "2190": {
    "District ID": 2190,
    "District Name": "Dallas SD 2",
    "Student Enrollment": 2977.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.34
  },
  "2187": {
    "District ID": 2187,
    "District Name": "David Douglas SD 40",
    "Student Enrollment": 8640.0,
    "Students with Disabilities %": 0.14,
    "Students Experiencing Poverty %": 0.5
  },
  "2253": {
    "District ID": 2253,
    "District Name": "Dayton SD 8",
    "Student Enrollment": 846.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.37
  },
  "2011": {
    "District ID": 2011,
    "District Name": "Dayville SD 16J",
    "Student Enrollment": 44.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.41
  },
  "2017": {
    "District ID": 2017,
    "District Name": "Diamond SD 7",
    "Student Enrollment": 13.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.41
  },
  "2021": {
    "District ID": 2021,
    "District Name": "Double O SD 28",
    "Student Enrollment": 5.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.41
  },
  "1993": {
    "District ID": 1993,
    "District Name": "Douglas County SD 15",
    "Student Enrollment": 218.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.39
  },
  "1991": {
    "District ID": 1991,
    "District Name": "Douglas County SD 4",
    "Student Enrollment": 5504.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.4
  },
  "2019": {
    "District ID": 2019,
    "District Name": "Drewsey SD 13",
    "Student Enrollment": 8.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.4
  },
  "2229": {
    "District ID": 2229,
    "District Name": "Dufur SD 29",
    "Student Enrollment": 349.0,
    "Students with Disabilities %": 0.21,
    "Students Experiencing Poverty %": 0.31
  },
  "2043": {
    "District ID": 2043,
    "District Name": "Eagle Point SD 9",
    "Student Enrollment": 4064.0,
    "Students with Disabilities %": 0.16,
    "Students Experiencing Poverty %": 0.46
  },
  "2203": {
    "District ID": 2203,
    "District Name": "Echo SD 5",
    "Student Enrollment": 319.0,
    "Students with Disabilities %": 0.1,
    "Students Experiencing Poverty %": 0.21
  },
  "2217": {
    "District ID": 2217,
    "District Name": "Elgin SD 23",
    "Student Enrollment": 385.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.38
  },
  "1998": {
    "District ID": 1998,
    "District Name": "Elkton SD 34",
    "Student Enrollment": 212.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.32
  },
  "2221": {
    "District ID": 2221,
    "District Name": "Enterprise SD 21",
    "Student Enrollment": 418.0,
    "Students with Disabilities %": 0.2,
    "Students Experiencing Poverty %": 0.21
  },
  "1930": {
    "District ID": 1930,
    "District Name": "Estacada SD 108",
    "Student Enrollment": 3174.0,
    "Students with Disabilities %": 0.13,
    "Students Experiencing Poverty %": 0.27
  },
  "2082": {
    "District ID": 2082,
    "District Name": "Eugene SD 4J",
    "Student Enrollment": 16000.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.29
  },
  "2193": {
    "District ID": 2193,
    "District Name": "Falls City SD 57",
    "Student Enrollment": 176.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.57
  },
  "2084": {
    "District ID": 2084,
    "District Name": "Fern Ridge SD 28J",
    "Student Enrollment": 1389.0,
    "Students with Disabilities %": 0.22,
    "Students Experiencing Poverty %": 0.33
  },
  "2241": {
    "District ID": 2241,
    "District Name": "Forest Grove SD 15",
    "Student Enrollment": 5756.0,
    "Students with Disabilities %": 0.16,
    "Students Experiencing Poverty %": 0.35
  },
  "2248": {
    "District ID": 2248,
    "District Name": "Fossil SD 21J",
    "Student Enrollment": 1933.0,
    "Students with Disabilities %": 0.08,
    "Students Experiencing Poverty %": 0.15
  },
  "2020": {
    "District ID": 2020,
    "District Name": "Frenchglen SD 16",
    "Student Enrollment": 4.0,
    "Students with Disabilities %": 0.08,
    "Students Experiencing Poverty %": 0.15
  },
  "2245": {
    "District ID": 2245,
    "District Name": "Gaston SD 511J",
    "Student Enrollment": 476.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.29
  },
  "2137": {
    "District ID": 2137,
    "District Name": "Gervais SD 1",
    "Student Enrollment": 1249.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.39
  },
  "1931": {
    "District ID": 1931,
    "District Name": "Gladstone SD 115",
    "Student Enrollment": 1545.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.25
  },
  "2000": {
    "District ID": 2000,
    "District Name": "Glendale SD 77",
    "Student Enrollment": 286.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.5
  },
  "1992": {
    "District ID": 1992,
    "District Name": "Glide SD 12",
    "Student Enrollment": 730.0,
    "Students with Disabilities %": 0.19,
    "Students Experiencing Poverty %": 0.36
  },
  "2054": {
    "District ID": 2054,
    "District Name": "Grants Pass SD 7",
    "Student Enrollment": 5550.0,
    "Students with Disabilities %": 0.16,
    "Students Experiencing Poverty %": 0.45
  },
  "2100": {
    "District ID": 2100,
    "District Name": "Greater Albany Public SD 8J",
    "Student Enrollment": 8709.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.36
  },
  "2183": {
    "District ID": 2183,
    "District Name": "Gresham-Barlow SD 10J",
    "Student Enrollment": 11464.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.38
  },
  "2014": {
    "District ID": 2014,
    "District Name": "Harney County SD 3",
    "Student Enrollment": 700.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.38
  },
  "2015": {
    "District ID": 2015,
    "District Name": "Harney County SD 4",
    "Student Enrollment": 1049.0,
    "Students with Disabilities %": 0.1,
    "Students Experiencing Poverty %": 0.18
  },
  "2023": {
    "District ID": 2023,
    "District Name": "Harney County Union High SD 1J",
    "Student Enrollment": 1174.0,
    "Students with Disabilities %": 0.07,
    "Students Experiencing Poverty %": 0.23
  },
  "2114": {
    "District ID": 2114,
    "District Name": "Harper SD 66",
    "Student Enrollment": 253.0,
    "Students with Disabilities %": 0.09,
    "Students Experiencing Poverty %": 0.36
  },
  "2099": {
    "District ID": 2099,
    "District Name": "Harrisburg SD 7J",
    "Student Enrollment": 829.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.33
  },
  "2201": {
    "District ID": 2201,
    "District Name": "Helix SD 1",
    "Student Enrollment": 181.0,
    "Students with Disabilities %": 0.11,
    "Students Experiencing Poverty %": 0.18
  },
  "2206": {
    "District ID": 2206,
    "District Name": "Hermiston SD 8",
    "Student Enrollment": 5335.0,
    "Students with Disabilities %": 0.13,
    "Students Experiencing Poverty %": 0.39
  },
  "2239": {
    "District ID": 2239,
    "District Name": "Hillsboro SD 1J",
    "Student Enrollment": 18673.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.28
  },
  "2024": {
    "District ID": 2024,
    "District Name": "Hood River County SD",
    "Student Enrollment": 3757.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.31
  },
  "1895": {
    "District ID": 1895,
    "District Name": "Huntington SD 16J",
    "Student Enrollment": 77.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.64
  },
  "2215": {
    "District ID": 2215,
    "District Name": "Imbler SD 11",
    "Student Enrollment": 308.0,
    "Students with Disabilities %": 0.11,
    "Students Experiencing Poverty %": 0.16
  },
  "3997": {
    "District ID": 3997,
    "District Name": "Ione SD R2",
    "Student Enrollment": 121.0,
    "Students with Disabilities %": 0.21,
    "Students Experiencing Poverty %": 0.27
  },
  "2053": {
    "District ID": 2053,
    "District Name": "Jefferson County SD 509J",
    "Student Enrollment": 2659.0,
    "Students with Disabilities %": 0.19,
    "Students Experiencing Poverty %": 0.55
  },
  "2140": {
    "District ID": 2140,
    "District Name": "Jefferson SD 14J",
    "Student Enrollment": 690.0,
    "Students with Disabilities %": 0.14,
    "Students Experiencing Poverty %": 0.4
  },
  "1934": {
    "District ID": 1934,
    "District Name": "Jewell SD 8",
    "Student Enrollment": 118.0,
    "Students with Disabilities %": 0.16,
    "Students Experiencing Poverty %": 0.39
  },
  "2008": {
    "District ID": 2008,
    "District Name": "John Day SD 3",
    "Student Enrollment": 462.0,
    "Students with Disabilities %": 0.2,
    "Students Experiencing Poverty %": 0.3
  },
  "2107": {
    "District ID": 2107,
    "District Name": "Jordan Valley SD 3",
    "Student Enrollment": 65.0,
    "Students with Disabilities %": 0.2,
    "Students Experiencing Poverty %": 0.3
  },
  "2219": {
    "District ID": 2219,
    "District Name": "Joseph SD 6",
    "Student Enrollment": 284.0,
    "Students with Disabilities %": 0.14,
    "Students Experiencing Poverty %": 0.35
  },
  "2091": {
    "District ID": 2091,
    "District Name": "Junction City SD 69",
    "Student Enrollment": 1585.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.35
  },
  "2109": {
    "District ID": 2109,
    "District Name": "Juntura SD 12",
    "Student Enrollment": 7.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.35
  },
  "2057": {
    "District ID": 2057,
    "District Name": "Klamath County SD",
    "Student Enrollment": 6989.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.47
  },
  "2056": {
    "District ID": 2056,
    "District Name": "Klamath Falls City Schools",
    "Student Enrollment": 2724.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.56
  },
  "2262": {
    "District ID": 2262,
    "District Name": "Knappa SD 4",
    "Student Enrollment": 433.0,
    "Students with Disabilities %": 0.25,
    "Students Experiencing Poverty %": 0.22
  },
  "2212": {
    "District ID": 2212,
    "District Name": "La Grande SD 1",
    "Student Enrollment": 1982.0,
    "Students with Disabilities %": 0.2,
    "Students Experiencing Poverty %": 0.38
  },
  "2059": {
    "District ID": 2059,
    "District Name": "Lake County SD 7",
    "Student Enrollment": 691.0,
    "Students with Disabilities %": 0.16,
    "Students Experiencing Poverty %": 0.36
  },
  "1923": {
    "District ID": 1923,
    "District Name": "Lake Oswego SD 7J",
    "Student Enrollment": 6871.0,
    "Students with Disabilities %": 0.13,
    "Students Experiencing Poverty %": 0.06
  },
  "2101": {
    "District ID": 2101,
    "District Name": "Lebanon Community SD 9",
    "Student Enrollment": 3875.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.41
  },
  "2097": {
    "District ID": 2097,
    "District Name": "Lincoln County SD",
    "Student Enrollment": 4871.0,
    "Students with Disabilities %": 0.16,
    "Students Experiencing Poverty %": 0.43
  },
  "2012": {
    "District ID": 2012,
    "District Name": "Long Creek SD 17",
    "Student Enrollment": 21.0,
    "Students with Disabilities %": 0.16,
    "Students Experiencing Poverty %": 0.57
  },
  "2092": {
    "District ID": 2092,
    "District Name": "Lowell SD 71",
    "Student Enrollment": 1034.0,
    "Students with Disabilities %": 0.13,
    "Students Experiencing Poverty %": 0.26
  },
  "2085": {
    "District ID": 2085,
    "District Name": "Mapleton SD 32",
    "Student Enrollment": 140.0,
    "Students with Disabilities %": 0.22,
    "Students Experiencing Poverty %": 0.6
  },
  "2094": {
    "District ID": 2094,
    "District Name": "Marcola SD 79J",
    "Student Enrollment": 916.0,
    "Students with Disabilities %": 0.12,
    "Students Experiencing Poverty %": 0.25
  },
  "2090": {
    "District ID": 2090,
    "District Name": "McKenzie SD 68",
    "Student Enrollment": 180.0,
    "Students with Disabilities %": 0.22,
    "Students Experiencing Poverty %": 0.45
  },
  "2256": {
    "District ID": 2256,
    "District Name": "McMinnville SD 40",
    "Student Enrollment": 6276.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.35
  },
  "2048": {
    "District ID": 2048,
    "District Name": "Medford SD 549C",
    "Student Enrollment": 13550.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.41
  },
  "2205": {
    "District ID": 2205,
    "District Name": "Milton-Freewater Unified SD 7",
    "Student Enrollment": 1512.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.45
  },
  "2249": {
    "District ID": 2249,
    "District Name": "Mitchell SD 55",
    "Student Enrollment": 1554.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.53
  },
  "1925": {
    "District ID": 1925,
    "District Name": "Molalla River SD 35",
    "Student Enrollment": 2464.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.28
  },
  "1898": {
    "District ID": 1898,
    "District Name": "Monroe SD 1J",
    "Student Enrollment": 369.0,
    "Students with Disabilities %": 0.14,
    "Students Experiencing Poverty %": 0.31
  },
  "2010": {
    "District ID": 2010,
    "District Name": "Monument SD 8",
    "Student Enrollment": 55.0,
    "Students with Disabilities %": 0.14,
    "Students Experiencing Poverty %": 0.4
  },
  "2147": {
    "District ID": 2147,
    "District Name": "Morrow SD 1",
    "Student Enrollment": 2218.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.41
  },
  "2145": {
    "District ID": 2145,
    "District Name": "Mt Angel SD 91",
    "Student Enrollment": 639.0,
    "Students with Disabilities %": 0.14,
    "Students Experiencing Poverty %": 0.33
  },
  "1968": {
    "District ID": 1968,
    "District Name": "Myrtle Point SD 41",
    "Student Enrollment": 546.0,
    "Students with Disabilities %": 0.2,
    "Students Experiencing Poverty %": 0.4
  },
  "2198": {
    "District ID": 2198,
    "District Name": "Neah-Kah-Nie SD 56",
    "Student Enrollment": 670.0,
    "Students with Disabilities %": 0.19,
    "Students Experiencing Poverty %": 0.27
  },
  "2199": {
    "District ID": 2199,
    "District Name": "Nestucca Valley SD 101J",
    "Student Enrollment": 506.0,
    "Students with Disabilities %": 0.12,
    "Students Experiencing Poverty %": 0.41
  },
  "2254": {
    "District ID": 2254,
    "District Name": "Newberg SD 29J",
    "Student Enrollment": 4027.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.27
  },
  "1966": {
    "District ID": 1966,
    "District Name": "North Bend SD 13",
    "Student Enrollment": 2940.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.41
  },
  "1924": {
    "District ID": 1924,
    "District Name": "North Clackamas SD 12",
    "Student Enrollment": 16730.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.25
  },
  "1996": {
    "District ID": 1996,
    "District Name": "North Douglas SD 22",
    "Student Enrollment": 352.0,
    "Students with Disabilities %": 0.22,
    "Students Experiencing Poverty %": 0.46
  },
  "2061": {
    "District ID": 2061,
    "District Name": "North Lake SD 14",
    "Student Enrollment": 223.0,
    "Students with Disabilities %": 0.25,
    "Students Experiencing Poverty %": 0.55
  },
  "2141": {
    "District ID": 2141,
    "District Name": "North Marion SD 15",
    "Student Enrollment": 1614.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.34
  },
  "2214": {
    "District ID": 2214,
    "District Name": "North Powder SD 8J",
    "Student Enrollment": 253.0,
    "Students with Disabilities %": 0.19,
    "Students Experiencing Poverty %": 0.36
  },
  "2143": {
    "District ID": 2143,
    "District Name": "North Santiam SD 29J",
    "Student Enrollment": 2004.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.33
  },
  "4131": {
    "District ID": 4131,
    "District Name": "North Wasco County SD 21",
    "Student Enrollment": 2764.0,
    "Students with Disabilities %": 0.16,
    "Students Experiencing Poverty %": 0.5
  },
  "2110": {
    "District ID": 2110,
    "District Name": "Nyssa SD 26",
    "Student Enrollment": 1549.0,
    "Students with Disabilities %": 0.11,
    "Students Experiencing Poverty %": 0.47
  },
  "1990": {
    "District ID": 1990,
    "District Name": "Oakland SD 1",
    "Student Enrollment": 629.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.36
  },
  "2093": {
    "District ID": 2093,
    "District Name": "Oakridge SD 76",
    "Student Enrollment": 484.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.57
  },
  "3477": {
    "District ID": 3477,
    "District Name": "ODE YCEP District",
    "Student Enrollment": 228.0,
    "Students with Disabilities %": 0.43,
    "Students Experiencing Poverty %": 0.35
  },
  "2108": {
    "District ID": 2108,
    "District Name": "Ontario SD 8C",
    "Student Enrollment": 2158.0,
    "Students with Disabilities %": 0.16,
    "Students Experiencing Poverty %": 0.65
  },
  "1928": {
    "District ID": 1928,
    "District Name": "Oregon City SD 62",
    "Student Enrollment": 7133.0,
    "Students with Disabilities %": 0.16,
    "Students Experiencing Poverty %": 0.23
  },
  "1926": {
    "District ID": 1926,
    "District Name": "Oregon Trail SD 46",
    "Student Enrollment": 4218.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.25
  },
  "2060": {
    "District ID": 2060,
    "District Name": "Paisley SD 11",
    "Student Enrollment": 201.0,
    "Students with Disabilities %": 0.13,
    "Students Experiencing Poverty %": 0.24
  },
  "2181": {
    "District ID": 2181,
    "District Name": "Parkrose SD 3",
    "Student Enrollment": 2766.0,
    "Students with Disabilities %": 0.14,
    "Students Experiencing Poverty %": 0.45
  },
  "2207": {
    "District ID": 2207,
    "District Name": "Pendleton SD 16",
    "Student Enrollment": 2881.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.42
  },
  "2192": {
    "District ID": 2192,
    "District Name": "Perrydale SD 21",
    "Student Enrollment": 317.0,
    "Students with Disabilities %": 0.11,
    "Students Experiencing Poverty %": 0.24
  },
  "1900": {
    "District ID": 1900,
    "District Name": "Philomath SD 17J",
    "Student Enrollment": 1662.0,
    "Students with Disabilities %": 0.16,
    "Students Experiencing Poverty %": 0.23
  },
  "2039": {
    "District ID": 2039,
    "District Name": "Phoenix-Talent SD 4",
    "Student Enrollment": 2230.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.53
  },
  "2202": {
    "District ID": 2202,
    "District Name": "Pilot Rock SD 2",
    "Student Enrollment": 284.0,
    "Students with Disabilities %": 0.14,
    "Students Experiencing Poverty %": 0.33
  },
  "2016": {
    "District ID": 2016,
    "District Name": "Pine Creek SD 5",
    "Student Enrollment": 2.0,
    "Students with Disabilities %": 0.14,
    "Students Experiencing Poverty %": 0.33
  },
  "1897": {
    "District ID": 1897,
    "District Name": "Pine Eagle SD 61",
    "Student Enrollment": 206.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.29
  },
  "2047": {
    "District ID": 2047,
    "District Name": "Pinehurst SD 94",
    "Student Enrollment": 5.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.29
  },
  "2081": {
    "District ID": 2081,
    "District Name": "Pleasant Hill SD 1",
    "Student Enrollment": 968.0,
    "Students with Disabilities %": 0.14,
    "Students Experiencing Poverty %": 0.24
  },
  "2062": {
    "District ID": 2062,
    "District Name": "Plush SD 18",
    "Student Enrollment": 8.0,
    "Students with Disabilities %": 0.14,
    "Students Experiencing Poverty %": 0.24
  },
  "1973": {
    "District ID": 1973,
    "District Name": "Port Orford-Langlois SD 2CJ",
    "Student Enrollment": 240.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.56
  },
  "2180": {
    "District ID": 2180,
    "District Name": "Portland SD 1J",
    "Student Enrollment": 43516.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.24
  },
  "1967": {
    "District ID": 1967,
    "District Name": "Powers SD 31",
    "Student Enrollment": 111.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.32
  },
  "2009": {
    "District ID": 2009,
    "District Name": "Prairie City SD 4",
    "Student Enrollment": 1343.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.38
  },
  "2045": {
    "District ID": 2045,
    "District Name": "Prospect SD 59",
    "Student Enrollment": 215.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.62
  },
  "1946": {
    "District ID": 1946,
    "District Name": "Rainier SD 13",
    "Student Enrollment": 801.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.36
  },
  "1977": {
    "District ID": 1977,
    "District Name": "Redmond SD 2J",
    "Student Enrollment": 6965.0,
    "Students with Disabilities %": 0.14,
    "Students Experiencing Poverty %": 0.32
  },
  "2001": {
    "District ID": 2001,
    "District Name": "Reedsport SD 105",
    "Student Enrollment": 570.0,
    "Students with Disabilities %": 0.21,
    "Students Experiencing Poverty %": 0.56
  },
  "2182": {
    "District ID": 2182,
    "District Name": "Reynolds SD 7",
    "Student Enrollment": 9597.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.51
  },
  "1999": {
    "District ID": 1999,
    "District Name": "Riddle SD 70",
    "Student Enrollment": 357.0,
    "Students with Disabilities %": 0.24,
    "Students Experiencing Poverty %": 0.5
  },
  "2188": {
    "District ID": 2188,
    "District Name": "Riverdale SD 51J",
    "Student Enrollment": 553.0,
    "Students with Disabilities %": 0.13,
    "Students Experiencing Poverty %": 0.05
  },
  "2044": {
    "District ID": 2044,
    "District Name": "Rogue River SD 35",
    "Student Enrollment": 1080.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.48
  },
  "2142": {
    "District ID": 2142,
    "District Name": "Salem-Keizer SD 24J",
    "Student Enrollment": 37851.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.41
  },
  "2104": {
    "District ID": 2104,
    "District Name": "Santiam Canyon SD 129J",
    "Student Enrollment": 3185.0,
    "Students with Disabilities %": 0.21,
    "Students Experiencing Poverty %": 0.41
  },
  "1944": {
    "District ID": 1944,
    "District Name": "Scappoose SD 1J",
    "Student Enrollment": 2241.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.21
  },
  "2103": {
    "District ID": 2103,
    "District Name": "Scio SD 95",
    "Student Enrollment": 1946.0,
    "Students with Disabilities %": 0.14,
    "Students Experiencing Poverty %": 0.35
  },
  "1935": {
    "District ID": 1935,
    "District Name": "Seaside SD 10",
    "Student Enrollment": 1438.0,
    "Students with Disabilities %": 0.16,
    "Students Experiencing Poverty %": 0.31
  },
  "2257": {
    "District ID": 2257,
    "District Name": "Sheridan SD 48J",
    "Student Enrollment": 991.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.4
  },
  "2195": {
    "District ID": 2195,
    "District Name": "Sherman County SD",
    "Student Enrollment": 271.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.27
  },
  "2244": {
    "District ID": 2244,
    "District Name": "Sherwood SD 88J",
    "Student Enrollment": 4815.0,
    "Students with Disabilities %": 0.13,
    "Students Experiencing Poverty %": 0.09
  },
  "2138": {
    "District ID": 2138,
    "District Name": "Silver Falls SD 4J",
    "Student Enrollment": 3727.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.22
  },
  "1978": {
    "District ID": 1978,
    "District Name": "Sisters SD 6",
    "Student Enrollment": 1188.0,
    "Students with Disabilities %": 0.13,
    "Students Experiencing Poverty %": 0.17
  },
  "2096": {
    "District ID": 2096,
    "District Name": "Siuslaw SD 97J",
    "Student Enrollment": 1188.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.38
  },
  "2022": {
    "District ID": 2022,
    "District Name": "South Harney SD 33",
    "Student Enrollment": 8.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.38
  },
  "2087": {
    "District ID": 2087,
    "District Name": "South Lane SD 45J3",
    "Student Enrollment": 2636.0,
    "Students with Disabilities %": 0.2,
    "Students Experiencing Poverty %": 0.39
  },
  "1994": {
    "District ID": 1994,
    "District Name": "South Umpqua SD 19",
    "Student Enrollment": 1401.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.51
  },
  "2225": {
    "District ID": 2225,
    "District Name": "South Wasco County SD 1",
    "Student Enrollment": 208.0,
    "Students with Disabilities %": 0.21,
    "Students Experiencing Poverty %": 0.39
  },
  "2247": {
    "District ID": 2247,
    "District Name": "Spray SD 1",
    "Student Enrollment": 59.0,
    "Students with Disabilities %": 0.21,
    "Students Experiencing Poverty %": 0.39
  },
  "2083": {
    "District ID": 2083,
    "District Name": "Springfield SD 19",
    "Student Enrollment": 9217.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.43
  },
  "1948": {
    "District ID": 1948,
    "District Name": "St Helens SD 502",
    "Student Enrollment": 2735.0,
    "Students with Disabilities %": 0.2,
    "Students Experiencing Poverty %": 0.34
  },
  "2144": {
    "District ID": 2144,
    "District Name": "St Paul SD 45",
    "Student Enrollment": 245.0,
    "Students with Disabilities %": 0.1,
    "Students Experiencing Poverty %": 0.31
  },
  "2209": {
    "District ID": 2209,
    "District Name": "Stanfield SD 61",
    "Student Enrollment": 497.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.36
  },
  "2018": {
    "District ID": 2018,
    "District Name": "Suntex SD 10",
    "Student Enrollment": 3.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.36
  },
  "2003": {
    "District ID": 2003,
    "District Name": "Sutherlin SD 130",
    "Student Enrollment": 1326.0,
    "Students with Disabilities %": 0.2,
    "Students Experiencing Poverty %": 0.41
  },
  "2102": {
    "District ID": 2102,
    "District Name": "Sweet Home SD 55",
    "Student Enrollment": 2251.0,
    "Students with Disabilities %": 0.19,
    "Students Experiencing Poverty %": 0.47
  },
  "2055": {
    "District ID": 2055,
    "District Name": "Three Rivers/Josephine County SD",
    "Student Enrollment": 4361.0,
    "Students with Disabilities %": 0.16,
    "Students Experiencing Poverty %": 0.53
  },
  "2242": {
    "District ID": 2242,
    "District Name": "Tigard-Tualatin SD 23J",
    "Student Enrollment": 11496.0,
    "Students with Disabilities %": 0.13,
    "Students Experiencing Poverty %": 0.24
  },
  "2197": {
    "District ID": 2197,
    "District Name": "Tillamook SD 9",
    "Student Enrollment": 2018.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.38
  },
  "2222": {
    "District ID": 2222,
    "District Name": "Troy SD 54",
    "Student Enrollment": 4.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.38
  },
  "2210": {
    "District ID": 2210,
    "District Name": "Ukiah SD 80R",
    "Student Enrollment": 31.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.58
  },
  "2204": {
    "District ID": 2204,
    "District Name": "Umatilla SD 6R",
    "Student Enrollment": 1399.0,
    "Students with Disabilities %": 0.12,
    "Students Experiencing Poverty %": 0.47
  },
  "2213": {
    "District ID": 2213,
    "District Name": "Union SD 5",
    "Student Enrollment": 370.0,
    "Students with Disabilities %": 0.14,
    "Students Experiencing Poverty %": 0.36
  },
  "2116": {
    "District ID": 2116,
    "District Name": "Vale SD 84",
    "Student Enrollment": 916.0,
    "Students with Disabilities %": 0.16,
    "Students Experiencing Poverty %": 0.36
  },
  "1947": {
    "District ID": 1947,
    "District Name": "Vernonia SD 47J",
    "Student Enrollment": 549.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.3
  },
  "2220": {
    "District ID": 2220,
    "District Name": "Wallowa SD 12",
    "Student Enrollment": 201.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.26
  },
  "1936": {
    "District ID": 1936,
    "District Name": "Warrenton-Hammond SD 30",
    "Student Enrollment": 969.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.41
  },
  "1922": {
    "District ID": 1922,
    "District Name": "West Linn-Wilsonville SD 3J",
    "Student Enrollment": 9029.0,
    "Students with Disabilities %": 0.14,
    "Students Experiencing Poverty %": 0.12
  },
  "2255": {
    "District ID": 2255,
    "District Name": "Willamina SD 30J",
    "Student Enrollment": 845.0,
    "Students with Disabilities %": 0.23,
    "Students Experiencing Poverty %": 0.45
  },
  "2002": {
    "District ID": 2002,
    "District Name": "Winston-Dillard SD 116",
    "Student Enrollment": 1268.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.45
  },
  "2146": {
    "District ID": 2146,
    "District Name": "Woodburn SD 103",
    "Student Enrollment": 5284.0,
    "Students with Disabilities %": 0.15,
    "Students Experiencing Poverty %": 0.47
  },
  "2251": {
    "District ID": 2251,
    "District Name": "Yamhill Carlton SD 1",
    "Student Enrollment": 1085.0,
    "Students with Disabilities %": 0.17,
    "Students Experiencing Poverty %": 0.22
  },
  "1997": {
    "District ID": 1997,
    "District Name": "Yoncalla SD 32",
    "Student Enrollment": 270.0,
    "Students with Disabilities %": 0.18,
    "Students Experiencing Poverty %": 0.46
  }
}
```

# src/lib/data/processData.js

```js
import * as topojson from "topojson-client"
import OregonData from "./oregon_data_24.json"

let largeDistrictCutoff = 500

let inclusiveWeight = 0.9
let semiInclusiveWeight = 0.6
let nonInclusiveWeight = 0.2
let separateWeight = 0

function weightedInclusion(district) {
    return (
        (
            ( (district["LRE Students >80%"] / 100) * district["Total Student Count"] ) * inclusiveWeight
            + ( (district["LRE Students >40% <80%"] / 100) * district["Total Student Count"] ) * semiInclusiveWeight
            + ( (district["LRE Students <40%"] / 100) * district["Total Student Count"] ) * nonInclusiveWeight
            + ( (district["LRE Students Separate Settings"] / 100) * district["Total Student Count"] ) * separateWeight
        ) / district["Total Student Count"] * 100
    )
}

function averageSeparationTime(district) {
    const separationRates = {
        inclusive: 10,      // >80% in regular classroom = ~10% separated
        semiInclusive: 40,  // 40-80% in regular classroom = ~40% separated
        nonInclusive: 80,   // <40% in regular classroom = ~80% separated
        separate: 100       // Separate settings = 100% separated
    }
    
    const totalStudents = district["Total Student Count"]
    
    if (!totalStudents || totalStudents === 0) {
        return null
    }
    
    // Verify percentages add up to ~100% (allowing for rounding)
    const totalPercentage = (district["LRE Students >80%"] || 0) + 
                           (district["LRE Students >40% <80%"] || 0) + 
                           (district["LRE Students <40%"] || 0) + 
                           (district["LRE Students Separate Settings"] || 0)
    
    if (Math.abs(totalPercentage - 100) > 5) { // Allow 5% tolerance for rounding
        console.warn(`District ${district["Institution Name"]}: LRE percentages sum to ${totalPercentage}%`)
    }
    
    // Calculate weighted average
    const weightedSeparation = (
        (district["LRE Students >80%"] || 0) * separationRates.inclusive +
        (district["LRE Students >40% <80%"] || 0) * separationRates.semiInclusive +
        (district["LRE Students <40%"] || 0) * separationRates.nonInclusive +
        (district["LRE Students Separate Settings"] || 0) * separationRates.separate
    ) / 100  // Divide by 100 since we're working with percentages directly
    
    return weightedSeparation
}

// Calculate ranks and percent more inclusive
function calculateRanks(data) {
    // Filter out districts without weighted_inclusion and sort by weighted_inclusion in descending order
    const districtsWithValues = data.filter(district => 
        district.properties.weighted_inclusion !== null && 
        district.properties.GEOID !== "999999"  // Exclude summary feature
    );
    
    const sortedDistricts = [...districtsWithValues]
        .sort((a, b) => b.properties.weighted_inclusion - a.properties.weighted_inclusion);

    const totalDistricts = sortedDistricts.length;
    let currentRank = 1;
    let currentValue = null;
    let skipCount = 0;

    sortedDistricts.forEach((district, index) => {
        if (district.properties.weighted_inclusion !== currentValue) {
            // New value encountered, assign new rank (accounting for any skipped positions)
            currentRank = index + 1;
            currentValue = district.properties.weighted_inclusion;
            skipCount = 0;
        } else {
            // Same value as previous, keep same rank and increment skip counter
            skipCount++;
        }
        
        // Find the original district in data and assign the rank and percent more inclusive
        const originalDistrict = data.find(d => d.properties.GEOID === district.properties.GEOID);
        if (originalDistrict) {
            originalDistrict.properties.rank = currentRank;
            // Calculate percent of districts this district has a higher weighted_inclusion than
            // Subtract 1 from rank to handle case where district is highest ranked (should be 100%)
            originalDistrict.properties.percent_more_inclusive = 
                Math.round(((totalDistricts - (currentRank - 1)) / totalDistricts) * 100);
        }
    });

    // Assign null values to districts without weighted_inclusion and the summary feature
    data.forEach(district => {
        if (district.properties.weighted_inclusion === null || district.properties.GEOID === "999999") {
            district.properties.rank = null;
            district.properties.percent_more_inclusive = null;
        }
    });
}

export const getData = () => {
    const objectName = "OR_SDs_merged_24"
    const geojsonData = topojson.feature(OregonData, OregonData.objects[objectName])
    let data = geojsonData.features

    const neighbors = topojson.neighbors(OregonData.objects[objectName].geometries)

    let totalStudents = 0
    let numInclusive = 0
    let numSemiInclusive = 0
    let numNonInclusive = 0
    let numSeparate = 0
    let sumHigherEdTrainingEmployed = 0
    let sumIEP4YrCohortGrad = 0
    let sumIEPDropout = 0
    const alertColumns = [
        "SuspExplFg",
        "SuspExplRaceEthnicityFg",
        "DisPrptnRprsntnFg",
        "DisPrptnRprsntnDsbltyFg"
    ]

    data.forEach((district, index) => {
        if (typeof district.properties["Total Student Count"] === "number" && !isNaN(district.properties["Total Student Count"])) {
            totalStudents += district.properties["Total Student Count"];
        }
        
        if (typeof district.properties["LRE Students >80%"] === "number" && !isNaN(district.properties["LRE Students >80%"])) {
            numInclusive += (district.properties["LRE Students >80%"] / 100) * district.properties["Total Student Count"]
        }
    
        if (typeof district.properties["LRE Students >40% <80%"] === "number" && !isNaN(district.properties["LRE Students >40% <80%"])) {
            numSemiInclusive += (district.properties["LRE Students >40% <80%"] / 100) * district.properties["Total Student Count"]
        }
    
        if (typeof district.properties["LRE Students <40%"] === "number" && !isNaN(district.properties["LRE Students <40%"])) {
            numNonInclusive += (district.properties["LRE Students <40%"] / 100) * district.properties["Total Student Count"]
        }

        if (typeof district.properties["LRE Students Separate Settings"] === "number" && !isNaN(district.properties["LRE Students Separate Settings"])) {
            numSeparate += (district.properties["LRE Students Separate Settings"] / 100) * district.properties["Total Student Count"]
        }

        if (typeof district.properties["Higher Ed/Training/Employed"] === "number" && !isNaN(district.properties["Higher Ed/Training/Employed"])) {
            sumHigherEdTrainingEmployed += (district.properties["Higher Ed/Training/Employed"] / 100) * district.properties["Total Student Count"]
        }

        if (typeof district.properties["Graduation Rate"] === "number" && !isNaN(district.properties["Graduation Rate"])) {
            sumIEP4YrCohortGrad += (district.properties["Graduation Rate"] / 100) * district.properties["Total Student Count"]
        }

        if (typeof district.properties["Dropout Rate"] === "number" && !isNaN(district.properties["Dropout Rate"])) {
            sumIEPDropout += (district.properties["Dropout Rate"] / 100) * district.properties["Total Student Count"]
        }

        // Calculate the weighted inclusion
        if (!district.properties["Total Student Count"]) {
            district.properties.weighted_inclusion = null
        } else {
            district.properties.weighted_inclusion = weightedInclusion(district.properties)
        }

        // Calculate the average separation time
        if (!district.properties["Total Student Count"]) {
            district.properties.average_separation_time = null
        } else {
            district.properties.average_separation_time = averageSeparationTime(district.properties)
        }

        // Tallying up alerts for each district
        let alertsCount = 0
        alertColumns.forEach(column => {
            if (district.properties[column] === "Yes") {
                alertsCount++
            }
        })
        // Only set nAlerts if we have alert data, otherwise set to null
        const hasAlertData = alertColumns.some(column => 
            district.properties[column] !== undefined && 
            district.properties[column] !== null
        )
        district.properties.nAlerts = hasAlertData ? alertsCount : null

        // indicate if large or small district
        if (!district.properties["Total Student Count"]) {
            district.properties.largeDistrict = false
        } else {
            if (district.properties["Total Student Count"] < largeDistrictCutoff) {
                district.properties.largeDistrict = false
            } else {
                district.properties.largeDistrict = true
            }
        }

        // Add array of neighbors
        district.properties.neighbors = neighbors[index].map(neighborIndex => {
            return data[neighborIndex] ? data[neighborIndex].properties["GEOID"] : null
        })
    })

    // Calculate ranks and percent more inclusive for all districts
    calculateRanks(data);

    // Calculate min and max weighted inclusion for large districts
    let minWeightedInclusion = Math.min(
        ...data
            .filter(district => district.properties["Total Student Count"] > 500 && district.properties.weighted_inclusion)
            .map(district => district.properties.weighted_inclusion)
    )
    let maxWeightedInclusion = Math.max(
        ...data
            .filter(district => district.properties["Total Student Count"] > 500 && district.properties.weighted_inclusion)
            .map(district => district.properties.weighted_inclusion)
    )
    let range = maxWeightedInclusion - minWeightedInclusion

    // Calculate min and max weighted inclusion for all districts
    let minWeightedInclusionAll = Math.min(
        ...data
            .filter(district => district.properties.weighted_inclusion)
            .map(district => district.properties.weighted_inclusion)
    )
    let maxWeightedInclusionAll = Math.max(
        ...data
            .filter(district => district.properties.weighted_inclusion)
            .map(district => district.properties.weighted_inclusion)
    )

    // Calculate quartiles
    const quartileThresholds = Array.from({ length: 4 }, (_, i) => minWeightedInclusion + (range * (i + 1) * 0.25))
    data.forEach(district => {
        if (!district.properties.weighted_inclusion) {
            district.properties.quartile = null
        } else {
            for (let i = 0; i < 3; i++) {
                if (district.properties.weighted_inclusion < quartileThresholds[i]) {
                    district.properties.quartile = i + 1
                    break
                }
            }
        }

        // Assign a value of 4 for the top quartile (if not already assigned)
        if (district.properties.weighted_inclusion && !district.properties.quartile) {
            district.properties.quartile = 4
        }
    })

    // Find the 3 largest districts by "Total Student Count"
    const largestDistricts = data
        .filter(district => district.properties["Total Student Count"])
        .sort((a, b) => b.properties["Total Student Count"] - a.properties["Total Student Count"])
        .slice(0, 5)
        .map(district => district.properties.GEOID)

    // Statewide data
    let summaryFeature = {
        type: "Feature",
        properties: {
            "Institution Name": "Oregon",
            GEOID: "999999",
            "Total Student Count": totalStudents,
            "LRE Students >80%": (numInclusive / totalStudents) * 100,
            "LRE Students >40% <80%": (numSemiInclusive / totalStudents) * 100,
            "LRE Students <40%": (numNonInclusive / totalStudents) * 100,
            "LRE Students Separate Settings": (numSeparate / totalStudents) * 100,
            "Higher Ed/Training/Employed": sumHigherEdTrainingEmployed / totalStudents * 100,
            "Graduation Rate": sumIEP4YrCohortGrad / totalStudents * 100,
            "Dropout Rate": sumIEPDropout / totalStudents * 100,
            "minWeightedInclusion": minWeightedInclusion,
            "maxWeightedInclusion": maxWeightedInclusion,
            "minWeightedInclusionAll": minWeightedInclusionAll,
            "maxWeightedInclusionAll": maxWeightedInclusionAll,
            "largestDistricts": largestDistricts,
            "quartileThresholds": quartileThresholds,
            "rank": null,
            "percent_more_inclusive": null
        },
        geometry: null
    }
    data.push(summaryFeature)

    return data
        .sort((a, b) => {
            if (!a.properties["Institution Name"] && !b.properties["Institution Name"]) return 0
            if (!a.properties["Institution Name"]) return 1
            if (!b.properties["Institution Name"]) return -1
            return a.properties["Institution Name"].localeCompare(b.properties["Institution Name"])
        })
}
```

# src/lib/data/small_schools_expanded.json

```json
[
  {
    "School": "Boeckman Creek Primary School",
    "School Year": "2023-2024",
    "Total School Enrollment": 470.0,
    "Per Pupil Spending": "$16935",
    "Economically Disadvantaged %": "22.2%",
    "Students w/Disabilities %": "16%",
    "ELA Proficient & Above %": "54%",
    "Math Proficient & Above %": "48%"
  },
  {
    "School": "Bolton Primary School",
    "School Year": "2023-2024",
    "Total School Enrollment": 236.0,
    "Per Pupil Spending": "$21306",
    "Economically Disadvantaged %": "6.7%",
    "Students w/Disabilities %": "16%",
    "ELA Proficient & Above %": "80%",
    "Math Proficient & Above %": "74%"
  },
  {
    "School": "Boones Ferry Primary School",
    "School Year": "2023-2024",
    "Total School Enrollment": 475.0,
    "Per Pupil Spending": "$18367",
    "Economically Disadvantaged %": "25.9%",
    "Students w/Disabilities %": "15%",
    "ELA Proficient & Above %": "41%",
    "Math Proficient & Above %": "37%"
  },
  {
    "School": "Cedaroak Park Primary School",
    "School Year": "2023-2024",
    "Total School Enrollment": 336.0,
    "Per Pupil Spending": "$17304",
    "Economically Disadvantaged %": "11.1%",
    "Students w/Disabilities %": "14%",
    "ELA Proficient & Above %": "66%",
    "Math Proficient & Above %": "72%"
  },
  {
    "School": "Lowrie Primary School",
    "School Year": "2023-2024",
    "Total School Enrollment": 460.0,
    "Per Pupil Spending": "$16388",
    "Economically Disadvantaged %": "17.0%",
    "Students w/Disabilities %": "11%",
    "ELA Proficient & Above %": "56%",
    "Math Proficient & Above %": "55%"
  },
  {
    "School": "Stafford Primary School",
    "School Year": "2023-2024",
    "Total School Enrollment": 346.0,
    "Per Pupil Spending": "$16759",
    "Economically Disadvantaged %": "3.2%",
    "Students w/Disabilities %": "14%",
    "ELA Proficient & Above %": "69%",
    "Math Proficient & Above %": "69%"
  },
  {
    "School": "Sunset Primary School",
    "School Year": "2023-2024",
    "Total School Enrollment": 380.0,
    "Per Pupil Spending": "$16951",
    "Economically Disadvantaged %": "9.9%",
    "Students w/Disabilities %": "20%",
    "ELA Proficient & Above %": "66%",
    "Math Proficient & Above %": "61%"
  },
  {
    "School": "Trillium Creek Primary School",
    "School Year": "2023-2024",
    "Total School Enrollment": 491.0,
    "Per Pupil Spending": "$16018",
    "Economically Disadvantaged %": "4.7%",
    "Students w/Disabilities %": "13%",
    "ELA Proficient & Above %": "64%",
    "Math Proficient & Above %": "62%"
  },
  {
    "School": "Willamette Primary School",
    "School Year": "2023-2024",
    "Total School Enrollment": 388.0,
    "Per Pupil Spending": "$16786",
    "Economically Disadvantaged %": "13.1%",
    "Students w/Disabilities %": "18%",
    "ELA Proficient & Above %": "70%",
    "Math Proficient & Above %": "68%"
  },
  {
    "School": "Boeckman Creek Primary School",
    "School Year": "2022-2023",
    "Total School Enrollment": 472.0,
    "Per Pupil Spending": "$16935",
    "Economically Disadvantaged %": "25.6%",
    "Students w/Disabilities %": "16%",
    "ELA Proficient & Above %": "51%",
    "Math Proficient & Above %": "42%"
  },
  {
    "School": "Bolton Primary School",
    "School Year": "2022-2023",
    "Total School Enrollment": 216.0,
    "Per Pupil Spending": "$21306",
    "Economically Disadvantaged %": "9.9%",
    "Students w/Disabilities %": "18%",
    "ELA Proficient & Above %": "73%",
    "Math Proficient & Above %": "69%"
  },
  {
    "School": "Boones Ferry Primary School",
    "School Year": "2022-2023",
    "Total School Enrollment": 497.0,
    "Per Pupil Spending": "$18367",
    "Economically Disadvantaged %": "32.6%",
    "Students w/Disabilities %": "16%",
    "ELA Proficient & Above %": "48%",
    "Math Proficient & Above %": "43%"
  },
  {
    "School": "Cedaroak Park Primary School",
    "School Year": "2022-2023",
    "Total School Enrollment": 336.0,
    "Per Pupil Spending": "$17304",
    "Economically Disadvantaged %": "8.7%",
    "Students w/Disabilities %": "16%",
    "ELA Proficient & Above %": "67%",
    "Math Proficient & Above %": "62%"
  },
  {
    "School": "Lowrie Primary School",
    "School Year": "2022-2023",
    "Total School Enrollment": 476.0,
    "Per Pupil Spending": "$16388",
    "Economically Disadvantaged %": "21.1%",
    "Students w/Disabilities %": "10%",
    "ELA Proficient & Above %": "59%",
    "Math Proficient & Above %": "54%"
  },
  {
    "School": "Stafford Primary School",
    "School Year": "2022-2023",
    "Total School Enrollment": 355.0,
    "Per Pupil Spending": "$16759",
    "Economically Disadvantaged %": "6.8%",
    "Students w/Disabilities %": "15%",
    "ELA Proficient & Above %": "65%",
    "Math Proficient & Above %": "70%"
  },
  {
    "School": "Sunset Primary School",
    "School Year": "2022-2023",
    "Total School Enrollment": 371.0,
    "Per Pupil Spending": "$16951",
    "Economically Disadvantaged %": "10.4%",
    "Students w/Disabilities %": "19%",
    "ELA Proficient & Above %": "66%",
    "Math Proficient & Above %": "58%"
  },
  {
    "School": "Trillium Creek Primary School",
    "School Year": "2022-2023",
    "Total School Enrollment": 470.0,
    "Per Pupil Spending": "$16018",
    "Economically Disadvantaged %": "5.6%",
    "Students w/Disabilities %": "12%",
    "ELA Proficient & Above %": "68%",
    "Math Proficient & Above %": "62%"
  },
  {
    "School": "Willamette Primary School",
    "School Year": "2022-2023",
    "Total School Enrollment": 425.0,
    "Per Pupil Spending": "$16786",
    "Economically Disadvantaged %": "13.8%",
    "Students w/Disabilities %": "18%",
    "ELA Proficient & Above %": "62%",
    "Math Proficient & Above %": "47%"
  },
  {
    "School": "Boeckman Creek Primary School",
    "School Year": "2021-2022",
    "Total School Enrollment": 459,
    "Per Pupil Spending": "$14529",
    "Economically Disadvantaged %": "28%",
    "Students w/Disabilities %": "14%",
    "ELA Proficient & Above %": "46%",
    "Math Proficient & Above %": "42%"
  },
  {
    "School": "Bolton Primary School",
    "School Year": "2021-2022",
    "Total School Enrollment": 243,
    "Per Pupil Spending": "$19622",
    "Economically Disadvantaged %": "11%",
    "Students w/Disabilities %": "12%",
    "ELA Proficient & Above %": "79%",
    "Math Proficient & Above %": "67%"
  },
  {
    "School": "Boones Ferry Primary School",
    "School Year": "2021-2022",
    "Total School Enrollment": 492,
    "Per Pupil Spending": "$15566",
    "Economically Disadvantaged %": "32%",
    "Students w/Disabilities %": "15%",
    "ELA Proficient & Above %": "37%",
    "Math Proficient & Above %": "34%"
  },
  {
    "School": "Cedaroak Park Primary School",
    "School Year": "2021-2022",
    "Total School Enrollment": 345,
    "Per Pupil Spending": "$14918",
    "Economically Disadvantaged %": "9%",
    "Students w/Disabilities %": "11%",
    "ELA Proficient & Above %": "67%",
    "Math Proficient & Above %": "62%"
  },
  {
    "School": "Lowrie Primary School",
    "School Year": "2021-2022",
    "Total School Enrollment": 473,
    "Per Pupil Spending": "$14708",
    "Economically Disadvantaged %": "21%",
    "Students w/Disabilities %": "9%",
    "ELA Proficient & Above %": "59%",
    "Math Proficient & Above %": "53%"
  },
  {
    "School": "Stafford Primary School",
    "School Year": "2021-2022",
    "Total School Enrollment": 360,
    "Per Pupil Spending": "$14969",
    "Economically Disadvantaged %": "7%",
    "Students w/Disabilities %": "13%",
    "ELA Proficient & Above %": "63%",
    "Math Proficient & Above %": "67%"
  },
  {
    "School": "Sunset Primary School",
    "School Year": "2021-2022",
    "Total School Enrollment": 367,
    "Per Pupil Spending": "$15387",
    "Economically Disadvantaged %": "10%",
    "Students w/Disabilities %": "14%",
    "ELA Proficient & Above %": "69%",
    "Math Proficient & Above %": "63%"
  },
  {
    "School": "Trillium Creek Primary School",
    "School Year": "2021-2022",
    "Total School Enrollment": 462,
    "Per Pupil Spending": "$14430",
    "Economically Disadvantaged %": "7%",
    "Students w/Disabilities %": "10%",
    "ELA Proficient & Above %": "73%",
    "Math Proficient & Above %": "64%"
  },
  {
    "School": "Willamette Primary School",
    "School Year": "2021-2022",
    "Total School Enrollment": 424,
    "Per Pupil Spending": "$14599",
    "Economically Disadvantaged %": "16%",
    "Students w/Disabilities %": "15%",
    "ELA Proficient & Above %": "56%",
    "Math Proficient & Above %": "48%"
  },
  {
    "School": "Boeckman Creek Primary School",
    "School Year": "2018-2019",
    "Total School Enrollment": 545,
    "Per Pupil Spending": "$",
    "Per Pupil Spending Data Source": "",
    "Economically Disadvantaged %": "33%",
    "Economically Diadvantaged Data Source": "RCmediaSchoolsAggregate",
    "Students w/Disabilities %": "15%",
    "ELA Proficient & Above %": "63%",
    "Math Proficient & Above %": "58%"
  },
  {
    "School": "Bolton Primary School",
    "School Year": "2018-2019",
    "Total School Enrollment": 348,
    "Per Pupil Spending": "$",
    "Per Pupil Spending Data Source": "",
    "Economically Disadvantaged %": "13%",
    "Economically Diadvantaged Data Source": "RCmediaSchoolsAggregate",
    "Students w/Disabilities %": "11%",
    "ELA Proficient & Above %": "75%",
    "Math Proficient & Above %": "60%"
  },
  {
    "School": "Boones Ferry Primary School",
    "School Year": "2018-2019",
    "Total School Enrollment": 623,
    "Per Pupil Spending": "$",
    "Per Pupil Spending Data Source": "",
    "Economically Disadvantaged %": "37%",
    "Economically Diadvantaged Data Source": "RCmediaSchoolsAggregate",
    "Students w/Disabilities %": "14%",
    "ELA Proficient & Above %": "60%",
    "Math Proficient & Above %": "49%"
  },
  {
    "School": "Cedaroak Park Primary School",
    "School Year": "2018-2019",
    "Total School Enrollment": 287,
    "Per Pupil Spending": "$",
    "Per Pupil Spending Data Source": "",
    "Economically Disadvantaged %": "8%",
    "Economically Diadvantaged Data Source": "RCmediaSchoolsAggregate",
    "Students w/Disabilities %": "17%",
    "ELA Proficient & Above %": "76%",
    "Math Proficient & Above %": "66%"
  },
  {
    "School": "Lowrie Primary School",
    "School Year": "2018-2019",
    "Total School Enrollment": 551,
    "Per Pupil Spending": "$",
    "Per Pupil Spending Data Source": "",
    "Economically Disadvantaged %": "24%",
    "Economically Diadvantaged Data Source": "RCmediaSchoolsAggregate",
    "Students w/Disabilities %": "11%",
    "ELA Proficient & Above %": "64%",
    "Math Proficient & Above %": "55%"
  },
  {
    "School": "Stafford Primary School",
    "School Year": "2018-2019",
    "Total School Enrollment": 433,
    "Per Pupil Spending": "$",
    "Per Pupil Spending Data Source": "",
    "Economically Disadvantaged %": "10%",
    "Economically Diadvantaged Data Source": "RCmediaSchoolsAggregate",
    "Students w/Disabilities %": "16%",
    "ELA Proficient & Above %": "74%",
    "Math Proficient & Above %": "65%"
  },
  {
    "School": "Sunset Primary School",
    "School Year": "2018-2019",
    "Total School Enrollment": 347,
    "Per Pupil Spending": "$",
    "Per Pupil Spending Data Source": "",
    "Economically Disadvantaged %": "13%",
    "Economically Diadvantaged Data Source": "RCmediaSchoolsAggregate",
    "Students w/Disabilities %": "12%",
    "ELA Proficient & Above %": "78%",
    "Math Proficient & Above %": "73%"
  },
  {
    "School": "Trillium Creek Primary School",
    "School Year": "2018-2019",
    "Total School Enrollment": 582,
    "Per Pupil Spending": "$",
    "Per Pupil Spending Data Source": "",
    "Economically Disadvantaged %": "6%",
    "Economically Diadvantaged Data Source": "RCmediaSchoolsAggregate",
    "Students w/Disabilities %": "11%",
    "ELA Proficient & Above %": "78%",
    "Math Proficient & Above %": "69%"
  },
  {
    "School": "Willamette Primary School",
    "School Year": "2018-2019",
    "Total School Enrollment": 525,
    "Per Pupil Spending": "$",
    "Per Pupil Spending Data Source": "",
    "Economically Disadvantaged %": "15%",
    "Economically Diadvantaged Data Source": "RCmediaSchoolsAggregate",
    "Students w/Disabilities %": "14%",
    "ELA Proficient & Above %": "76%",
    "Math Proficient & Above %": "67%"
  },
  {
    "School": "Boeckman Creek Primary School",
    "School Year": "2017-2018",
    "Total School Enrollment": 522,
    "Per Pupil Spending": "$x",
    "Per Pupil Spending Data Source": "",
    "Economically Disadvantaged %": "32%",
    "Economically Diadvantaged Data Source": "RCmediaSchoolsAggregate",
    "Students w/Disabilities %": "15%",
    "ELA Proficient & Above %": "59%",
    "Math Proficient & Above %": "52%"
  },
  {
    "School": "Bolton Primary School",
    "School Year": "2017-2018",
    "Total School Enrollment": 378,
    "Per Pupil Spending": "$x",
    "Per Pupil Spending Data Source": "",
    "Economically Disadvantaged %": "11%",
    "Economically Diadvantaged Data Source": "RCmediaSchoolsAggregate",
    "Students w/Disabilities %": "10%",
    "ELA Proficient & Above %": "80%",
    "Math Proficient & Above %": "69%"
  },
  {
    "School": "Boones Ferry Primary School",
    "School Year": "2017-2018",
    "Total School Enrollment": 597,
    "Per Pupil Spending": "$x",
    "Per Pupil Spending Data Source": "",
    "Economically Disadvantaged %": "38%",
    "Economically Diadvantaged Data Source": "RCmediaSchoolsAggregate",
    "Students w/Disabilities %": "15%",
    "ELA Proficient & Above %": "62%",
    "Math Proficient & Above %": "49%"
  },
  {
    "School": "Cedaroak Park Primary School",
    "School Year": "2017-2018",
    "Total School Enrollment": 291,
    "Per Pupil Spending": "$x",
    "Per Pupil Spending Data Source": "",
    "Economically Disadvantaged %": "10%",
    "Economically Diadvantaged Data Source": "RCmediaSchoolsAggregate",
    "Students w/Disabilities %": "15%",
    "ELA Proficient & Above %": "71%",
    "Math Proficient & Above %": "64%"
  },
  {
    "School": "Lowrie Primary School",
    "School Year": "2017-2018",
    "Total School Enrollment": 573,
    "Per Pupil Spending": "$x",
    "Per Pupil Spending Data Source": "",
    "Economically Disadvantaged %": "27%",
    "Economically Diadvantaged Data Source": "RCmediaSchoolsAggregate",
    "Students w/Disabilities %": "13%",
    "ELA Proficient & Above %": "66%",
    "Math Proficient & Above %": "61%"
  },
  {
    "School": "Stafford Primary School",
    "School Year": "2017-2018",
    "Total School Enrollment": 451,
    "Per Pupil Spending": "$x",
    "Per Pupil Spending Data Source": "",
    "Economically Disadvantaged %": "6%",
    "Economically Diadvantaged Data Source": "RCmediaSchoolsAggregate",
    "Students w/Disabilities %": "13%",
    "ELA Proficient & Above %": "77%",
    "Math Proficient & Above %": "70%"
  },
  {
    "School": "Sunset Primary School",
    "School Year": "2017-2018",
    "Total School Enrollment": 329,
    "Per Pupil Spending": "$x",
    "Per Pupil Spending Data Source": "",
    "Economically Disadvantaged %": "16%",
    "Economically Diadvantaged Data Source": "RCmediaSchoolsAggregate",
    "Students w/Disabilities %": "12%",
    "ELA Proficient & Above %": "80%",
    "Math Proficient & Above %": "82%"
  },
  {
    "School": "Trillium Creek Primary School",
    "School Year": "2017-2018",
    "Total School Enrollment": 609,
    "Per Pupil Spending": "$x",
    "Per Pupil Spending Data Source": "",
    "Economically Disadvantaged %": "6%",
    "Economically Diadvantaged Data Source": "RCmediaSchoolsAggregate",
    "Students w/Disabilities %": "10%",
    "ELA Proficient & Above %": "77%",
    "Math Proficient & Above %": "75%"
  },
  {
    "School": "Willamette Primary School",
    "School Year": "2017-2018",
    "Total School Enrollment": 562,
    "Per Pupil Spending": "$x",
    "Per Pupil Spending Data Source": "",
    "Economically Disadvantaged %": "16%",
    "Economically Diadvantaged Data Source": "RCmediaSchoolsAggregate",
    "Students w/Disabilities %": "12%",
    "ELA Proficient & Above %": "73%",
    "Math Proficient & Above %": "66%"
  },
  {
    "School": "Boeckman Creek Primary School",
    "School Year": "2016-2017",
    "Total School Enrollment": 508,
    "Per Pupil Spending": "$",
    "Per Pupil Spending Data Source": "",
    "Economically Disadvantaged %": "33%",
    "Economically Diadvantaged Data Source": "RCmediaSchoolsAggregate",
    "Students w/Disabilities %": "14%",
    "ELA Proficient & Above %": "64.9%",
    "Math Proficient & Above %": "61.7%"
  },
  {
    "School": "Bolton Primary School",
    "School Year": "2016-2017",
    "Total School Enrollment": 386,
    "Per Pupil Spending": "$",
    "Per Pupil Spending Data Source": "",
    "Economically Disadvantaged %": "13%",
    "Economically Diadvantaged Data Source": "RCmediaSchoolsAggregate",
    "Students w/Disabilities %": "10%",
    "ELA Proficient & Above %": "82.8%",
    "Math Proficient & Above %": "70.4%"
  },
  {
    "School": "Boones Ferry Primary School",
    "School Year": "2016-2017",
    "Total School Enrollment": 559,
    "Per Pupil Spending": "$",
    "Per Pupil Spending Data Source": "",
    "Economically Disadvantaged %": "40%",
    "Economically Diadvantaged Data Source": "RCmediaSchoolsAggregate",
    "Students w/Disabilities %": "14%",
    "ELA Proficient & Above %": "61.8%",
    "Math Proficient & Above %": "53.2%"
  },
  {
    "School": "Cedaroak Park Primary School",
    "School Year": "2016-2017",
    "Total School Enrollment": 309,
    "Per Pupil Spending": "$",
    "Per Pupil Spending Data Source": "",
    "Economically Disadvantaged %": "17%",
    "Economically Diadvantaged Data Source": "RCmediaSchoolsAggregate",
    "Students w/Disabilities %": "12%",
    "ELA Proficient & Above %": "71.3%",
    "Math Proficient & Above %": "66.5%"
  },
  {
    "School": "Lowrie Primary School",
    "School Year": "2016-2017",
    "Total School Enrollment": 562,
    "Per Pupil Spending": "$",
    "Per Pupil Spending Data Source": "",
    "Economically Disadvantaged %": "32%",
    "Economically Diadvantaged Data Source": "RCmediaSchoolsAggregate",
    "Students w/Disabilities %": "12%",
    "ELA Proficient & Above %": "61.1%",
    "Math Proficient & Above %": "54.8%"
  },
  {
    "School": "Stafford Primary School",
    "School Year": "2016-2017",
    "Total School Enrollment": 449,
    "Per Pupil Spending": "$",
    "Per Pupil Spending Data Source": "",
    "Economically Disadvantaged %": "8%",
    "Economically Diadvantaged Data Source": "RCmediaSchoolsAggregate",
    "Students w/Disabilities %": "10%",
    "ELA Proficient & Above %": "78.8%",
    "Math Proficient & Above %": "68.2%"
  },
  {
    "School": "Sunset Primary School",
    "School Year": "2016-2017",
    "Total School Enrollment": 326,
    "Per Pupil Spending": "$",
    "Per Pupil Spending Data Source": "",
    "Economically Disadvantaged %": "21%",
    "Economically Diadvantaged Data Source": "RCmediaSchoolsAggregate",
    "Students w/Disabilities %": "9%",
    "ELA Proficient & Above %": "80.1%",
    "Math Proficient & Above %": "71.3%"
  },
  {
    "School": "Trillium Creek Primary School",
    "School Year": "2016-2017",
    "Total School Enrollment": 612,
    "Per Pupil Spending": "$",
    "Per Pupil Spending Data Source": "",
    "Economically Disadvantaged %": "8%",
    "Economically Diadvantaged Data Source": "RCmediaSchoolsAggregate",
    "Students w/Disabilities %": "9%",
    "ELA Proficient & Above %": "73.4%",
    "Math Proficient & Above %": "65.2%"
  },
  {
    "School": "Willamette Primary School",
    "School Year": "2016-2017",
    "Total School Enrollment": 571,
    "Per Pupil Spending": "$",
    "Per Pupil Spending Data Source": "",
    "Economically Disadvantaged %": "13%",
    "Economically Diadvantaged Data Source": "RCmediaSchoolsAggregate",
    "Students w/Disabilities %": "10%",
    "ELA Proficient & Above %": "79.8%",
    "Math Proficient & Above %": "75.5%"
  }
]
```

# src/lib/data/small_schools.json

```json
[
  {
    "School": "Boeckman Creek Primary School",
    "School Year": "2023-2024",
    "Total School Enrollment": 470.0,
    "Per Pupil Spending": "$16935",
    "Economically Disadvantaged %": "22.2%",
    "Students w/Disabilities %": "16%",
    "ELA Proficient & Above %": "54%",
    "Math Proficient & Above %": "48%"
  },
  {
    "School": "Bolton Primary School",
    "School Year": "2023-2024",
    "Total School Enrollment": 236.0,
    "Per Pupil Spending": "$21306",
    "Economically Disadvantaged %": "6.7%",
    "Students w/Disabilities %": "16%",
    "ELA Proficient & Above %": "80%",
    "Math Proficient & Above %": "74%"
  },
  {
    "School": "Boones Ferry Primary School",
    "School Year": "2023-2024",
    "Total School Enrollment": 475.0,
    "Per Pupil Spending": "$18367",
    "Economically Disadvantaged %": "25.9%",
    "Students w/Disabilities %": "15%",
    "ELA Proficient & Above %": "41%",
    "Math Proficient & Above %": "37%"
  },
  {
    "School": "Cedaroak Park Primary School",
    "School Year": "2023-2024",
    "Total School Enrollment": 336.0,
    "Per Pupil Spending": "$17304",
    "Economically Disadvantaged %": "11.1%",
    "Students w/Disabilities %": "14%",
    "ELA Proficient & Above %": "66%",
    "Math Proficient & Above %": "72%"
  },
  {
    "School": "Lowrie Primary School",
    "School Year": "2023-2024",
    "Total School Enrollment": 460.0,
    "Per Pupil Spending": "$16388",
    "Economically Disadvantaged %": "17.0%",
    "Students w/Disabilities %": "11%",
    "ELA Proficient & Above %": "56%",
    "Math Proficient & Above %": "55%"
  },
  {
    "School": "Stafford Primary School",
    "School Year": "2023-2024",
    "Total School Enrollment": 346.0,
    "Per Pupil Spending": "$16759",
    "Economically Disadvantaged %": "3.2%",
    "Students w/Disabilities %": "14%",
    "ELA Proficient & Above %": "69%",
    "Math Proficient & Above %": "69%"
  },
  {
    "School": "Sunset Primary School",
    "School Year": "2023-2024",
    "Total School Enrollment": 380.0,
    "Per Pupil Spending": "$16951",
    "Economically Disadvantaged %": "9.9%",
    "Students w/Disabilities %": "20%",
    "ELA Proficient & Above %": "66%",
    "Math Proficient & Above %": "61%"
  },
  {
    "School": "Trillium Creek Primary School",
    "School Year": "2023-2024",
    "Total School Enrollment": 491.0,
    "Per Pupil Spending": "$16018",
    "Economically Disadvantaged %": "4.7%",
    "Students w/Disabilities %": "13%",
    "ELA Proficient & Above %": "64%",
    "Math Proficient & Above %": "62%"
  },
  {
    "School": "Willamette Primary School",
    "School Year": "2023-2024",
    "Total School Enrollment": 388.0,
    "Per Pupil Spending": "$16786",
    "Economically Disadvantaged %": "13.1%",
    "Students w/Disabilities %": "18%",
    "ELA Proficient & Above %": "70%",
    "Math Proficient & Above %": "68%"
  },
  {
    "School": "Boeckman Creek Primary School",
    "School Year": "2022-2023",
    "Total School Enrollment": 472.0,
    "Per Pupil Spending": "$16935",
    "Economically Disadvantaged %": "25.6%",
    "Students w/Disabilities %": "16%",
    "ELA Proficient & Above %": "51%",
    "Math Proficient & Above %": "42%"
  },
  {
    "School": "Bolton Primary School",
    "School Year": "2022-2023",
    "Total School Enrollment": 216.0,
    "Per Pupil Spending": "$21306",
    "Economically Disadvantaged %": "9.9%",
    "Students w/Disabilities %": "18%",
    "ELA Proficient & Above %": "73%",
    "Math Proficient & Above %": "69%"
  },
  {
    "School": "Boones Ferry Primary School",
    "School Year": "2022-2023",
    "Total School Enrollment": 497.0,
    "Per Pupil Spending": "$18367",
    "Economically Disadvantaged %": "32.6%",
    "Students w/Disabilities %": "16%",
    "ELA Proficient & Above %": "48%",
    "Math Proficient & Above %": "43%"
  },
  {
    "School": "Cedaroak Park Primary School",
    "School Year": "2022-2023",
    "Total School Enrollment": 336.0,
    "Per Pupil Spending": "$17304",
    "Economically Disadvantaged %": "8.7%",
    "Students w/Disabilities %": "16%",
    "ELA Proficient & Above %": "67%",
    "Math Proficient & Above %": "62%"
  },
  {
    "School": "Lowrie Primary School",
    "School Year": "2022-2023",
    "Total School Enrollment": 476.0,
    "Per Pupil Spending": "$16388",
    "Economically Disadvantaged %": "21.1%",
    "Students w/Disabilities %": "10%",
    "ELA Proficient & Above %": "59%",
    "Math Proficient & Above %": "54%"
  },
  {
    "School": "Stafford Primary School",
    "School Year": "2022-2023",
    "Total School Enrollment": 355.0,
    "Per Pupil Spending": "$16759",
    "Economically Disadvantaged %": "6.8%",
    "Students w/Disabilities %": "15%",
    "ELA Proficient & Above %": "65%",
    "Math Proficient & Above %": "70%"
  },
  {
    "School": "Sunset Primary School",
    "School Year": "2022-2023",
    "Total School Enrollment": 371.0,
    "Per Pupil Spending": "$16951",
    "Economically Disadvantaged %": "10.4%",
    "Students w/Disabilities %": "19%",
    "ELA Proficient & Above %": "66%",
    "Math Proficient & Above %": "58%"
  },
  {
    "School": "Trillium Creek Primary School",
    "School Year": "2022-2023",
    "Total School Enrollment": 470.0,
    "Per Pupil Spending": "$16018",
    "Economically Disadvantaged %": "5.6%",
    "Students w/Disabilities %": "12%",
    "ELA Proficient & Above %": "68%",
    "Math Proficient & Above %": "62%"
  },
  {
    "School": "Willamette Primary School",
    "School Year": "2022-2023",
    "Total School Enrollment": 425.0,
    "Per Pupil Spending": "$16786",
    "Economically Disadvantaged %": "13.8%",
    "Students w/Disabilities %": "18%",
    "ELA Proficient & Above %": "62%",
    "Math Proficient & Above %": "47%"
  },
  {
    "School": "Boeckman Creek Primary School",
    "School Year": "2021-2022",
    "Total School Enrollment": 459,
    "Per Pupil Spending": "$14529",
    "Economically Disadvantaged %": "28%",
    "Students w/Disabilities %": "14%",
    "ELA Proficient & Above %": "46%",
    "Math Proficient & Above %": "42%"
  },
  {
    "School": "Bolton Primary School",
    "School Year": "2021-2022",
    "Total School Enrollment": 243,
    "Per Pupil Spending": "$19622",
    "Economically Disadvantaged %": "11%",
    "Students w/Disabilities %": "12%",
    "ELA Proficient & Above %": "79%",
    "Math Proficient & Above %": "67%"
  },
  {
    "School": "Boones Ferry Primary School",
    "School Year": "2021-2022",
    "Total School Enrollment": 492,
    "Per Pupil Spending": "$15566",
    "Economically Disadvantaged %": "32%",
    "Students w/Disabilities %": "15%",
    "ELA Proficient & Above %": "37%",
    "Math Proficient & Above %": "34%"
  },
  {
    "School": "Cedaroak Park Primary School",
    "School Year": "2021-2022",
    "Total School Enrollment": 345,
    "Per Pupil Spending": "$14918",
    "Economically Disadvantaged %": "9%",
    "Students w/Disabilities %": "11%",
    "ELA Proficient & Above %": "67%",
    "Math Proficient & Above %": "62%"
  },
  {
    "School": "Lowrie Primary School",
    "School Year": "2021-2022",
    "Total School Enrollment": 473,
    "Per Pupil Spending": "$14708",
    "Economically Disadvantaged %": "21%",
    "Students w/Disabilities %": "9%",
    "ELA Proficient & Above %": "59%",
    "Math Proficient & Above %": "53%"
  },
  {
    "School": "Stafford Primary School",
    "School Year": "2021-2022",
    "Total School Enrollment": 360,
    "Per Pupil Spending": "$14969",
    "Economically Disadvantaged %": "7%",
    "Students w/Disabilities %": "13%",
    "ELA Proficient & Above %": "63%",
    "Math Proficient & Above %": "67%"
  },
  {
    "School": "Sunset Primary School",
    "School Year": "2021-2022",
    "Total School Enrollment": 367,
    "Per Pupil Spending": "$15387",
    "Economically Disadvantaged %": "10%",
    "Students w/Disabilities %": "14%",
    "ELA Proficient & Above %": "69%",
    "Math Proficient & Above %": "63%"
  },
  {
    "School": "Trillium Creek Primary School",
    "School Year": "2021-2022",
    "Total School Enrollment": 462,
    "Per Pupil Spending": "$14430",
    "Economically Disadvantaged %": "7%",
    "Students w/Disabilities %": "10%",
    "ELA Proficient & Above %": "73%",
    "Math Proficient & Above %": "64%"
  },
  {
    "School": "Willamette Primary School",
    "School Year": "2021-2022",
    "Total School Enrollment": 424,
    "Per Pupil Spending": "$14599",
    "Economically Disadvantaged %": "16%",
    "Students w/Disabilities %": "15%",
    "ELA Proficient & Above %": "56%",
    "Math Proficient & Above %": "48%"
  }
]
```

# src/lib/images/about.jpg

This is a binary file of the type: Image

# src/lib/index.js

```js
// place files you want to import through the `$lib` alias in this folder.

```

# src/lib/stores/quartileRanges.js

```js
import { derived } from 'svelte/store';
import { data } from '$lib/stores/stores.js';

function calculateQuartileRanges(data) {
  // Initialize an object to store min and max values for each quartile
  const quartileRanges = {
    1: { min: Infinity, max: -Infinity },
    2: { min: Infinity, max: -Infinity },
    3: { min: Infinity, max: -Infinity },
    4: { min: Infinity, max: -Infinity }
  };

  // Iterate through the data
  data.forEach(item => {
    const quartile = item.properties.quartile;
    const inclusion = item.properties.weighted_inclusion;

    // Skip if quartile or weighted_inclusion is null or undefined
    if (quartile == null || inclusion == null) return;

    // Update min and max for the corresponding quartile
    quartileRanges[quartile].min = Math.min(quartileRanges[quartile].min, inclusion);
    quartileRanges[quartile].max = Math.max(quartileRanges[quartile].max, inclusion);
  });

  // Convert the object to an array
  return Object.entries(quartileRanges).map(([quartile, range]) => ({
    quartile: parseInt(quartile),
    min: range.min,
    max: range.max
  }));
}

// Create a derived store for quartile ranges
export const quartileRanges = derived(data, $data => calculateQuartileRanges($data));
```

# src/lib/stores/stores.js

```js
// src/lib/stores/stores.js

import { readable, writable, derived } from 'svelte/store'
import { getData } from "$lib/data/processData.js"

export const data = readable(getData())

export const hideSmallDistricts = writable(false)

// statewide data
export const stateData = derived(data, $data => $data.filter(d => d.properties.GEOID === '999999'))
export const minWeightedInclusion = derived(stateData, $stateData => $stateData[0].properties.minWeightedInclusion)
export const maxWeightedInclusion = derived(stateData, $stateData => $stateData[0].properties.maxWeightedInclusion)

// Array for multiple district selections
export const selectedDistricts = writable(["4110040"])

// Array of data for all selected districts
export const selectedDistrictsData = derived([selectedDistricts, data], ([$selectedDistricts, $data]) => {
    // Filter for all selected districts
    return $data.filter(d => $selectedDistricts.includes(d.properties.GEOID))
})

// Single data object for the primary selected district (first in the array)
export const primaryDistrictData = derived([selectedDistricts, data], ([$selectedDistricts, $data]) => {
    if (!$selectedDistricts || $selectedDistricts.length === 0) return null
    const primaryId = $selectedDistricts[0] // Always use the first district as primary
    return $data.find(d => d.properties.GEOID === primaryId) || null
})

// Get the primary district ID (first in the selectedDistricts array)
export const primaryDistrictId = derived(selectedDistricts, $selectedDistricts => {
    return $selectedDistricts && $selectedDistricts.length > 0 ? $selectedDistricts[0] : null
})

export const highlightedDistricts = writable(null)

export const index = writable(0)
```

# src/lib/styles/colorConfig.js

```js
export const colors = {
    colorInclusiveDark: '#328F83',
    colorInclusiveGray: '#5e9e96',
    //colorInclusive: 'rgb(70, 181, 166)',
    colorInclusive: '#3EB4A4',
    colorSemiInclusive: 'rgb(255, 172, 17)',
    //colorSemiInclusive: '#F9B638',
    colorNonInclusive: 'rgb(249, 124, 52)',
    //colorNonInclusive: '#F78540',
    colorSeparate: 'rgb(236, 67, 90)',
    //colorSeparate: '#E95266',
    colorText: '#333131',
    colorDarkGray: '#5A5656',
    colorMediumGray: '#BCB6B6',
    colorLightGray: '#DBD7D7',
    colorLightLightGray: '#E8E5E4',
    colorWhite: '#ffffff',
    colorBackgroundWhite: '#ffffff',
    colorBackgroundLightGray: '#f5f5f5',
    colorBackgroundLightOrange: '#f9f2e7',
}
```

# src/lib/styles/styles.css

```css
html, body {
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
}

h1 {
    font-size: 2.5rem;
	font-weight: 900;
	font-family: var(--font-headers);
	line-height: 3rem;
    letter-spacing: 0.03rem;
	text-align: center;
    padding-top: 2rem;
}

@media (max-width: 768px) {
	h1 {
        max-width: 96%;
		font-size: 2rem;
        line-height: 2.5rem;
	}
}

p {
    font-size: 1.1rem;
    line-height: 1.6rem;
    margin-bottom: 0.6rem;
}

@media (max-width: 768px) {
	p {
        font-size: 1.05rem;
        line-height: 1.5rem;
	}
}

a { 
    color: var(--colorDarkGray);
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

hr {
    margin-top: 3rem;
    border: 0.7px solid var(--colorDarkGray);
    height: 0px;
    box-shadow: none;
}

.page-container {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.header-headline-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: flex-start;
    justify-content: space-between;
}

.headline-container {
    z-index: 5;
    padding-top: 0;
    flex: 1;
}

.header-container-desktop {
    width: auto;
    z-index: 10;
}

.header-container-mobile {
    width: 100%;
    z-index: 10;
    margin-bottom: 0.5rem;
}

.headline {
    padding-top: 0;
    margin: 2.5rem 3rem;
    text-align: left;
    max-width: 54rem;
}

.content-container {
    width: 100%;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
    .header-headline-container {
        flex-direction: column;
        position: relative;
    }

    .headline {
        margin-left: 1rem;
        margin-right: 1rem;
        font-size: 1.8rem;
        line-height: 2.2rem;
    }
}

.no-data {
    color: var(--colorMediumGray);
    font-style: italic;
    font-size: 0.9rem;
}
```

# src/lib/utils/arrows.js

```js
export const arrowUp = `
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up">
        <polyline points="18 15 12 9 6 15"></polyline>
    </svg>`

export const arrowDown = `
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down">
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>`

export const arrowLeft = `
    <svg viewBox="0 0 20 20" width="48" height="48" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left">
        <polyline points="15 18 9 12 15 6"></polyline>
    </svg>`

export const arrowRight = `
    <svg viewBox="0 0 20 20" width="48" height="48" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right">
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>`
```

# src/routes/[districtID]/+page.svelte

```svelte
<script>
    import { data } from "$lib/stores/stores.js"
    import { page } from '$app/stores'
    import { colors } from "$lib/styles/colorConfig"
    import { Pencil } from 'lucide-svelte'
    import SideHeader from '$lib/components/SideHeader.svelte'
    import InclusionRing from '$lib/components/InclusionRing.svelte'
    import StateMap from "$lib/components/StateMap.svelte"
    import DonutChart from '$lib/components/DonutChart.svelte'
    import CardCarousel from '$lib/components/CardCarousel.svelte'
    import InclusionLegend from '$lib/components/InclusionLegend.svelte'
    import AlertsCards from '$lib/components/AlertsCards.svelte'
    import Divider from "$lib/components/Divider.svelte"
    import Sources from "$lib/components/Sources.svelte"

    let windowWidth = 0

    $: districtID = $page.params.districtID
    // $: districtData = $data.filter(d => d.properties.GEOID === districtID)[0].properties
    // $: stateData = $data.filter(d => d.properties.GEOID === '999999')[0].properties
    $: districtData = $data?.filter(d => d?.properties?.GEOID === districtID)[0]?.properties ?? {}
    $: stateData = $data?.filter(d => d?.properties?.GEOID === '999999')[0]?.properties ?? {}

    $: console.log(districtData)

    const mapWidth = 1000; // Set this to the original width of your map
    const mapHeight = 600; // Set this to the original height of your map
    const mapScale = 0.1; // Set this to your desired scale

    $: alerts = [
        {name: "Suspension/Expulsion", value: districtData.SuspExplFg},
        {name: "Suspension/Expulsion by race", value: districtData.SuspExplRaceEthnicityFg},
        {name: "Disproportionate representation", value: districtData.DisPrptnRprsntnFg},
        {name: "Disproportionate representation by disability", value: districtData.DisPrptnRprsntnDsbltyFg},
    ]

    // Check if any alert data exists
    $: hasAnyAlertData = alerts.some(alert => 
        alert.value !== undefined && 
        alert.value !== null
    )

    $: inclusionCategories = [
        {group: "inclusive", colorIdentifier: "colorInclusive", value: districtData["LRE Students >80%"], definition: "these students spend more than 80% of their day in a regular classroom"},
        {group: "semi-inclusive", colorIdentifier: "colorSemiInclusive", value: districtData["LRE Students >40% <80%"], definition: "these students spend 40% to 80% of their day in a regular classroom"},
        {group: "non-inclusive", colorIdentifier: "colorNonInclusive", value: districtData["LRE Students <40%"], definition: "these students spend less than 40% of their day in a regular classroom"},
        {group: "separate", colorIdentifier: "colorSeparate", value: districtData["LRE Students Separate Settings"], definition: "these students are in a hospital, incarcerated, etc."},
    ]

    $: gradRates = [
        {group: "graduated", value: districtData["Graduation Rate"]},
        {group: "notGraduated", value: 100 - districtData["Graduation Rate"]},
    ]

    let gradDonutCenterText = ''
    $: if (districtData['IEP 4Yr Cohort Grad 18-19'] === 5) {
        gradDonutCenterText = '<' + Math.round(districtData['Graduation Rate']) + '%';
    } else if (districtData['IEP 4Yr Cohort Grad 18-19'] === 95) {
        gradDonutCenterText = '>' + Math.round(districtData['Graduation Rate']) + '%';
    } else {
        gradDonutCenterText = Math.round(districtData['Graduation Rate']) + '%';
    }

    $: stateAvgGradRate = stateData['Graduation Rate']
</script>


<svelte:window bind:innerWidth={windowWidth} />

<div class="page-container">
    {#if windowWidth <= 768}
        <!-- Mobile: Header above the headline -->
        <div class="header-container-mobile">
            <SideHeader />
        </div>
    {/if}

    <div class="header-headline-container">
        <div class="headline-container" id="header">
            <h1 class="headline">{districtData["Institution Name"]}</h1>
        </div>

        {#if windowWidth > 768}
            <!-- Desktop: Header to the right of the headline -->
            <div class="header-container-desktop">
                <SideHeader />
            </div>
        {/if}
    </div>

    <div class="content-container">
        {#if districtData}
            <div class="district-info">
    
                <div class="district-stats text-width">
                    <div class="map-container" style="--map-width: {mapWidth}px; --map-height: {mapHeight}px;">
                        <StateMap districtData={districtData} />
                    </div>
                    <div>
                        <div class="inclusion-ring-container">
                            <InclusionRing 
                                data={districtData}
                            />
                            {#if districtData["Total Student Count"] < 500 && districtData.weighted_inclusion}
                                <span class="uncertainty">*</span>
                            {/if}
                        </div>
                        <p class="inclusion-score">out of 4</p>
                    </div>
                </div>

                <div class="text-width metric iep-percent">
                    <p><strong style="font-size:1.2rem">{districtData["Students with Disabilities"]}% </strong>of students in this district <strong>have an IEP</strong></p>
                </div>
    
                <div class="text-width metric">
                    <h3 class="header">Inclusion</h3>
                    <div class="inclusion-breakdown">
                        <DonutChart
                            data={inclusionCategories}
                            chartColors = {[colors.colorInclusive, colors.colorSemiInclusive, colors.colorNonInclusive, colors.colorSeparate]}
                            centerText={districtData["Total Student Count"] ? districtData["Total Student Count"].toLocaleString() : "-"}
                            centerText2="students"
                            centerText3="with IEPs"
                        />
                        <InclusionLegend data={inclusionCategories} />
                    </div>
                </div>
    
                <div class="text-width metric">
                    <h3 class="header">Alerts</h3>
                    {#if hasAnyAlertData && districtData["Total Student Count"]}
                        <AlertsCards alertsData={alerts} />
                    {:else if !hasAnyAlertData}
                        <p class="no-data">Alert data not available for the current school year</p>
                    {:else}
                        <p>No data available</p>
                    {/if}
                </div>
    
                <div class="text-width metric">
                    <h3 class="header">4-Year Graduation Rate for Students with IEPs</h3>
                    <!-- <p class="asterisk">*school year 2018-19</p> -->
                    <div class="grad-donut">
                        {#if districtData["Total Student Count"]}
                            <DonutChart 
                                height = {160}
                                width = {160}
                                outerRadius = {80}
                                innerRadius = {55}
                                barSpacing = {0.7}
                                data = {gradRates} 
                                chartColors = {[colors.colorInclusive, colors.colorLightGray]}
                                centerText={gradDonutCenterText}
                                indicator={[{group: "gradRate", value: stateAvgGradRate}, {group: "notGradRate", value: 100 - stateAvgGradRate}]}
                                indicatorLabel={`State Avg: ${Math.round(stateAvgGradRate)}%`}
                            />
                        {:else}
                            <p>No data available</p>
                        {/if}
                    </div>
                </div>
    
                <div class="text-width metric">
                    {#if districtData}
                        <CardCarousel districtData={districtData} data={$data} />
                    {/if}
                </div>
            </div>
                
            {/if}
    
            <Divider>
                <Pencil />
            </Divider>
    
            <Sources />
    </div>
</div>


<style>
    .headline {
        color: var(--colorInclusive);
        max-width: 44rem;
    }

    @media (max-width: 768px) {
        .headline {
            margin-top: 3rem;
        }
    }

    .district-info {
        background-color: var(--colorBackgroundWhite);
        padding-top: 1rem;
    }

    .metric {
        margin-top: 2.5rem;
        margin-bottom: 2.5rem;
        align-items: center;
    }

    #header {
        display: flex;
        flex-direction: row;
        gap: 2rem;
    }

    .district-stats {
        display: flex;
        flex-direction: row;
        /* align-items: center; */
        gap: 2rem;
    }

    .inclusion-breakdown {
        display: flex;
        flex-direction: row;
        gap: 2rem;
    }

    @media (max-width: 600px) {
        .inclusion-breakdown {
            flex-wrap: wrap;
        }
    }

    .inclusion-score {
        font-size: 0.8rem;
        margin-top: 0.15rem;
        font-weight: 600;
    }

    .inclusion-ring-container {
        display: flex;
        align-items: center; /* Vertically center the contents */
    }

    .uncertainty {
        margin-left: 4px; /* Adjust as needed for spacing */
        align-self: flex-start; /* Align asterisk to the top */
        font-size: 1.6rem;
        color: var(--colorDarkGray);
        margin-left: 0.25rem;
    }

    .map-container {
        transform: scale(var(--map-scale, 0.1));
        transform-origin: top left;
        width: calc(var(--map-width) * var(--map-scale, 0.1));
        height: calc(var(--map-height) * var(--map-scale, 0.1));
    }

    .iep-percent {
        margin-top: -0.2rem;
        display: flex;
        justify-content: flex-start;
    }

    .iep-percent p {
        font-size: 1.1rem;
        background-color: color-mix(in srgb, var(--colorInclusive) 15%, transparent);
        color: var(--colorInclusive);
        padding: 0.25rem 0.5rem;
        display: inline-block;
        margin: 0;
    }

    .grad-donut {
        margin-top: 1rem;
    }
</style>
```

# src/routes/+layout.svelte

```svelte
<!-- src/routes/+layout.svelte -->
<script>
    import '$lib/styles/styles.css'
    import { colors } from '$lib/styles/colorConfig.js'
    import Footer from '$lib/components/Footer.svelte'

    let cssColors = `
        --colorInclusiveDark: ${colors.colorInclusiveDark};
        --colorInclusiveGray: ${colors.colorInclusiveGray};
        --colorInclusive: ${colors.colorInclusive};
        --colorSemiInclusive: ${colors.colorSemiInclusive};
        --colorNonInclusive: ${colors.colorNonInclusive};
        --colorSeparate: ${colors.colorSeparate};
        --colorText: ${colors.colorText};
        --colorDarkGray: ${colors.colorDarkGray};
        --colorMediumGray: ${colors.colorMediumGray};
        --colorLightGray: ${colors.colorLightGray};
        --colorLightLightGray: ${colors.colorLightLightGray};
        --colorWhite: ${colors.colorWhite};
        --colorBackground: ${colors.colorBackground};
        --colorBackgroundWhite: ${colors.colorBackgroundWhite};
        --colorBackgroundLightGray: ${colors.colorBackgroundLightGray};
        --colorBackgroundLightOrange: ${colors.colorBackgroundLightOrange};
    `
</script>

<div class="app" style="{cssColors}">
    <!-- Color bar inside app div so it can access CSS variables -->
    <div class="color-bar"></div>
    
    <main>
        <slot />
    </main>

    <Footer />
</div>

<style>
    .color-bar {
        width: 100%;
        height: 8px;
        background-color: var(--colorInclusive);
    }

    :global(:root) {
        --font-body: 'Source Sans 3', sans-serif;
        --font-headers: 'Bitter', serif;
        --column-width: 42rem;
        --column-margin-top: 4rem;
        --shadow: 1px 2px 6px rgba(0, 0, 0, 0.15);
    }
    
    :global(*) {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    :global(section) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    :global(.text-width) {
        max-width: 44rem;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
    }

    :global(.header) {
        color: var(--colorInclusive);
        font-size: 1.3rem;
        letter-spacing: 0.01rem;
        font-weight: 700;
        font-family: 'Bitter', serif;
        margin-right: 1rem;
        margin-bottom: 1rem;
    }

    :global(.asterisk ){
        font-size: 0.9rem;
        color: var(--colorDarkGray);
        line-height: 1.2rem;
    }

    @media (max-width: 768px) {
        :global(.text-width) {
            padding: 0 1rem;
        }
    }
    
    .app {
        width: 100%;
        min-height: 100vh;
        font-family: var(--font-body);
        color: var(--color-text);
        /* Remove top padding since color bar is no longer fixed */
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        background-color: var(--colorBackgroundWhite);
    }
</style>
```

# src/routes/+page.js

```js
// generate static assets since there's no dynamic data
export const prerender = true
```

# src/routes/+page.svelte

```svelte
<svelte:head>
    <title>Data on inclusion for students with disabilities</title>
    <meta name="Inclusion Data" content="Data on inclusion for students with disabilities" />
</svelte:head>

<script>
    import { data, selectedDistricts, selectedDistrictsData, primaryDistrictData } from "$lib/stores/stores.js"
    import SideHeader from '$lib/components/SideHeader.svelte'
    import Divider from "$lib/components/Divider.svelte"
    import { Search, Pencil, TableProperties } from 'lucide-svelte'
    import Scroller from "$lib/components/Scroller.svelte"
    import SelectDistricts from "$lib/components/SelectDistricts.svelte"
    import SimpleAccordion from "$lib/components/SimpleAccordion.svelte"
    import VisualizationToggle from "$lib/components/VisualizationToggle.svelte"
    import TableOfDistricts from "$lib/components/TableOfDistricts.svelte"
    import Sources from "$lib/components/Sources.svelte"
    import ScrollyCard from "$lib/components/ScrollyCard.svelte"
    import ScrollyProgress from "$lib/components/ScrollyProgress.svelte"

    let windowWidth = 0

    // Scroller variables
    let index, offset, progress
    let top = 0
    let threshold = 0.8
    let bottom = 0.8

    // Check if any districts are selected
    $: isDistrictSelected = $selectedDistricts && $selectedDistricts.length > 0

    // Total number of scrolly sections
    $: totalScrollySections = isDistrictSelected ? 8 : 2

    // Function to skip the scrolly experience
    function skipToEnd() {
        index = totalScrollySections - 1
        // Scroll to the table section
        document.querySelector('.post-scroll-content').scrollIntoView({ 
            behavior: 'smooth' 
        })
    }
</script>


<svelte:window bind:innerWidth={windowWidth} />

<div class="page-container">
    {#if windowWidth <= 768}
        <!-- Mobile: Header above the headline -->
        <div class="header-container-mobile">
            <SideHeader />
        </div>
    {/if}

    <div class="header-headline-container">
        <div class="headline-container">
            <h1 class="headline">
                How does your school district support students with disabilities? Compare and find out
            </h1>
        </div>

        {#if windowWidth > 768}
            <!-- Desktop: Header to the right of the headline -->
            <div class="header-container-desktop">
                <SideHeader />
            </div>
        {/if}
    </div>

    <div class="content-container">
        <div class="intro">
            <h3 class="byline text-width">
                Updated with data from the 2023-24 school year
            </h3>
        
            <p class="text-width">
                Maybe you've had this experience: meeting with a team of educators, specialists, and administrators to discuss your student's Individualized Education Program (IEP), but you feel like the systems you're navigating aren't transparent. No matter how much everyone wants to do the right thing, you get the sense that your child's classroom placement isn't actually about your child, but about existing structures. When the team suggests something like pulling your child out of regular classes for most of the day, something feels off.
            </p>
            <p class="text-width">
                Missing from these discussions is context: How do the services in your district compare to other districts? Are there districts doing a better job of including students with disabilities? This tool helps you explore these questions using data reported by school districts each year.
            </p>
        </div>
        
        <div class="content-wrapper">
            <Scroller 
                top={top} 
                threshold={threshold} 
                bottom={bottom} 
                bind:index 
                bind:offset 
                bind:progress
                showHelpers={false}
            >
                <div slot="background" class="background">
                    <!-- <Divider>
                        <Search />
                    </Divider> -->
        
                    <SelectDistricts />
        
                    <VisualizationToggle {index} />
                </div>
        
                <div slot="foreground" class="foreground-content">
                    
                    {#if isDistrictSelected}
                        <section>
                            <ScrollyCard active={index === 0}>
                                Every dot here represents a school district in <strong>Oregon</strong>. But they're not randomly scattered...districts where students with disabilities spend <strong><em>more</em> time in a regular classroom</strong> are on the <strong>right</strong>. Districts where they spend <strong><em>less</em></strong> are on the <strong>left</strong>
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 1}>
                                Right now <strong>{$primaryDistrictData?.properties["Institution Name"]}</strong> is selected. Change the selection at any point to see where your district lands
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 2}>
                                Based on state data, if your child has a disability in <strong>{$primaryDistrictData?.properties["Institution Name"]}</strong>, on average they're likely to <strong>spend {Math.round($primaryDistrictData?.properties["average_separation_time"] || 0)}%</strong> of their day <strong>separated from typical peers</strong>. This varies, of course, depending on individual level of needs
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 3}>
                                Let's look at <strong>{$primaryDistrictData?.properties["Institution Name"]}</strong> compared to the <strong>largest districts</strong> in the state
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 4}>
                                And to the <strong>ones that surround</strong> it. Though these districts are touching, they can have completely different approaches to inclusion
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 5}>
                                This isn't even necessarily about resources or good intentions; we all want what's best for kids. It's about having examples of what's possible. Some districts have developed systems that <strong>prioritize inclusion</strong>
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 6}>
                                Others are <strong>still working on it</strong>
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 7}>
                                Now you can explore what's working, and what's not, in other districts. <strong>Dig in deeper</strong> for any district by <strong>selecting 'more'</strong> in the tooltip or table below
                            </ScrollyCard>
                        </section>
                    {:else}
                        <section>
                            <ScrollyCard active={index === 1}>
                                Please select a district to view detailed information.
                            </ScrollyCard>
                        </section>
                    {/if}
                </div>
            </Scroller>
        
            <!-- Progress indicator and Skip button -->
            {#if index > 0 && index < totalScrollySections - 1}
                <ScrollyProgress 
                    currentIndex={index} 
                    totalSteps={totalScrollySections}
                    onSkip={skipToEnd}
                />
            {/if}
        
            <div class="post-scroll-content">
                <Divider>
                    <TableProperties />
                </Divider>
            
                <div class="table">
                    <TableOfDistricts data={$data} />
                </div>

                <div class="outro">
                    <p class="text-width">
                        Every piece of data on this chart represents real kids spending real days in classrooms alongside their peers, or elsewhere. Your child's placement doesn't have to be limited by "how we've always done things," it can be inspired by what's working elsewhere.
                    </p>
                    <!-- <p class="text-width">
                        Now you have examples to share with your child's team.
                    </p>
                    <p class="text-width">
                        <em>Ready to explore solutions? [Download district comparison sheets][Find successful inclusion models][Connect with other parents]</em>
                    </p> -->
                </div>
            
                <Divider>
                    <Pencil />
                </Divider>
            
                <Sources />
            </div>
        </div>
    </div>
</div>


<style>
    .headline {
        color: var(--colorInclusive);
        max-width: 44rem;
    }

    .intro {
        margin-top: 1.5rem;
        margin-bottom: 1rem;
        position: relative;
    }

    @media (max-width: 768px) {
        .headline {
            margin-top: 2rem;
        }

        .intro {
            margin-top: 0rem;
        }
    }

    .byline {
        font-size: 1rem;
        margin-bottom: 0.6rem;
        color: var(--colorNonInclusive);
    }

    .content-wrapper {
        position: relative;
        z-index: 1;
    }

    .foreground-content {
        padding: 30rem 1rem 0 1rem;
        z-index: 2;
    }

    .background {
        background-color: var(--colorBackgroundWhite);
        padding-bottom: 2rem;
    }

    .post-scroll-content {
        position: relative;
        z-index: 2;
        background-color: var(--colorBackgroundWhite);
        margin-top: 2rem;
    }

    section {
        height: 100vh;
        max-width: 40rem;
        margin: 0 auto;
        pointer-events: none; /* Makes the section transparent to pointer events */
    }

    .table {
        background-color: var(--colorBackgroundWhite);
        z-index: 5;
    }
</style>



<!-- 
<br>
<br>
<em>*An IEP is a document that outlines what supports a student with a disability will receive at school. It's personalized to each student</em>


<br>
<br>
<SimpleAccordion title="How is the inclusion score calculated?">
    The inclusion score is based on the percent of children with disabilites who are in a regular classroom for:
    <ul>
        <li>- more than 80% of the day</li>
        <li>- more than 40% and less than 80% of the day</li>
        <li>- less than 40% of the day</li>
    </ul>
    Or, in a completely separate environment, like a hospital or detention facility.
</SimpleAccordion> -->
```

# src/routes/about/+page.svelte

```svelte
<script>
    import SideHeader from '$lib/components/SideHeader.svelte'

    let windowWidth = 0
</script>


<svelte:window bind:innerWidth={windowWidth} />

<div class="page-container">
    {#if windowWidth <= 768}
        <!-- Mobile: Header above the headline -->
        <div class="header-container-mobile">
            <SideHeader />
        </div>
    {/if}

    <div class="header-headline-container">
        <div class="headline-container">
            <h1 class="headline">About</h1>
        </div>

        {#if windowWidth > 768}
            <!-- Desktop: Header to the right of the headline -->
            <div class="header-container-desktop">
                <SideHeader />
            </div>
        {/if}
    </div>

    <div class="content-container">
        <div class="text-width about">
            <p>
                This project makes data about disabled students in Oregon more accessible and understandable for families, students, and advocates. It started after Brianna spent a summer calling principals of elementary schools all over Oregon and California to get a sense of what her child's grade school experience might look like. Very quickly, she was disturbed by the lack of transparency and consistency in supports that disabled students receive in different areas. She sought out data that could give her a better sense of things. Soon, she realized this data could also be used by others, to help them understand the landscape of supports for the disabled students they're advocating for.
            </p>
        </div>
    </div>
</div>


<style>
    .about {
        margin-top: 4rem;
        margin-bottom: 4rem;
    }
</style>

```

# src/routes/api/feedback/+server.js

```js
import { json } from '@sveltejs/kit';
import fs from 'fs';

export async function POST({ request }) {
    try {
        const feedback = await request.json();
        
        // Add timestamp
        feedback.timestamp = new Date().toISOString();
        
        // Convert feedback to string
        const feedbackString = JSON.stringify(feedback) + '\n';
        
        // Append to a file
        fs.appendFileSync('feedback.json', feedbackString);

        return json({ success: true });
    } catch (error) {
        console.error('Error:', error);
        return json({ success: false }, { status: 500 });
    }
}
```

# src/routes/contact/+page.svelte

```svelte
<script>
    import SideHeader from '$lib/components/SideHeader.svelte'

    let windowWidth = 0
</script>


<svelte:window bind:innerWidth={windowWidth} />

<div class="page-container">
    {#if windowWidth <= 768}
        <!-- Mobile: Header above the headline -->
        <div class="header-container-mobile">
            <SideHeader />
        </div>
    {/if}

    <div class="header-headline-container">
        <div class="headline-container">
            <h1 class="headline">Contact</h1>
        </div>

        {#if windowWidth > 768}
            <!-- Desktop: Header to the right of the headline -->
            <div class="header-container-desktop">
                <SideHeader />
            </div>
        {/if}
    </div>

    <div class="content-container">
        <div class="text-width contact">
            <p>
                We're always looking to improve these tools to make them more helpful and accessible! We'd love to hear from you.
            </p>
            <p>
                You can contact us by email at <strong>disabilityeddata@protonmail.com</strong>, or by using the <strong>'Feedback' button</strong> in the bottom right corner below.
            </p>
            <p>
                Thank you!
            </p>
        </div>
    </div>
</div>


<style>
    .contact {
        margin-top: 4rem;
        margin-bottom: 4rem;
    }
</style>

```

# src/routes/funding/+layout.svelte

```svelte
<script>
    import '$lib/styles/styles.css'
    import { colors } from '$lib/styles/colorConfig.js'

    let cssColors = `
        --colorInclusiveDark: ${colors.colorInclusiveDark};
        --colorInclusiveGray: ${colors.colorInclusiveGray};
        --colorInclusive: ${colors.colorInclusive};
        --colorSemiInclusive: ${colors.colorSemiInclusive};
        --colorNonInclusive: ${colors.colorNonInclusive};
        --colorSeparate: ${colors.colorSeparate};
        --colorText: ${colors.colorText};
        --colorDarkGray: ${colors.colorDarkGray};
        --colorMediumGray: ${colors.colorMediumGray};
        --colorLightGray: ${colors.colorLightGray};
        --colorLightLightGray: ${colors.colorLightLightGray};
        --colorWhite: ${colors.colorWhite};
        --colorBackgroundWhite: ${colors.colorBackgroundWhite};
        --colorBackgroundLightGray: ${colors.colorBackgroundLightGray};
        --colorBackgroundLightOrange: ${colors.colorBackgroundLightOrange};
    `
</script>

<div class="app" style="{cssColors}">
    <main>
        <slot />
    </main>
</div>


```

# src/routes/funding/+page.js

```js
import { getData } from '$lib/data/processData.js'
import { forceSimulation, forceCollide, forceX, forceY } from 'd3-force'
import { geoTransverseMercator, geoPath } from 'd3-geo'

export async function load({ params }) {
    const data = await getData()
    
    // add force calc logic, cx and cy for each district's bubble, so that can then be passed into the BubbleMap component to position bubbles right away

    return {
        data
    }
}
```

# src/routes/funding/+page.svelte

```svelte
<script>
    import SideHeader from '$lib/components/SideHeader.svelte'
    import { fade } from 'svelte/transition'
    import SwarmIdentificationSize from '$lib/components/SwarmIdentificationSize.svelte'
    import Divider from "$lib/components/Divider.svelte"
    import { Pencil } from 'lucide-svelte'
    import SourcesFunding from "$lib/components/SourcesFunding.svelte"
    
    let windowWidth = 0
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="page-container">
    {#if windowWidth <= 768}
        <!-- Mobile: Header above the headline -->
        <div class="header-container-mobile">
            <SideHeader />
        </div>
    {/if}
    
    <div class="header-headline-container">
        <div class="headline-container">
            <h1 class="headline">The 11% cap: is it enough for Oregon's students with disabilities?</h1>
        </div>
        
        {#if windowWidth > 768}
            <!-- Desktop: Header to the right of the headline -->
            <div class="header-container-desktop">
                <SideHeader />
            </div>
        {/if}
    </div>

    <div class="content-container">

        <div class="text-width">
            <h3 class="byline">
                Updated with data from the 2023-24 school year
            </h3>

            <p> 
                Oregon caps special education funding at 11% of each school district's enrollment. If there are any students beyond that number, the <strong>districts have to fund those services themselves.</strong>
            </p>

            <p>
                Want to see how many districts fall under that cap?
            </p>
        </div>

        <div class="map-container">
            <div>
                <SwarmIdentificationSize />
            </div>
            <div class="source">
                Graphic: Brianna Wilson, Disability + Education Data <br />
                Data: Oregon Dept of Education
            </div>
        </div>

        <div class="text-width last-text">
            <p>
                Almost none of them.
            </p>

            <h3>
                The funding shortfall
            </h3>
            <p> 
                When districts serve students beyond the 11% threshold, they absorb those costs locally. This creates a funding gap that districts must address through other means.
            </p>
            <p>
                What does this mean for students? Educators know that every month of delay makes intervention harder, and that the earlier you intervene, the less expensive and more effective support becomes. That's why you see so many districts continuing to identify students beyond, in many cases way beyond, the 11% cap. Oregon's system punishes exactly the approach that works best for kids, and costs less in the long run.
            </p>

            <h3>
                The lonely funding cap club
            </h3>
            <p>
                Turns out, only <strong>five other states</strong> in the entire country cap special education funding. Not only that, but Oregon's cap is the lowest of all of them. By a lot.
            </p>
            <p>
                The cap was set in the early 1990s, back when we understood far less about learning differences and intervention strategies. It hasn't budged since, even as our knowledge about supporting students with disabilities has transformed completely.
            </p>

            <h3>
                What this means
            </h3>
            <p>
                The consistent gap between the funding cap and actual student need suggests a structural mismatch. Districts across Oregon are identifying students who need special education services at rates significantly higher than what the state funds.
            </p>
            <p>
                This isn't about any single district's approach, it's a statewide pattern.
            </p>

            <h3>
                What can you do?
            </h3>
            <p>
                Legislators are currently considering bills to address this funding gap, but with a revenue forecast much lower than expected, the bills are at risk of being sidelined. They need to hear from you that this is a priority for Oregon's students and families.
            </p>
            <p>
                 Let <a href="https://geo.maps.arcgis.com/apps/instant/lookup/index.html?appid=fd070b56c975456ea2a25f7e3f4289d1" target="_blank">your legislators</a> know you support
                 <a href="https://olis.oregonlegislature.gov/liz/2025R1/Measures/Overview/HB2953" target="_blank">HB 2953</a> to remove the special education funding cap and <a href="https://olis.oregonlegislature.gov/liz/2025R1/Measures/Overview/HB2448" target="_blank">HB 2448</a> to increase funds to the High Cost Disabilities Account. <a href="https://www.myactionalerts.com/action/specialeducationfunding" target="_blank">Here's an easy-to-email form.</a>
            </p>
        </div>

        <Divider>
            <Pencil />
        </Divider>

        <SourcesFunding />
    </div>
</div>

<style>
    .headline {
        color: var(--colorInclusive);
        max-width: 44rem;
    }

    @media (max-width: 768px) {
        .headline {
            margin-top: 3rem;
        }
    }

    .byline {
        font-size: 1rem;
        margin-bottom: 0.6rem;
        color: var(--colorNonInclusive);
    }
    
    a {
        color: var(--colorInclusiveDark);
        font-weight: 600;
    }

    .viz-in-progress {
        margin-bottom: 0;
    }

    .map-container {
        margin: 0 auto;
        width: 100%;
        height: 100%;
    }

    .source {
        font-size: 0.8rem;
        line-height: 1rem;
        text-align: right;
        margin-top: -1rem;
        margin-bottom: 2rem;
        margin-right: 2rem;
    }

    .first-text {
        margin-top: 2rem;
    }

    .last-text {
        margin-bottom: 4rem;
    }
</style>
```

# src/routes/inclusion/+page.svelte

```svelte
<svelte:head>
    <title>Data on inclusion for students with disabilities</title>
    <meta name="Inclusion Data" content="Data on inclusion for students with disabilities" />
</svelte:head>

<script>
    import { data, selectedDistricts, selectedDistrictsData, primaryDistrictData } from "$lib/stores/stores.js"
    import SideHeader from '$lib/components/SideHeader.svelte'
    import Divider from "$lib/components/Divider.svelte"
    import { Search, Pencil, TableProperties } from 'lucide-svelte'
    import Scroller from "$lib/components/Scroller.svelte"
    import SelectDistricts from "$lib/components/SelectDistricts.svelte"
    import SimpleAccordion from "$lib/components/SimpleAccordion.svelte"
    import VisualizationToggle from "$lib/components/VisualizationToggle.svelte"
    import TableOfDistricts from "$lib/components/TableOfDistricts.svelte"
    import Sources from "$lib/components/Sources.svelte"
    import ScrollyCard from "$lib/components/ScrollyCard.svelte"
    import ScrollyProgress from "$lib/components/ScrollyProgress.svelte"

    let windowWidth = 0

    // Scroller variables
    let index, offset, progress
    let top = 0
    let threshold = 0.8
    let bottom = 0.8

    // Check if any districts are selected
    $: isDistrictSelected = $selectedDistricts && $selectedDistricts.length > 0

    // Total number of scrolly sections
    $: totalScrollySections = isDistrictSelected ? 8 : 2

    // Function to skip the scrolly experience
    function skipToEnd() {
        index = totalScrollySections - 1
        // Scroll to the table section
        document.querySelector('.post-scroll-content').scrollIntoView({ 
            behavior: 'smooth' 
        })
    }
</script>


<svelte:window bind:innerWidth={windowWidth} />

<div class="page-container">
    {#if windowWidth <= 768}
        <!-- Mobile: Header above the headline -->
        <div class="header-container-mobile">
            <SideHeader />
        </div>
    {/if}

    <div class="header-headline-container">
        <div class="headline-container">
            <h1 class="headline">
                How does your school district support students with disabilities? Compare and find out
            </h1>
        </div>

        {#if windowWidth > 768}
            <!-- Desktop: Header to the right of the headline -->
            <div class="header-container-desktop">
                <SideHeader />
            </div>
        {/if}
    </div>

    <div class="content-container">
        <div class="intro">
            <h3 class="byline text-width">
                Updated with data from the 2023-24 school year
            </h3>
        
            <p class="text-width">
                Maybe you've had this experience: meeting with a team of educators, specialists, and administrators to discuss your student's Individualized Education Program (IEP), but you feel like the systems at play are opaque. No matter how much everyone wants to do the right thing, you get the sense that your child's classroom placement isn't really about your child, but about the existing structures. When the team suggests something like pulling your child out of regular classes for most of the day, something feels off.
            </p>
            <p class="text-width">
                Missing from these discussions is context: How do the services in your district compare to other districts? Are there districts doing a better job of including students with disabilities? This tool helps you explore these questions using data reported by school districts each year.
            </p>
        </div>
        
        <div class="content-wrapper">
            <Scroller 
                top={top} 
                threshold={threshold} 
                bottom={bottom} 
                bind:index 
                bind:offset 
                bind:progress
                showHelpers={false}
            >
                <div slot="background" class="background">
                    <!-- <Divider>
                        <Search />
                    </Divider> -->
        
                    <SelectDistricts />
        
                    <VisualizationToggle {index} />
                </div>
        
                <div slot="foreground" class="foreground-content">
                    
                    {#if isDistrictSelected}
                        <section>
                            <ScrollyCard active={index === 0}>
                                Every dot here represents a school district in <strong>Oregon</strong>. But they're not randomly scattered--districts where students with disabilities spend <strong><em>more</em> time in a regular classroom</strong> are on the <strong>right</strong>. Districts where they spend <strong><em>less</em></strong> are on the <strong>left</strong>
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 1}>
                                Right now <strong>{$primaryDistrictData?.properties["Institution Name"]}</strong> is selected. Change the selection at any point to see where your district lands
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 2}>
                                Based on state data, if your child has a disability in <strong>{$primaryDistrictData?.properties["Institution Name"]}</strong>, on average they're likely to <strong>spend {Math.round($primaryDistrictData?.properties["average_separation_time"] || 0)}%</strong> of their day <strong>separated from typical peers</strong>. This varies, of course, depending on the individual level of needs
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 3}>
                                Let's look at <strong>{$primaryDistrictData?.properties["Institution Name"]}</strong> compared to the <strong>largest districts</strong> in the state
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 4}>
                                And to the <strong>ones that surround</strong> it. Though these districts are touching, they can have completely different approaches to inclusion
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 5}>
                                This isn't even necessarily about resources or good intentions--we all want what's best for kids. It's about having examples of what's possible. Some districts have developed systems that <strong>prioritize inclusion</strong>
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 6}>
                                Others are <strong>still working on it</strong>
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 7}>
                                Now you can explore what's working and what's not in other districts. <strong>Dig in deeper</strong> for any district by <strong>selecting 'more'</strong> in the tooltip or table below
                            </ScrollyCard>
                        </section>
                    {:else}
                        <section>
                            <ScrollyCard active={index === 1}>
                                Please select a district to view detailed information.
                            </ScrollyCard>
                        </section>
                    {/if}
                </div>
            </Scroller>
        
            <!-- Progress indicator and Skip button -->
            {#if index > 0 && index < totalScrollySections - 1}
                <ScrollyProgress 
                    currentIndex={index} 
                    totalSteps={totalScrollySections}
                    onSkip={skipToEnd}
                />
            {/if}
        
            <div class="post-scroll-content">
                <Divider>
                    <TableProperties />
                </Divider>
            
                <div class="table">
                    <TableOfDistricts data={$data} />
                </div>

                <div class="outro">
                    <p class="text-width">
                        Every piece of data on this chart represents real kids spending real days in classrooms alongside their peers, or elsewhere. Your child's placement doesn't have to be limited by "how we've always done things," it can be inspired by what's working elsewhere.
                    </p>
                    <!-- <p class="text-width">
                        Now you have examples to share with your child's team.
                    </p>
                    <p class="text-width">
                        <em>Ready to explore solutions? [Download district comparison sheets][Find successful inclusion models][Connect with other parents]</em>
                    </p> -->
                </div>
            
                <Divider>
                    <Pencil />
                </Divider>
            
                <Sources />
            </div>
        </div>
    </div>
</div>


<style>
    .headline {
        color: var(--colorInclusive);
        max-width: 44rem;
    }

    .intro {
        margin-top: 1.5rem;
        margin-bottom: 1rem;
        position: relative;
    }

    @media (max-width: 768px) {
        .headline {
            margin-top: 2rem;
        }

        .intro {
            margin-top: 0rem;
        }
    }

    .byline {
        font-size: 1rem;
        margin-bottom: 0.6rem;
        color: var(--colorNonInclusive);
    }

    .content-wrapper {
        position: relative;
        z-index: 1;
    }

    .foreground-content {
        padding: 30rem 1rem 0 1rem;
        z-index: 2;
    }

    .background {
        background-color: var(--colorBackgroundWhite);
        padding-bottom: 2rem;
    }

    .post-scroll-content {
        position: relative;
        z-index: 2;
        background-color: var(--colorBackgroundWhite);
        margin-top: 2rem;
    }

    section {
        height: 100vh;
        max-width: 40rem;
        margin: 0 auto;
        pointer-events: none; /* Makes the section transparent to pointer events */
    }

    .table {
        background-color: var(--colorBackgroundWhite);
        z-index: 5;
    }
</style>



<!-- 
<br>
<br>
<em>*An IEP is a document that outlines what supports a student with a disability will receive at school. It's personalized to each student</em>


<br>
<br>
<SimpleAccordion title="How is the inclusion score calculated?">
    The inclusion score is based on the percent of children with disabilites who are in a regular classroom for:
    <ul>
        <li>- more than 80% of the day</li>
        <li>- more than 40% and less than 80% of the day</li>
        <li>- less than 40% of the day</li>
    </ul>
    Or, in a completely separate environment, like a hospital or detention facility.
</SimpleAccordion> -->
```

# src/routes/resources/+page.svelte

```svelte
<script>
    import SideHeader from '$lib/components/SideHeader.svelte'

    let windowWidth = 0
</script>


<svelte:window bind:innerWidth={windowWidth} />

<div class="page-container">
    {#if windowWidth <= 768}
        <!-- Mobile: Header above the headline -->
        <div class="header-container-mobile">
            <SideHeader />
        </div>
    {/if}

    <div class="header-headline-container">
        <div class="headline-container">
            <h1 class="headline">Resources</h1>
        </div>

        {#if windowWidth > 768}
            <!-- Desktop: Header to the right of the headline -->
            <div class="header-container-desktop">
                <SideHeader />
            </div>
        {/if}
    </div>

    <div class="content-container">
        <div class="text-width resources">
            <div class="link">
                <a href="https://factoregon.org/" target="_blank">FACT Oregon</a>
                <p>Has a support line and appointments for families who need help navigating systems of services for their disabled loved ones. They also have courses-on-demand, seminars, and much more.</p>
            </div>
            <div class="link">
                <a href="https://www.droregon.org/" target="_blank">Disability Rights Oregon</a>
                <p>Legal advocacy organization for people of all ages with disabilities, including children and students. Some of their work, for example, has contributed to the passing of legislation that ends restraint and seclusion practices in schools, and makes it illegal to deny students with disabilities the right to attend school for the full day.</p>
            </div>
            <div class="link">
                <a href="https://sites.ed.gov/idea/" target="_blank">Individuals with Disabilities Act (IDEA)</a>
                <p>The federal law enacted to make sure all children have the right to a free and appropriate public education. IDEA also specifies that children with disabilities have the right to be educated in the 'least restrictive environment,' or, in other words, in as mainstream an environment as possible with the needed supports provided.</p>
            </div>
        </div>
    </div>
</div>


<style>
    .resources {
        margin-top: 4rem;
        margin-bottom: 4rem;
    }

    .link a {
        font-weight: bold;
        color: var(--colorInclusiveDark);
        font-size: 1.2rem;
    }
</style>
```

# src/routes/smallschools/+page.svelte

```svelte
<script>
    import SchoolProficiencyBySize from '$lib/components/SchoolProficiencyBySize.svelte'
    import SmallSchools from '$lib/components/SmallSchools.svelte'
    import SchoolSizeExpenditureChart from '$lib/components/SchoolSizeExpenditureChart.svelte'
    import SchoolProficiencyTrends from '$lib/components/SchoolProficiencyTrends.svelte'
    import SideHeader from '$lib/components/SideHeader.svelte'
    import { colors } from "$lib/styles/colorConfig"
    import Divider from "$lib/components/Divider.svelte"
    import { ChartNoAxesColumn, TrendingUp, Ruler } from 'lucide-svelte'

    let windowWidth = 0
</script>

<svelte:head>
    <title>School Size & Performance</title>
    <meta name="description" content="Analysis of small school performance compared to per pupil spending" />
</svelte:head>


<svelte:window bind:innerWidth={windowWidth} />

<div class="page-container">
    {#if windowWidth <= 768}
        <!-- Mobile: Header above the headline -->
        <div class="header-container-mobile">
            <SideHeader />
        </div>
    {/if}

    <div class="header-headline-container">
        <div class="headline-container">
            <h1 class="headline">
                WLWV Primary School Size, Spending, & Performance
            </h1>
        </div>

        {#if windowWidth > 768}
            <!-- Desktop: Header to the right of the headline -->
            <div class="header-container-desktop">
                <SideHeader />
            </div>
        {/if}
    </div>

    <div class="content-container">
        <div class="viz-container">
            <div class="section-heading">
                <Divider>
                    <ChartNoAxesColumn size={24} />
                </Divider>
            </div>
            <SchoolProficiencyBySize />
        </div>

        <div class="viz-container">
            <div class="section-heading">
                <Divider>
                    <ChartNoAxesColumn size={24} />
                </Divider>
                <h2>Spending, School Size, and Performance</h2>
                <p style="text-align:center; font-size:1rem; margin-top:-0.5rem;">* per pupil spending data not available for 23/24 school year, 22/23 data shown</p>
            </div>
            <SmallSchools />
        </div>

        <div class="viz-container">
            <div class="section-heading">
                <Divider>
                    <TrendingUp size={24} />
                </Divider>
                <h2>School Proficiency Trends Over Time</h2>
            </div>
            <div style="height: 470px;">
                <SchoolProficiencyTrends />
            </div>
        </div>
        
        <div class="viz-container">
            <div class="section-heading">
                <Divider>
                    <Ruler />
                </Divider>
                <h2>Size and Spending</h2>
                <p style="text-align:center; font-size:1rem; margin-top:-0.5rem;">* per pupil spending data not available for 23/24 school year, 22/23 data shown</p>
            </div>
            <div style="height: 470px;">
                <SchoolSizeExpenditureChart />
            </div>
        </div>
        
        <div class="text-width">
            <div class="source">
                <p>
                    <strong>Source:</strong> 
                    Oregon Department of Education, 
                    Edunomics Lab at Georgetown
                    <a href="https://public.tableau.com/app/profile/edunomicslab/viz/OregonFY21SpendingvsOutcomes/OregonFY21?publish=yes">1</a>
                    <a href="https://public.tableau.com/app/profile/edunomicslab/viz/OregonFY22SpendingvsSY23Outcomes/ORFY22SpendingvsSY23Outcomes#1">2</a>
                    <a href="https://public.tableau.com/app/profile/edunomicslab/viz/OregonFY23SpendingvsSY24Outcomes-updated3_24/ORFY23SpendingvsSY24Outcomes">3</a>
                </p>
            </div>
        </div>
    </div>
</div>

<style>
    .headline {
        color: var(--colorInclusive);
        max-width: 44rem;
    }

    @media (max-width: 768px) {
        .headline {
            margin-top: 3rem;
        }
    }
    
    .viz-container {
        margin: 2rem auto 4rem;
        max-width: 1000px;
        width: 100%;
    }
    
    .section-heading {
        margin-bottom: 1.5rem;
    }
    
    .section-heading h2 {
        font-size: 1.5rem;
        color: var(--colorText);
        text-align: center;
        margin: 1rem 0;
        font-family: var(--font-headers);
    }
    
    .source {
        font-size: 0.9rem;
        color: var(--colorDarkGray);
        margin-top: 3rem;
        padding-top: 1rem;
        border-top: 1px solid var(--colorLightGray);
        margin-bottom: 3rem;
    }
    
    @media (max-width: 768px) {
        .section-heading h2 {
            font-size: 1.2rem;
            padding: 0 1rem;
        }
    }
</style>
```

# src/routes/subscribe/+page.svelte

```svelte
<script>
</script>

<h1>Stay updated</h1>

<div class="text-width subscribe">
    <p>
        Subscribe to our <a href="https://disabilityeddata.substack.com/">newsletter</a> to get updates on new data, features, and more.
    </p>
    <div class="embed">
        <iframe src="https://disabilityeddata.substack.com/embed" width="480" height="150" style="border:1px solid #EEE; background:white;" frameborder="0" scrolling="no"></iframe>
    </div>
</div>

<style>
    .subscribe {
        margin-top: 4rem;
        margin-bottom: 4rem;
    }

    a {
        font-weight: bold;
        color: var(--colorInclusiveDark);
        font-size: 1.2rem;
    }

    .embed {
        display: flex;
        justify-content: center;
        margin-top: 2rem;
    }
</style>
```

# src/routes/viz-tests/+page.js

```js
import { getData } from '$lib/data/processData.js'
import { forceSimulation, forceCollide, forceX, forceY } from 'd3-force'
import { geoTransverseMercator, geoPath } from 'd3-geo'

export async function load({ params }) {
    const data = await getData()
    
    return {
        data
    }
}
```

# src/routes/viz-tests/+page.svelte

```svelte
<script>
    import { fade } from 'svelte/transition'
    import ScatterplotIdentificationSize from '$lib/components/ScatterplotIdentificationSize.svelte'
    import ScatterplotInclSize from '$lib/components/ScatterplotInclSize.svelte'
    import BubbleMap from '$lib/components/BubbleMap.svelte'
    import DistrictsBeeswarm from '$lib/components/DistrictsBeeswarm.svelte'

    export let data
    console.log('viz test data:', data)

    let currentView = 'map'
</script>

<h1>Visualization Tests</h1>

<div class="map-container">
    
    <div class="viz-in-progress">
        <ScatterplotIdentificationSize />
    </div>

    <div class="viz-in-progress">
        <div class="toggle-controls">
            <button 
                class="toggle-btn {currentView === 'beeswarm' ? 'active' : ''}"
                on:click={() => currentView = 'beeswarm'}
            >
                Beeswarm
            </button>
            <button 
                class="toggle-btn {currentView === 'map' ? 'active' : ''}"
                on:click={() => currentView = 'map'}
            >
                Map
            </button>
        </div>
    
        <div class="visualization">
            {#if currentView === 'beeswarm'}
                <div transition:fade={{ duration: 300 }}>
                    <DistrictsBeeswarm />
                </div>
            {:else}
                <div transition:fade={{ duration: 300 }}>
                    <BubbleMap />
                </div>
            {/if}
        </div>
    </div>

    <div class="viz-in-progress">
        <ScatterplotInclSize />
    </div>

</div>

<style>
    .viz-in-progress {
        margin: 5rem 0;
    }

    .map-container {
        margin: 0 auto;
        width: 100%;
        height: 100%;
    }

    .toggle-controls {
        display: flex;
        gap: 0.5rem;
    }

    .toggle-btn {
        padding: 0.5rem 1rem;
        border: 1.5px solid var(--colorText);
        border-radius: 20px;
        background: var(--colorBackgroundWhite);
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .toggle-btn.active {
        background: var(--colorText);
        color: var(--colorBackgroundWhite);
    }

    .toggle-btn:hover:not(.active) {
        background: var(--colorLightLightGray);
    }

    .visualization {
        position: relative;
        width: 100%;
        height: 500px;
        margin: 1rem 0;
    }

    .visualization > div {
        position: absolute;
        width: 100%;
        height: 100%;
    }
</style>
```

# static/favicon.ico

This is a binary file of the type: Binary

# svelte.config.js

```js
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;

```

# vite.config.js

```js
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()]
});

```

# vite.config.js.timestamp-1733776069207-e16ca5ebb1957.mjs

```mjs
// vite.config.js
import { sveltekit } from "file:///Users/briannagreen/Desktop/iepdata/node_modules/@sveltejs/kit/src/exports/vite/index.js";
import { defineConfig } from "file:///Users/briannagreen/Desktop/iepdata/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig({
  plugins: [sveltekit()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYnJpYW5uYWdyZWVuL0Rlc2t0b3AvaWVwZGF0YVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2JyaWFubmFncmVlbi9EZXNrdG9wL2llcGRhdGEvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2JyaWFubmFncmVlbi9EZXNrdG9wL2llcGRhdGEvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBzdmVsdGVraXQgfSBmcm9tICdAc3ZlbHRlanMva2l0L3ZpdGUnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG5cdHBsdWdpbnM6IFtzdmVsdGVraXQoKV1cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyUixTQUFTLGlCQUFpQjtBQUNyVCxTQUFTLG9CQUFvQjtBQUU3QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMzQixTQUFTLENBQUMsVUFBVSxDQUFDO0FBQ3RCLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

```

