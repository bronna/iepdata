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
    import { data } from '$lib/stores/stores.js'
    import { colors } from "$lib/styles/colorConfig"
    import { browser } from '$app/environment'

    $: console.log($data)
  
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

    function updateProjection() {
        if (!browser || !mapElement || !$data.length) return
        
        const widthStateBounds = maxLng - minLng
        const heightStateBounds = maxLat - minLat
        const aspectRatio = widthStateBounds / heightStateBounds
  
        dims.width = mapElement.offsetWidth
        dims.height = mapElement.offsetHeight
  
        projection = geoTransverseMercator()
            .rotate([-centralLong, -centralLat])
            .fitSize([dims.width, dims.height], featureCollection);
  
        districtPathGenerator = geoPath(projection);

        // Update nodes with new positions
        updateNodesData()
    }
  
    let currentTransform = writable({ x: 0, y: 0, k: 1 })
    let svgElement
    let gElement
  
    $: colorScale = scaleOrdinal()
        .domain([1, 2, 3, 4])
        .range([colors.colorSeparate, colors.colorNonInclusive, colors.colorSemiInclusive, colors.colorInclusive])

    $: rScale = scaleSqrt()
        .domain(extent($data, d => d.properties['Total Student Count']))
        .range([3, 50])

    function updateNodesData() {
        if (!districtPathGenerator || !$data.length) return

        // Create nodes array with initial positions from centroids
        nodes = $data
            .filter(d => 
                d.properties.GEOID !== "999999" && 
                d.properties.weighted_inclusion !== null && 
                d.properties.weighted_inclusion !== undefined
            )
            .map(district => {
                const [x, y] = districtPathGenerator.centroid(district)
                return {
                    x,
                    y,
                    originalX: x,
                    originalY: y,
                    r: rScale(district.properties['Total Student Count']),
                    district: district,
                }
            })

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

    onMount(() => {
        if (!browser) return
        
        setTimeout(updateProjection, 0)
        window.addEventListener('resize', updateProjection)
        
        return () => {
            if (simulation) simulation.stop()
            window.removeEventListener('resize', updateProjection)
        }
    })

    $: if (browser && $data.length) {
        setTimeout(updateProjection, 0)
    }
</script>

<div id="map" bind:this={mapElement}>
    <svg bind:this={svgElement} width={dims.width} height={dims.height}>
        <g bind:this={gElement}>
            {#if districtPathGenerator && dims.width > 0 && dims.height > 0 && $data.length}
                <g>
                    {#each $data as district}
                        {#if district.properties.GEOID !== "999999"}
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
                    
                    <!-- Render circles from simulation nodes instead -->
                    {#each nodes as node}
                        <circle
                            cx={node.x}
                            cy={node.y}
                            r={node.r}
                            fill={colorScale(node.district.properties.quartile)}
                            stroke={colors.colorBackgroundWhite}
                            stroke-width="1"
                            opacity="0.8"
                        ></circle>
                    {/each}
                </g>
            {/if}
        </g>
    </svg>
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
</style>