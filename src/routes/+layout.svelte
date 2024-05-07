<script>
    import '$lib/styles/styles.css'
    import { colors } from '$lib/styles/colorConfig.js'

    import Header from '$lib/components/Header.svelte'
    import Footer from '$lib/components/Footer.svelte'

    let cssColors = `
        --color-inclusive-dark: ${colors.inclusiveDark};
        --color-inclusive: ${colors.inclusive};
        --color-semi-inclusive: ${colors.semiInclusive};
        --color-non-inclusive: ${colors.nonInclusive};
        --color-separate: ${colors.separate};
        --color-text: ${colors.text};
        --color-dark-gray: ${colors.darkGray};
        --color-medium-gray: ${colors.mediumGray};
        --color-light-gray: ${colors.lightGray};
        --color-light-light-gray: ${colors.lightLightGray};
        --color-background: ${colors.background};
    `
</script>


<div class="app" style="{cssColors}">
    <Header />
    <main>
        <slot />
    </main>
    <Footer />
</div>


<style>
    :global(:root) {
        --font-body: 'Source Sans 3', sans-serif;
        --font-headers: 'Bitter', serif;
        --column-width: 42rem;
        --column-margin-top: 4rem;
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
        max-width: 48rem;
        width: 100%;
        margin: 0 auto;
    }

    @media (max-width: 768px) {
        :global(.text-width) {
            padding: 0 1rem;
        }
    }
    
    .app {
        width: 100%;
        min-height: 100vh;
        background-color: var(--color-background);
        font-family: var(--font-body);
        color: var(--color-text);
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding-top: 1rem;
        margin: 0 auto;
    }
</style>