<script>
    import { fade } from 'svelte/transition'
    import SwarmIdentificationSize from '$lib/components/SwarmIdentificationSize.svelte'
    import Divider from "$lib/components/Divider.svelte"
    import { Pencil } from 'lucide-svelte'
    import Sources from "$lib/components/Sources.svelte"
    import FundingHeader from '$lib/components/FundingHeader.svelte'
    
    let windowWidth = 0;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="page-container">
    {#if windowWidth <= 768}
        <!-- Mobile: Header above the headline -->
        <div class="header-container-mobile">
            <FundingHeader />
        </div>
    {/if}
    
    <div class="header-headline-container">
        <div class="headline-container">
            <h1 class="headline">Oregon's special education funding problem: the 11% cap</h1>
        </div>
        
        {#if windowWidth > 768}
            <!-- Desktop: Header to the right of the headline -->
            <div class="header-container-desktop">
                <FundingHeader />
            </div>
        {/if}
    </div>

    <div class="content-container">
        <div class="text-width first-text">
            <p> 
                Oregon's current special education funding cap of 11% falls significantly short of meeting the actual needs of school districts across the state. Many of Oregon's largest districts identify well above this threshold, with the largest districts serving student populations where 18% of students have Individualized Education Plans (IEPs).
            </p>
        </div>

        <div class="map-container">
            <div class="viz-in-progress">
                <SwarmIdentificationSize />
            </div>
            <div class="source">
                Graphic: Brianna Wilson, Disability + Education Data <br />
                Data: Oregon Dept of Education
            </div>
        </div>

        <div class="text-width last-text">
            <h3>The current landscape</h3>
            <p>Major districts like Portland Public Schools (18% students with IEPs), Salem-Keizer (18%), and Medford (17%) are operating well beyond the funding cap. Even districts like Beaverton (13%) and Eugene 4J (14%) exceed the arbitrary 11% threshold that determines state funding allocation.</p>
            <h3>
                Financial implications
            </h3>
            <p>
                This funding structure creates a problematic disincentive for districts to identify students with disabilities. When districts identify students beyond the 11% cap, they must absorb those additional costs without corresponding state support.
            </p>
        </div>

        <Divider>
            <Pencil />
        </Divider>

        <Sources />
    </div>
</div>

<style>
    .page-container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .header-headline-container {
        display: flex;
        flex-direction: row;
        width: 100%;
        align-items: flex-start;
        justify-content: space-between;
    }

    .headline-container {
        z-index: 5;
        padding-top: 0;
        flex: 1;
    }

    .header-container-desktop {
        width: auto;
        z-index: 10;
    }

    .header-container-mobile {
        width: 100%;
        z-index: 10;
        margin-bottom: 0.5rem;
    }

    .headline {
        padding-top: 0;
        margin: 2rem 3rem;
        text-align: left;
        max-width: 54rem;
    }

    .content-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .viz-in-progress {
        margin-bottom: 0;
    }

    .map-container {
        margin: 0 auto;
        width: 100%;
        height: 100%;
    }

    .source {
        font-size: 0.8rem;
        line-height: 1rem;
        text-align: right;
        margin-top: -1rem;
        margin-bottom: 2rem;
        margin-right: 2rem;
    }

    .first-text {
        margin-top: 2rem;
    }

    .last-text {
        margin-bottom: 4rem;
    }

    /* Mobile responsive adjustments */
    @media (max-width: 768px) {
        .header-headline-container {
            flex-direction: column;
            position: relative;
        }

        .headline {
            margin-left: 1rem;
            margin-right: 1rem;
            font-size: 1.8rem;
            line-height: 2.2rem;
            margin-top: 0.5rem;
        }
    }
</style>