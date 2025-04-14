<script>
    import { fade } from 'svelte/transition'
    import SwarmIdentificationSize from '$lib/components/SwarmIdentificationSize.svelte'
    import Divider from "$lib/components/Divider.svelte"
    import { Pencil } from 'lucide-svelte'
    import SourcesFunding from "$lib/components/SourcesFunding.svelte"
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
                Oregon's special education funding cap falls significantly short of meeting the needs of school districts across the state. Many of Oregon's largest districts identify well above the 11% threshold, with some of the largest districts finding that 18% of their students need Individualized Education Plans (IEPs). Those additional services go unfunded by the state.
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
            <h3>
                What does this mean?
            </h3>
            <p>
                This funding structure creates a problematic disincentive for districts to identify students with disabilities. When districts identify students beyond the 11% cap, they must absorb those additional costs without corresponding state support. Despite the disincentive, districts are still identifying many more than 11% of their students needing supports. And if students don't get those supports there can be devastating, and even more expensive, effects down the road.
            </p>
            <h3>
                How does this compare to other states?
            </h3>
            <p>
                Only seven other states have a cap on special education funding. None of them are as low as Oregon's 11%.
            </p>
            <h3>
                Next steps
            </h3>
            <p>
                Talk to your legislators (find them <a href="https://geo.maps.arcgis.com/apps/instant/lookup/index.html?appid=fd070b56c975456ea2a25f7e3f4289d1" target="_blank">here</a>). There are a couple of bills moving through the state legislature right now, one to <a href="https://olis.oregonlegislature.gov/liz/2025R1/Measures/Overview/HB2953" target="_blank">remove the special education funding cap</a>, and one to <a href="https://olis.oregonlegislature.gov/liz/2025R1/Measures/Overview/HB2448" target="_blank">increase funds to the High Cost Disabilities Account</a>. Tell your legislators that you support these bills and want to see them passed.
            </p>
        </div>

        <Divider>
            <Pencil />
        </Divider>

        <SourcesFunding />
    </div>
</div>

<style>
    a {
        color: var(--colorInclusiveDark);
        font-weight: 600;
    }

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