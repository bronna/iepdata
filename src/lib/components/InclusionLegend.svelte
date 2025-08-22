<script>
    import LegendLine from '$lib/components/LegendLine.svelte'

    export let data
    $: lines = data
</script>


<div class="state-data text-width">
    {#each lines as line, i}
        <LegendLine 
            identifier={line.colorIdentifier}
            setting={line.group}
            value={line.value}
            definition={line.definition}
            index={i}
        />
    {/each}
</div>


<style>
    .state-data {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
    }
</style>