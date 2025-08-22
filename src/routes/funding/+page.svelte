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
                Oregon caps special education funding at 11% of each school district's enrollment. If there are any students beyond that number, <strong>districts have to fund those services themselves.</strong>
            </p>

            <p>
                Want to see how many districts fall under that cap?
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
                When districts serve students beyond the 11% threshold, they absorb those costs locally. This creates a funding gap that districts must address through other means.
            </p>
            <p>
                What does this mean for students? Educators know that every month of delay makes intervention harder, and that the earlier you intervene, the less expensive and more effective support becomes. That's why you see so many districts continuing to identify students beyond, in many cases way beyond, the 11% cap. Oregon's system punishes exactly the approach that works best for kids, and costs less in the long run.
            </p>

            <h3>
                The lonely funding cap club
            </h3>
            <p>
                Turns out, only <strong>five other states</strong> in the entire country cap special education funding. Not only that, but Oregon's cap is the lowest of all of them. By a lot.
            </p>
            <p>
                The cap was set in the early 1990s, back when we understood far less about learning differences and intervention strategies. It hasn't budged since, even as our knowledge about supporting students with disabilities has transformed completely.
            </p>

            <h3>
                What this means
            </h3>
            <p>
                The consistent gap between the funding cap and actual student need suggests a structural mismatch. Districts across Oregon are identifying students who need special education services at rates significantly higher than what the state funds.
            </p>
            <p>
                This isn't about any single district's approach, it's a statewide pattern.
            </p>

            <h3>
                What can you do?
            </h3>
            <p>
                Unfortunately, legislators decided not to modify the funding cap in the 2025 session.  <a href="https://olis.oregonlegislature.gov/liz/2025R1/Measures/Overview/HB2953" target="_blank">HB 2953</a> would have removed the cap, and <a href="https://olis.oregonlegislature.gov/liz/2025R1/Measures/Overview/HB2448" target="_blank">HB 2448</a> would have increased funding to the High Cost Disabilities Account, but neither bill passed.
            </p>
            <p>
                This is not the end of the road, however. Your state representative and senator need to hear from you about the impact of the funding cap on your students and your district. If you want to see change, <a href="https://geo.maps.arcgis.com/apps/instant/lookup/index.html?appid=fd070b56c975456ea2a25f7e3f4289d1" target="_blank">reach out</a> to them and let them know how this affects you.
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