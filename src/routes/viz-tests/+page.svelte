<script>
    import Scatterplot from '$lib/components/Scatterplot.svelte'
    import BubbleMap from '$lib/components/BubbleMap.svelte'
</script>

<h1>Laboratory</h1>

<div class="text-width map-container" style="--map-width: {500}px; --map-height: {500}px;">
    <Scatterplot />
    <BubbleMap />
</div>

<style>
    .map-container {
        margin: 0 auto;
        width: 100%;
        height: 100%;
    }
</style>
