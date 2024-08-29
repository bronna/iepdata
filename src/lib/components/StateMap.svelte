<script>
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { geoBounds, geoTransverseMercator, geoPath, scaleOrdinal } from 'd3'
  import { data } from '$lib/stores/stores.js'
  import { colors } from "$lib/styles/colorConfig"

  export let districtData = {}
  $: console.log($data, districtData)

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

  $data.forEach(feature => {
    if(feature.geometry) {
      const [[featureMinLng, featureMinLat], [featureMaxLng, featureMaxLat]] = geoBounds(feature);

      if (featureMinLng < minLng) minLng = featureMinLng;
      if (featureMinLat < minLat) minLat = featureMinLat;
      if (featureMaxLng > maxLng) maxLng = featureMaxLng;
      if (featureMaxLat > maxLat) maxLat = featureMaxLat;
    }
  });

  let currentTransform = writable({ x: 0, y: 0, k: 1 })
  let svgElement
  let gElement

  let colorScale = scaleOrdinal()
      .domain([1, 2, 3, 4])
      .range([colors.colorSeparate, colors.colorNonInclusive, colors.colorSemiInclusive, colors.colorInclusive])

  onMount(() => {
    updateProjection()
    window.addEventListener('resize', updateProjection)
  })
</script>

<div id="map">
  <svg bind:this={svgElement} width={dims.width} height={dims.height}>
    <g bind:this={gElement}>
      {#if districtPathGenerator}
          <g style={{ clipPath: "url(#districts)" }}>
              {#each $data as district}
                  {#if district.properties.GEOID !== "999999"}
                      <path
                          class="districtShape"
                          key={district.properties.GEOID}
                          d={districtPathGenerator(district)}
                          fill={colors.colorLightGray}
                          fill-rule="evenodd"
                      ></path>
                  {/if}
              {/each}
              
              <!-- Circle at center of district -->
              {#if districtData}
                {#each $data as district}
                    {#if district.properties.GEOID === districtData.GEOID}
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