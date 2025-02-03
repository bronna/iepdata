<script>
    import { fade } from 'svelte/transition'
    import SwarmIdentificationSize from '$lib/components/SwarmIdentificationSize.svelte'
    import ScatterplotIdentificationSize from '$lib/components/ScatterplotIdentificationSize.svelte'
    import ScatterplotInclSize from '$lib/components/ScatterplotInclSize.svelte'
    import BubbleMap from '$lib/components/BubbleMap.svelte'
    import DistrictsBeeswarm from '$lib/components/DistrictsBeeswarm.svelte'

    export let data
    console.log('viz test data:', data)

    let currentView = 'map'
</script>

<h1>Visualization Tests</h1>

<div class="map-container">
    <div class="viz-in-progress">
        <SwarmIdentificationSize />
    </div>
    
    <div class="viz-in-progress">
        <ScatterplotIdentificationSize />
    </div>

    <div class="viz-in-progress">
        <div class="toggle-controls">
            <button 
                class="toggle-btn {currentView === 'beeswarm' ? 'active' : ''}"
                on:click={() => currentView = 'beeswarm'}
            >
                Beeswarm
            </button>
            <button 
                class="toggle-btn {currentView === 'map' ? 'active' : ''}"
                on:click={() => currentView = 'map'}
            >
                Map
            </button>
        </div>
    
        <div class="visualization">
            {#if currentView === 'beeswarm'}
                <div transition:fade={{ duration: 300 }}>
                    <DistrictsBeeswarm />
                </div>
            {:else}
                <div transition:fade={{ duration: 300 }}>
                    <BubbleMap />
                </div>
            {/if}
        </div>
    </div>

    <div class="viz-in-progress">
        <ScatterplotInclSize />
    </div>

</div>

<style>
    .viz-in-progress {
        margin: 5rem 0;
    }

    .map-container {
        margin: 0 auto;
        width: 100%;
        height: 100%;
    }

    .toggle-controls {
        display: flex;
        gap: 0.5rem;
    }

    .toggle-btn {
        padding: 0.5rem 1rem;
        border: 1.5px solid var(--colorText);
        border-radius: 20px;
        background: var(--colorBackgroundWhite);
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .toggle-btn.active {
        background: var(--colorText);
        color: var(--colorBackgroundWhite);
    }

    .toggle-btn:hover:not(.active) {
        background: var(--colorLightLightGray);
    }

    .visualization {
        position: relative;
        width: 100%;
        height: 500px;
        margin: 1rem 0;
    }

    .visualization > div {
        position: absolute;
        width: 100%;
        height: 100%;
    }
</style>