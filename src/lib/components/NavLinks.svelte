<script>
    export let direction = 'horizontal'
    export let colorTheme = 'light'

    $: linkColor = colorTheme === 'light' ? 'var(--colorDarkGray)' : 'var(--colorDarkGray)(--colorWhite)'
</script>

<nav class={direction} style="--linkColor: {linkColor}">
    <a href="/inclusion">Inclusion</a>
    <a href="/funding">Funding</a>
    <a href="/about">About</a>
    <a href="/resources">Resources</a>
    <a href="/contact">Contact</a>
    <a href="/subscribe" class="attention">Stay Updated</a>
</nav>

<style>
    nav {
        display: flex;
        align-items: center;
    }

    .horizontal {
        flex-direction: row;
    }

    .vertical {
        flex-direction: column;
        align-items: flex-start;
    }

    a {
        margin-right: 2.7rem;
        letter-spacing: 0.01rem;
        text-transform: uppercase;
        font-size: 0.9rem;
        text-decoration: none;
        color: var(--linkColor);
        font-weight: bold;
        line-height: 1.2;
        transition: color 0.3s ease;
    }

    .vertical a {
        margin-right: 0;
        margin-bottom: 1rem;
    }

    a:hover {
        color: var(--colorInclusiveGray);
    }

    a:last-child {
        margin-right: 0;
    }

    .attention {
        background-color: var(--colorNonInclusive);
        color: var(--colorWhite);
        padding: 0.45rem 0.9rem;
        border-radius: 90px;
        display: inline-block;
        text-align: center;
        transition: background-color 0.3s ease;
    }

    .attention:hover {
        background-color: var(--colorInclusiveDark);
        color: var(--colorWhite);
    }
</style>