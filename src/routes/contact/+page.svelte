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
            <h1 class="headline">Contact</h1>
        </div>

        {#if windowWidth > 768}
            <!-- Desktop: Header to the right of the headline -->
            <div class="header-container-desktop">
                <SideHeader />
            </div>
        {/if}
    </div>

    <div class="content-container">
        <div class="text-width contact">
            <p>
                We're always looking to improve these tools to make them more helpful and accessible! We'd love to hear from you.
            </p>
            <p>
                You can contact us by email at <strong>disabilityeddata@protonmail.com</strong>.
            </p>
            <p>
                Thank you!
            </p>
        </div>
    </div>
</div>


<style>
    .contact {
        margin-top: 4rem;
        margin-bottom: 4rem;
    }
</style>
