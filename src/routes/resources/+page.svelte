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
            <h1 class="headline">Resources</h1>
        </div>

        {#if windowWidth > 768}
            <!-- Desktop: Header to the right of the headline -->
            <div class="header-container-desktop">
                <SideHeader />
            </div>
        {/if}
    </div>

    <div class="content-container">
        <div class="text-width resources">
            <div class="link">
                <a href="https://factoregon.org/" target="_blank">FACT Oregon</a>
                <p>Has a support line and appointments for families who need help navigating systems of services for their disabled loved ones. They also have courses-on-demand, seminars, and much more.</p>
            </div>
            <div class="link">
                <a href="https://www.droregon.org/" target="_blank">Disability Rights Oregon</a>
                <p>Legal advocacy organization for people of all ages with disabilities, including children and students. Some of their work, for example, has contributed to the passing of legislation that ends restraint and seclusion practices in schools, and makes it illegal to deny students with disabilities the right to attend school for the full day.</p>
            </div>
            <div class="link">
                <a href="https://sites.ed.gov/idea/" target="_blank">Individuals with Disabilities Act (IDEA)</a>
                <p>The federal law enacted to make sure all children have the right to a free and appropriate public education. IDEA also specifies that children with disabilities have the right to be educated in the 'least restrictive environment,' or, in other words, in as mainstream an environment as possible with the needed supports provided.</p>
            </div>
        </div>
    </div>
</div>


<style>
    .resources {
        margin-top: 4rem;
        margin-bottom: 4rem;
    }

    .link a {
        font-weight: bold;
        color: var(--colorInclusiveDark);
        font-size: 1.2rem;
    }
</style>