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
    export let mode = 'bubbles' // Controls visualization mode: 'bubbles' or 'choropleth'
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
                .force('collision', forceCollide()
                    .radius(d => d.r + .5)
                    .strength(0.8)
                )
                .force('x', forceX(d => d.originalX).strength(0.1))
                .force('y', forceY(d => d.originalY).strength(0.1))
                .alphaDecay(0.05)
                .alphaMin(0.01)
                .velocityDecay(0.4)
                .stop() // Stop simulation initially
            
            // Run manual ticks for immediate positioning like DistrictsBeeswarm
            for (let i = 0; i < 120; ++i) {
                simulation.tick()
            }
            
            // Update nodes array with calculated positions
            nodes = [...simulation.nodes()]
            
            // Set up tick handler and restart
            simulation.on('tick', () => {
                nodes = [...simulation.nodes()]
            })
            simulation.restart()
        } else {
            simulation.nodes(nodes)
            simulation.alpha(1)
            
            // Run manual ticks for updates too
            for (let i = 0; i < 120; ++i) {
                simulation.tick()
            }
            
            nodes = [...simulation.nodes()]
            simulation.restart()
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
                                fill={mode === 'choropleth' ? (district.properties.quartile ? colorScale(district.properties.quartile) : colors.colorLightGray) : 'none'}
                                fill-rule="evenodd"
                                stroke={mode === 'choropleth' && $selectedDistricts.includes(district.properties.GEOID) ? colors.colorDarkGray : colors.colorLightGray}
                                stroke-width={mode === 'choropleth' && $selectedDistricts.includes(district.properties.GEOID) ? "2" : "0.5"}
                                stroke-opacity={mode === 'choropleth' ? 0.8 : 1}
                                opacity={mode === 'choropleth' && $selectedDistricts.includes(district.properties.GEOID) ? 1 : (mode === 'choropleth' ? 0.8 : 1)}
                                on:click={() => handleDistrictClick(district)}
                                class:clickable-district={mode === 'choropleth'}
                                use:tooltipAction={mode === 'choropleth' ? tooltipContent(district.properties) : ''}
                            ></path>
                        {/if}
                    {/each}
                    
                    <!-- Render circles only in bubbles mode -->
                    {#if mode === 'bubbles'}
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
                                    r={node.r + 2}
                                    fill="none"
                                    stroke={colors.colorDarkGray}
                                    stroke-width={2}
                                    stroke-opacity={0.3}
                                />
                                <!-- Primary circle -->
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <circle
                                    cx={node.x}
                                    cy={node.y}
                                    r={node.r}
                                    fill={colorScale(node.district.properties.quartile)}
                                    on:click={() => handleDistrictClick(node.district)}
                                    class="district-circle selected"
                                    use:tooltipAction={tooltipContent(node.district.properties)}
                                ></circle>
                            {/if}
                        {/each}
                    {/if}

                    <!-- Selected district label -->
                    {#if selectedLabelPosition && $primaryDistrictId}
                        <g in:fade={{ duration: 300 }}>
                            <!-- White text stroke for better readability -->
                            <text 
                                x={selectedLabelPosition.x}
                                y={selectedLabelPosition.y}
                                text-anchor="middle"
                                dominant-baseline="middle"
                                fill="white"
                                stroke="white"
                                stroke-width="3"
                                stroke-linejoin="round"
                                font-size="10px"
                                font-weight="400"
                            >
                                {selectedDistrictData?.properties["Institution Name"]}
                            </text>
                            <!-- Label text -->
                            <text 
                                x={selectedLabelPosition.x}
                                y={selectedLabelPosition.y}
                                text-anchor="middle"
                                dominant-baseline="middle"
                                fill="black"
                                font-size="10px"
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

    .clickable-district {
        cursor: pointer;
        transition: opacity 0.2s;
    }

    .clickable-district:hover {
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