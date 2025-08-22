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