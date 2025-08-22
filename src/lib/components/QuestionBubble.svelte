<script>
    export let definition

    // Hold the currently opened tooltip
    let currentOpenTooltip = null

    function tooltip(node, content) {

        function showTooltip(event) {
            let tooltip = node.nextElementSibling
            tooltip.innerHTML = content

            // Close the currently open tooltip if it exists
            if (currentOpenTooltip && currentOpenTooltip !== tooltip) {
                currentOpenTooltip.style.display = 'none'
            }

            // Update the currently open tooltip
            currentOpenTooltip = tooltip.style.display === 'block' ? null : tooltip

            if (tooltip.style.display === 'block') {
                tooltip.style.display = 'none'
                document.removeEventListener('click', outsideClickListener)
            } else {
                tooltip.style.display = 'block'
                setTimeout(() => {
                    document.addEventListener('click', outsideClickListener)
                }, 0)
            }

            // Prevent this click from being propagated to document
            event.stopPropagation()
        }

        function outsideClickListener() {
            let tooltip = node.nextElementSibling
            tooltip.style.display = 'none'

            // If this tooltip was the current one open, set currentOpenTooltip to null
            if (currentOpenTooltip === tooltip) {
                currentOpenTooltip = null
            }

            document.removeEventListener('click', outsideClickListener)
        }

        node.addEventListener('click', showTooltip)

        return {
            destroy() {
                node.removeEventListener('click', showTooltip)
                document.removeEventListener('click', outsideClickListener)
            }
        }
    }
</script>


<div class="tooltip-container">
    <span class="question-bubble" style="cursor:pointer;" use:tooltip={definition}></span>
    <div class="tooltip">{definition}</div>
</div>


<style>
    .tooltip-container {
        display: inline-flex;
        position: relative;
        padding-right: 4px;
    }

    .question-bubble {
        display: inline-block;
        position: absolute;
        top: -20px;
        left: -3px;
        width: 14px;
        height: 14px;
        background-color: var(--colorBackgroundWhite);
        border-radius: 50%;
        border: 1px solid var(--colorText);
        margin-left: -5px;
        cursor: pointer;
        text-align: center;
        line-height: 13px;
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--colorText);
        transition: background-color 0.3s, color 0.3s;
    }

    .question-bubble:before {
        content: '?';
    }

    .question-bubble:hover {
        background-color: var(--colorText);
        color: white;
    }

    .tooltip {
        display: none;
        padding: 10px;
        color: var(--colorText);
        background-color: white;
        position: absolute;
        top: -6px;
        right: 10px;
        z-index: 1;
        border-radius: 4px;
        min-width: 200px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    }
</style>