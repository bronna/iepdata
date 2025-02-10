<script>
    import { fade } from 'svelte/transition'
    import SwarmIdentificationSize from '$lib/components/SwarmIdentificationSize.svelte'

    export let data
    console.log('viz test data:', data)

    let currentView = 'map'
</script>

<h1 class="text-width">Oregon funding of special education leaves large gap</h1>
<div class="source text-width">
    Data: Oregon Dept of Education, 2022-23 school year
</div>

<div class="map-container">
    <div class="viz-in-progress">
        <SwarmIdentificationSize />
    </div>
</div>

<style>
    .viz-in-progress {
        margin-bottom: 0;
    }

    .map-container {
        margin: 0 auto;
        width: 100%;
        height: 100%;
    }

    .source {
        text-align: center;
        margin-top: 1rem;
        margin-bottom: 0rem;
    }
</style>