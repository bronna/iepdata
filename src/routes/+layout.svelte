<script>
    import '$lib/styles/styles.css'
    import { colors } from '$lib/styles/colorConfig.js'

    import Header from '$lib/components/Header.svelte'
    import Footer from '$lib/components/Footer.svelte'
    import FeedbackComponent from '$lib/components/FeedbackComponent.svelte'

    let cssColors = `
        --colorInclusiveDark: ${colors.colorInclusiveDark};
        --colorInclusiveGray: ${colors.colorInclusiveGray};
        --colorInclusive: ${colors.colorInclusive};
        --colorSemiInclusive: ${colors.colorSemiInclusive};
        --colorNonInclusive: ${colors.colorNonInclusive};
        --colorSeparate: ${colors.colorSeparate};
        --colorText: ${colors.colorText};
        --colorDarkGray: ${colors.colorDarkGray};
        --colorMediumGray: ${colors.colorMediumGray};
        --colorLightGray: ${colors.colorLightGray};
        --colorLightLightGray: ${colors.colorLightLightGray};
        --colorWhite: ${colors.colorWhite};
        --colorBackground: ${colors.colorBackground};
        --colorBackgroundWhite: ${colors.colorBackgroundWhite};
        --colorBackgroundLightGray: ${colors.colorBackgroundLightGray};
        --colorBackgroundLightOrange: ${colors.colorBackgroundLightOrange};
    `
</script>


<div class="app" style="{cssColors}">
    <Header />

    <main>
        <slot />
    </main>

    <FeedbackComponent />

    <Footer />
</div>


<style>
    :global(:root) {
        --font-body: 'Source Sans 3', sans-serif;
        --font-headers: 'Bitter', serif;
        --column-width: 42rem;
        --column-margin-top: 4rem;
        --shadow: 1px 2px 6px rgba(0, 0, 0, 0.15);
    }
    
    :global(*) {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    :global(section) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    :global(.text-width) {
        max-width: 44rem;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
    }

    :global(.header) {
        color: var(--colorText);
        font-size: 1.3rem;
        letter-spacing: 0.01rem;
        font-weight: 700;
        font-family: 'Bitter', serif;
        margin-right: 1rem;
        margin-bottom: 1rem;
    }

    :global(.asterisk ){
        font-size: 0.9rem;
        color: var(--colorDarkGray);
        line-height: 1.2rem;
    }

    @media (max-width: 768px) {
        :global(.text-width) {
            padding: 0 1rem;
        }
    }
    
    .app {
        width: 100%;
        min-height: 100vh;
        font-family: var(--font-body);
        color: var(--color-text);
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        background-color: var(--colorBackgroundWhite);
    }
</style>