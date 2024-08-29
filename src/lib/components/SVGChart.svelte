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