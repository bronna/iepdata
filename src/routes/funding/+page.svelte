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
            <h1 class="headline">The 11% cap: is it enough for Oregon's students with disabilities?</h1>
        </div>
        
        {#if windowWidth > 768}
            <!-- Desktop: Header to the right of the headline -->
            <div class="header-container-desktop">
                <SideHeader />
            </div>
        {/if}
    </div>

    <div class="content-container">

        <div class="text-width">
            <h3 class="byline">
                Updated with data from the 2023-24 school year
            </h3>

            <p> 
                If any district has more than 11% of its students with disabilities, the state cuts off funding for those services. Oregon caps special education funding at 11% and any more than that, <strong>districts have to fund themselves.</strong>
            </p>

            <p>
                How many districts fall under that cap?
            </p>
        </div>

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
                Almost none of them.
            </p>

            <h3>
                The funding shortfall
            </h3>
            <p>
                Only <strong>six other states</strong> cap special education funding. And Oregon's is on the lower end. The cap was set in the early 1990s, back when we understood far less about learning differences and intervention strategies.
            </p>

            <p>
               Every month of delay makes intervention harder, and the earlier you intervene the less expensive, and more effective, support becomes. That's why you see so many districts continuing to identify students beyond, in many cases way beyond, the 11% cap, even though it creates financial liability for them. The state's system punishes exactly the approach that works best and costs less in the long run.
            </p>

            <h3>
                A structural mismatch
            </h3>
            <p>
                The consistent gap between the funding cap and actual student need suggests a widespread issue. Districts across Oregon are identifying students who need special education services at rates significantly higher than what the state funds.
            </p>
            <p>
                Unfortunately, legislators decided not to modify the funding cap in the 2025 session.  <a href="https://olis.oregonlegislature.gov/liz/2025R1/Measures/Overview/HB2953" target="_blank">HB 2953</a> would have removed the cap, and <a href="https://olis.oregonlegislature.gov/liz/2025R1/Measures/Overview/HB2448" target="_blank">HB 2448</a> would have increased funding to the High Cost Disabilities Account, but neither bill passed.
            </p>
            <p>
                This is not the end of the road, however. Your state representative and senator need to hear from you about the impact of the funding cap on your students and your district. <a href="https://geo.maps.arcgis.com/apps/instant/lookup/index.html?appid=fd070b56c975456ea2a25f7e3f4289d1" target="_blank">Reach out</a> and let them know.
            </p>
        </div>

        <Divider>
            <Pencil />
        </Divider>

        <SourcesFunding />
    </div>
</div>

<style>
    .headline {
        color: var(--colorInclusive);
        max-width: 44rem;
    }

    @media (max-width: 768px) {
        .headline {
            margin-top: 3rem;
        }
    }

    .byline {
        font-size: 1rem;
        margin-bottom: 0.6rem;
        color: var(--colorNonInclusive);
    }
    
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