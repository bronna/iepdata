<script>
    import BubbleMap from '$lib/components/BubbleMap.svelte'
</script>

<h2 class="text-width">Coming soon</h2>

<div class="text-width map-container" style="--map-width: {500}px; --map-height: {500}px;">
    <BubbleMap />
</div>

<style>
    .map-container {
        margin: 0 auto;
        width: 100%;
        height: 100%;
    }
</style>
