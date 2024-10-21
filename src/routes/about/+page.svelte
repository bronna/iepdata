<script>
    import BubbleMap from '$lib/components/BubbleMap.svelte'
</script>

<div class="map-container" style="--map-width: {500}px; --map-height: {500}px;">
    <BubbleMap />
</div>

<style>
    .map-container {
        margin: 0 auto;
        width: 100%;
        height: 100%;
    }
</style>
