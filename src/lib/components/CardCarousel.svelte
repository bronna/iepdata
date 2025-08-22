<script>
    import { onMount, afterUpdate } from "svelte"
    import Card from "$lib/components/Card.svelte"
    import InclusionRing from "$lib/components/InclusionRing.svelte"
    import { arrowLeft, arrowRight } from "$lib/utils/arrows.js"

    export let districtData
    export let data

    $: neighborIDs = districtData.neighbors
    $: neighbors = data.filter(d => neighborIDs.includes(d.properties.GEOID))

    let cardsContainer
    let isOverflowing = false

    onMount(checkOverflow)
    afterUpdate(checkOverflow)

    function checkOverflow() {
        if (cardsContainer) {
            isOverflowing = cardsContainer.scrollWidth > cardsContainer.offsetWidth
        }
    }

    function scrollLeft() {
        if (cardsContainer) {
            cardsContainer.scrollBy({ left: -300, behavior: 'smooth' })
        }
    }

    function scrollRight() {
        if (cardsContainer) {
            cardsContainer.scrollBy({ left: 300, behavior: 'smooth' })
        }
    }
</script>

<div class="card-carousel text-width">
    <h3 class="header">Neighboring Districts</h3>
    <div class="cards-container" bind:this={cardsContainer}>
        {#if isOverflowing}
            <div class="arrow arrow-left" on:click={scrollLeft} on:touchend={scrollLeft}>
                {@html arrowLeft}
            </div>
        {/if}
        {#each neighbors as neighbor (neighbor.properties.GEOID)}
            <Card linkId={neighbor.properties.GEOID}>
                <svelte:fragment slot="header">
                    <h4>{neighbor.properties["Institution Name"]}</h4>
                </svelte:fragment>
                <svelte:fragment slot="content">
                    <div class="card-content">
                        <div class="inclusion-ring-container">
                            <InclusionRing 
                                data={neighbor.properties}
                            />
                            {#if neighbor.properties["Total Student Count"] < 500 && neighbor.properties.weighted_inclusion}
                                <span class="uncertainty">*</span>
                            {/if}
                        </div>
                        {#if neighbor.properties["Total Student Count"]}
                            <div class="card-info">
                                <span class="highlight">{neighbor.properties["Total Student Count"]}</span> students with IEPs
                            </div>
                        {:else}
                            <div class="card-info">
                                No data available
                            </div>
                        {/if}
                    </div>
                </svelte:fragment>
            </Card>
        {/each}
        {#if isOverflowing}
            <div class="arrow arrow-right" on:click={scrollRight} on:touchend={scrollRight}>
                {@html arrowRight}
            </div>
        {/if}
    </div>
</div>

<style>
    .card-carousel {
        margin-bottom: 2.5rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        position: relative;
    }

    .cards-container {
        display: flex;
        flex-direction: row;
        overflow-x: auto;
        gap: 1rem;
        max-width: 100%;
        padding: 0 0.5rem;
        white-space: nowrap;
        background-color: var(--colorBackgroundLightGray);
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.08);
        scroll-behavior: smooth;
        scrollbar-width: none;
        -ms-overflow-style: none;
        transition: scrollbar-width 0.3s ease, -ms-overflow-style 0.3s ease;
    }

    .cards-container:hover {
        scrollbar-width: thin;
        -ms-overflow-style: -ms-autohiding-scrollbar;
    }

    .cards-container::-webkit-scrollbar {
        width: 0;
        height: 0;
        background: transparent;
        transition: all 0.3s ease;
    }

    .cards-container:hover::-webkit-scrollbar {
        width: auto;
        height: 8px;
    }

    .cards-container::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    .cards-container::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
    }

    .cards-container::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    .arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: rgba(0, 0, 0, 0.15);
        opacity: 1;
        transition: opacity 0.3s ease;
        padding: 0.5rem;
        cursor: pointer;
        z-index: 1;
    }

    .arrow-left {
        left: 0;
    }

    .arrow-right {
        right: 0;
    }

    .card-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .card-info {
        margin-top: 0.8rem;
    }

    .highlight {
        font-weight: 700;
        font-size: 1rem;
    }

    .inclusion-ring-container {
        display: flex;
        align-items: center;
    }

    .uncertainty {
        margin-left: 4px;
        align-self: flex-start;
        font-size: 1.6rem;
        color: var(--colorDarkGray);
        margin-left: 0.25rem;
    }
</style>