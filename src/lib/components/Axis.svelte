<script>
  import { getContext } from 'svelte'
  import { format } from 'd3-format'
  import { fade } from 'svelte/transition'

  export let dimension = "x" // x or y axis
  export let scale
  export let label
  export let formatTick = format(',.2s') // add commas and round to 2 sig figs
  export let longTick = false
  export let axisLine = false
  export let tickValues = undefined
  export let fadeDuration = 300 // New prop for fade duration

  const { dimensions: dimensionsStore } = getContext('svg-chart')
  $: dimensions = $dimensionsStore

  $: numberOfTicks =
  dimension == "x"
    ? dimensions.innerWidth < 600
      ? dimensions.innerWidth / 100
      : dimensions.innerWidth / 250
    : dimensions.innerHeight / 70

  $: ticks = tickValues || scale.ticks(numberOfTicks)
</script>

<g
  class="axis-{dimension}"
  transform={`translate(0, ${dimension == "x" ? dimensions.innerHeight : 0})`}
  transition:fade={{duration: fadeDuration}}
>
  {#if axisLine}
    <line
      class="axis-line"
      x1={dimension == "x" ? 0 : dimensions.margin.left}
      y1={dimension == "y" ? dimensions.innerHeight: 0}
      x2={dimension == "x" ? dimensions.innerWidth : 0}
      y2={dimension == "y" ? dimensions.innerHeight: 0}
    />
  {/if} 

  {#each ticks as tick, i}
    <text 
      class="axis-tick"
      x={scale(tick)} 
      y={0}
      dy="6"
      dominant-baseline="hanging"
    >
      {formatTick(tick)}
    </text>
    <line 
      x1={scale(tick)} 
      y1={0} 
      x2={scale(tick)} 
      y2={longTick ? -dimensions.innerHeight - dimensions.margin.top : -10}
      stroke-dasharray={longTick ? "2 2" : "none"}
      class="axis-line"
    />
  {/each}

  {#if label}
    <text 
      class="axis-label"
      style="transform: translate(1rem, 1rem)"
    >
      {label}
    </text>
  {/if}
</g>

<style>
  .axis-line {
    stroke: #d1d7db;
  }

  .axis-label {
    text-anchor: middle;
    font-size: 0.8em;
    letter-spacing: 0.01em;
  }

  .axis-tick {
    font-size: 0.9em;
    transition: all 0.3s ease-out;
  }

  .axis-x .axis-tick {
    text-anchor: middle;
  }

  .axis-y .axis-tick {
    dominant-baseline: middle;
    text-anchor: end;
  }
</style>