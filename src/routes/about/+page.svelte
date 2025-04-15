<script>
    import SideHeader from '$lib/components/SideHeader.svelte'

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
            <h1>About</h1>
        </div>

        {#if windowWidth > 768}
            <!-- Desktop: Header to the right of the headline -->
            <div class="header-container-desktop">
                <SideHeader />
            </div>
        {/if}
    </div>

    <div class="content-container">
        <div class="text-width about">
            <p>
                This project makes data about disabled students in Oregon more accessible and understandable for families, students, and advocates. It started after Brianna spent a summer calling principals of elementary schools all over Oregon and California to get a sense of what her child's grade school experience might look like. Very quickly, she was disturbed by the lack of transparency and consistency in supports that disabled students receive in different areas. She sought out data that could give her a better sense of things. Soon, she realized this data could also be used by others, to help them understand the landscape of supports for the disabled students they're advocating for.
            </p>
        </div>
    </div>
</div>


<style>
    .about {
        margin-top: 4rem;
        margin-bottom: 4rem;
    }
</style>
