<script>
    import { onMount, afterUpdate } from 'svelte'
    import { writable } from 'svelte/store'
    import { geoBounds, geoTransverseMercator, geoPath, scaleOrdinal, scaleSqrt, extent } from 'd3'
    import { data } from '$lib/stores/stores.js'
    import { colors } from "$lib/styles/colorConfig"
  
    $: console.log($data)
  
    const featureCollection = {
      type: "FeatureCollection",
      features: $data
    }
  
    // Set initial values for dimensions and projection
    let dims = { width: 0, height: 0 }
    let centralLat = 43.9
    let centralLong = -120.5
  
    let projection
    let districtPathGenerator
  
    // resize the map when the window resizes
    function updateProjection() {
      const ref = document.querySelector('#map')
      if (!ref) return
      const widthStateBounds = maxLng - minLng
      const heightStateBounds = maxLat - minLat
      const aspectRatio = widthStateBounds / heightStateBounds
  
      dims.width = ref.offsetWidth
      dims.height = ref.offsetHeight
  
      projection = geoTransverseMercator()
        .rotate([-centralLong, -centralLat])
        .fitSize([dims.width, dims.height], featureCollection);
  
      districtPathGenerator = geoPath(projection);
    }
  
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
  
    let currentTransform = writable({ x: 0, y: 0, k: 1 })
    let svgElement
    let gElement
  
    let colorScale = scaleOrdinal()
        .domain([1, 2, 3, 4])
        .range([colors.colorSeparate, colors.colorNonInclusive, colors.colorSemiInclusive, colors.colorInclusive])

    // Add a scale for circle sizes
    let rScale = scaleSqrt()
        .domain(extent($data, d => d.properties['Total Student Count']))
        .range([3, 50])  // You might want to adjust these values

    onMount(() => {
      updateProjection()
      window.addEventListener('resize', updateProjection)
    })

    afterUpdate(() => {
        updateProjection()
    })

    function getCirclePosition(district) {
        const [x, y] = districtPathGenerator.centroid(district);
        return { x, y };
    }
</script>

<div id="map">
    <svg bind:this={svgElement} width={dims.width} height={dims.height}>
        <g bind:this={gElement}>
            {#if districtPathGenerator && dims.width > 0 && dims.height > 0}
                <g>
                    {#each $data as district}
                        {#if district.properties.GEOID !== "999999"}
                            <path
                                class="districtShape"
                                d={districtPathGenerator(district)}
                                fill={colors.colorLightGray}
                                fill-rule="evenodd"
                                stroke={colors.colorBackgroundWhite}
                                stroke-width="0.5"
                            ></path>
                            {#if district.properties.weighted_inclusion !== null && district.properties.weighted_inclusion !== undefined}
                                {@const position = getCirclePosition(district)}
                                <circle
                                    cx={position.x}
                                    cy={position.y}
                                    r={rScale(district.properties['Total Student Count'])}
                                    fill={colorScale(district.properties.quartile)}
                                    stroke={colors.colorBackgroundWhite}
                                    stroke-width="1"
                                    opacity="0.8"
                                ></circle>
                            {/if}
                        {/if}
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
    }
  
    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
</style>