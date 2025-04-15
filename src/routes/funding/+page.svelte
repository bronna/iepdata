<script>
    import SideHeader from '$lib/components/SideHeader.svelte'
    import { fade } from 'svelte/transition'
    import SwarmIdentificationSize from '$lib/components/SwarmIdentificationSize.svelte'
    import Divider from "$lib/components/Divider.svelte"
    import { Pencil } from 'lucide-svelte'
    import SourcesFunding from "$lib/components/SourcesFunding.svelte"
    
    let windowWidth = 0
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="page-container">
    {#if windowWidth <= 768}
        <!-- Mobile: Header above the headline -->
        <div class="header-container-mobile">
            <SideHeader />
        </div>
    {/if}
    
    <div class="header-headline-container">
        <div class="headline-container">
            <h1 class="headline">Oregon's special education funding problem: the 11% cap</h1>
        </div>
        
        {#if windowWidth > 768}
            <!-- Desktop: Header to the right of the headline -->
            <div class="header-container-desktop">
                <SideHeader />
            </div>
        {/if}
    </div>

    <div class="content-container">

        <div class="map-container">
            <div>
                <SwarmIdentificationSize />
            </div>
            <div class="source">
                Graphic: Brianna Wilson, Disability + Education Data <br />
                Data: Oregon Dept of Education
            </div>
        </div>

        <div class="text-width last-text">
            <p> 
                Oregon's special education funding cap falls significantly short of meeting the needs of school districts across the state. The majority of Oregon's districts fall well above the threshold, with many more than 11% of their students needing Individualized Education Plans (IEPs).
            </p>

            <h3>
                What does this mean?
            </h3>
            <p>
                This funding structure creates a disincentive for districts to identify students with disabilities. When districts identify students beyond the 11% cap, they must absorb costs not funded by the state. Despite this disincentive, districts are still identifying many more students as needing supports.
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
                Talk to your legislators (find them <a href="https://geo.maps.arcgis.com/apps/instant/lookup/index.html?appid=fd070b56c975456ea2a25f7e3f4289d1" target="_blank">here</a>). There is a bill moving through the state legislature to <a href="https://olis.oregonlegislature.gov/liz/2025R1/Measures/Overview/HB2953" target="_blank">remove the special education funding cap</a>. Another one would <a href="https://olis.oregonlegislature.gov/liz/2025R1/Measures/Overview/HB2448" target="_blank">increase funds to the High Cost Disabilities Account</a>. Tell your legislators that you support these bills and want to see them passed.
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
</style>