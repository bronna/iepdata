<script>
    import { colors } from "$lib/styles/colorConfig"
    import QuestionBubble from "$lib/components/QuestionBubble.svelte"

    export let setting
    export let value
    export let definition
    export let index
    export let identifier
</script>


<div class="setting">
    <strong 
        class="setting-amount" 
        style:color={colors[identifier]}
    >
        {(value).toFixed(1)}%
    </strong>
    {index === 0 ? 'of students with IEPs are in an' : 'are in a'}
    <strong 
        class="setting-name" 
        style:background-color={colors[identifier]} 
        style:color={colors.colorWhite}
    >
        {setting}
    </strong>
    <QuestionBubble definition={definition} />
    setting
</div>


<style>
    .setting {
        margin-top: 0.3rem;
    }

    .setting-amount {
        font-weight: 700;
        font-size: 1.3rem;
        letter-spacing: 0.04rem;
    }

    .setting-name {
        font-weight: 600;
        font-size: 0.9rem;
        text-transform: uppercase;
        padding: 1px 6px;
        letter-spacing: 0.04rem;
    }
</style>