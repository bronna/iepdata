<script>
    import { setContext } from 'svelte'
    import { writable } from 'svelte/store'

    export let dimensions = {}

    let currentDimensions = writable(dimensions)
    $: {
        currentDimensions.set(dimensions)
    }

    setContext("svg-chart", {
        dimensions: currentDimensions
    })
</script>

<svg class="svg-chart" width={dimensions.width} height={dimensions.height}>
    <g transform={`translate(${dimensions.margin.left}, ${dimensions.margin.top})`}>
        <slot />
    </g>
</svg>