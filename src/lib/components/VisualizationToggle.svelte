<script>
    import { fade } from 'svelte/transition'
    import { Map, BarChart2 } from 'lucide-svelte'
    import { colors } from '$lib/styles/colorConfig'
    import { selectedDistrict, selectedDistrictData } from '$lib/stores/stores.js'
    
    $: districtData = $selectedDistrictData?.[0]?.properties
    import DistrictsBeeswarm from './DistrictsBeeswarm.svelte'
    import BubbleMap from './BubbleMap.svelte'

    export let index
    export let showToggle = false
    
    let currentView = 'beeswarm'
    
    $: showToggle = index >= 7 // Only show toggle after scroller reaches final state
</script>

{#if showToggle}
    <div class="viz-container" transition:fade={{ duration: 300 }}>
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
                <span>Beeswarm</span>
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

        <div class="visualization">
            {#if currentView === 'beeswarm'}
                <div transition:fade={{ duration: 300 }}>
                    <DistrictsBeeswarm {index} />
                </div>
            {:else}
                <div transition:fade={{ duration: 300 }}
                     style="width: 100%; height: 400px;">
                    <BubbleMap />
                </div>
            {/if}
        </div>
    </div>
{:else}
    <DistrictsBeeswarm {index} />
{/if}

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