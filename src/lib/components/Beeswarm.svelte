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