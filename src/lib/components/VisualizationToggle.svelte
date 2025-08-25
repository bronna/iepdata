<script>
    import { fade } from 'svelte/transition'
    import { Map, BarChart2 } from 'lucide-svelte'
    import { colors } from '$lib/styles/colorConfig'
    import { selectedDistricts, primaryDistrictData } from '$lib/stores/stores.js'
    
    // No need to extract the first item - primaryDistrictData is already a single object
    $: districtData = $primaryDistrictData?.properties
    
    import DistrictsBeeswarm from './DistrictsBeeswarm.svelte'
    import BubbleMap from './BubbleMap.svelte'

    export let index
    export let initialView = 'beeswarm'
    export let showToggle = false
    
    let currentView = initialView
    let hasReachedSlide7 = false
    
    $: showToggle = index >= 7 // Only show toggle after scroller reaches final state
    
    // Track when we've reached slide 7 to distinguish initial load from scrolling back
    $: if (index >= 7) {
        hasReachedSlide7 = true
    }
    
    // Reset to beeswarm when scrolling back to earlier slides, but preserve initialView on first load
    $: if (index < 7) {
        if (hasReachedSlide7) {
            // User scrolled back from slide 7, reset to beeswarm
            currentView = 'beeswarm'
        } else if (initialView === 'beeswarm') {
            // Initial load with beeswarm (default behavior)
            currentView = 'beeswarm'
        }
        // If initialView is 'map' and we haven't reached slide 7 yet, preserve currentView
    }
</script>

<div class="viz-container">
    {#if showToggle}
        <div class="toggle-buttons" transition:fade={{ duration: 300 }}>
            <button 
                class="toggle-btn {currentView === 'beeswarm' ? 'active' : ''}"
                on:click={() => currentView = 'beeswarm'}
                aria-label="Show beeswarm visualization"
            >
                <BarChart2 
                    size={20} 
                    color={currentView === 'beeswarm' ? colors.colorWhite : colors.colorText} 
                />
                <span>Swarm</span>
            </button>
            <button 
                class="toggle-btn {currentView === 'map' ? 'active' : ''}"
                on:click={() => currentView = 'map'}
                aria-label="Show map visualization"
            >
                <Map 
                    size={20} 
                    color={currentView === 'map' ? colors.colorWhite : colors.colorText} 
                />
                <span>Map</span>
            </button>
        </div>
    {/if}

    <div class="visualization">
        {#if currentView === 'beeswarm'}
            <DistrictsBeeswarm {index} />
        {:else}
            <div style="width: 100%; height: 500px;">
                <BubbleMap />
            </div>
        {/if}
    </div>
</div>

<style>
    .viz-container {
        width: 100%;
        position: relative;
    }

    .toggle-buttons {
        position: absolute;
        top: -50px;
        right: 2rem;
        display: flex;
        gap: 0.5rem;
        z-index: 10;
    }

    .toggle-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
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
        width: 100%;
        min-height: 400px;
        position: relative;
    }

    @media (max-width: 768px) {
        .toggle-buttons {
            right: 1rem;
        }

        .toggle-btn span {
            display: none;
        }

        .toggle-btn {
            padding: 0.5rem;
        }
    }
</style>