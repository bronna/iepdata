<script>
    import { goto } from '$app/navigation'

    export let linkId
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-missing-attribute -->
<a 
    on:click={() => goto(`/${linkId}`)}
    class="card-link"
    tabindex="0"
    role="button"
>
    <div class="card">
        <header>
            <slot name="header"></slot>
        </header>
        <div class="content">
            <slot name="content"></slot>
        </div>
    </div>
</a>


<style>
    .card-link {
        text-decoration: none;
        color: inherit;
    }
    
    .card {
        flex: 0 0 auto;
        background-color: var(--colorBackgroundWhite);
        cursor: pointer;
        border-radius: 1rem;
        box-shadow: var(--shadow);
        padding: 1.5rem 1rem;
        margin: 1.5rem 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 170px;
        min-height: 210px;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .card:hover {
        transform: scale(1.03);
        box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.18);
    }

    header {
        font-size: 1.1rem;
        font-weight: 700;
        font-family: 'Bitter', serif;
        text-align: center;
        white-space: normal;
        word-wrap: break-word;
        max-width: 100%;
        overflow-wrap: break-word;
        flex-grow: 1;
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;
    }

    .card:hover header {
        opacity: 1;
    }

    .content {
        display: flex;
        align-items: center;
        white-space: normal;
        word-wrap: break-word;
        max-width: 100%;
        overflow-wrap: break-word;
    }
</style>