<script>
    import { colors } from "$lib/styles/colorConfig"

    export let alertsData
</script>


<div class="alerts">
    {#each alertsData as alert}
        <div class="alert-card">
            {#if alert.value === "Yes"}
                <div class="svg-container">
                    <!-- exclamation mark -->
                    <svg width="20px" height="90px" viewBox="0 0 20 90" xmlns="http://www.w3.org/2000/svg" style="transform: scale(0.5);">
                        <line 
                            x1="10" y1="20" 
                            x2="10" y2="60" 
                            stroke={colors.colorSeparate} 
                            stroke-width="12" 
                            stroke-linecap="round"
                        />
                        <circle 
                            cx="10" cy="80" 
                            r="8" 
                            fill={colors.colorSeparate}
                        />
                    </svg>
                    <!-- check mark -->
                    <svg width="77px" height="90px" viewBox="0 0 77 90" style="transform: scale(0.75);">
                        <path 
                            d="M7,55 L27,75 L67,25" 
                            stroke={colors.colorLightGray} 
                            stroke-width="12" 
                            fill="none" 
                            stroke-linecap="round" 
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
            {:else}
                <div class="svg-container">
                    <!-- exclamation mark -->
                    <svg width="20px" height="90px" viewBox="0 0 20 90" style="transform: scale(0.75);">
                        <line 
                            x1="10" y1="20" 
                            x2="10" y2="60" 
                            stroke={colors.colorLightGray} 
                            stroke-width="12" 
                            stroke-linecap="round"
                        />
                        <circle 
                            cx="10" cy="80" 
                            r="8" 
                            fill={colors.colorLightGray}
                        />
                    </svg>
                    <!-- check mark -->
                    <svg width="77px" height="90px" viewBox="0 0 77 90" style="transform: scale(0.75);">
                        <path 
                            d="M7,55 L27,75 L67,25" 
                            stroke={colors.colorInclusive} 
                            stroke-width="12" 
                            fill="none" 
                            stroke-linecap="round" 
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
            {/if}

            {#if alert.name === "Suspension/Expulsion"}
                <p class="alert-description">{alert.value === "No" ? "No reports of disproportionate discipline of students with IEPs*" : "This district reported disproportionate discipline of students with IEPs"}</p>
            {:else if alert.name === "Suspension/Expulsion by race"}
                <p class="alert-description">{alert.value === "No" ? "No reports of disproportionate discipline of students in certain racial groups with IEPs*" : "This district reported disproportionate discipline of students in certain racial groups with IEPs"}</p>
            {:else if alert.name === "Disproportionate representation"}
                <p class="alert-description">{alert.value === "No" ? "No reports of disproportionate identification of students in certain racial groups as having a disability" : "This district reported disproportionate identification of students in certain racial groups as having a disability"}</p>
            {:else if alert.name === "Disproportionate representation by disability"}
                <p class="alert-description">{alert.value === "No" ? "No reports of disproportionate identification of students in certain racial groups as having a certain disability" : "This district reported disproportionate identification of students in certain racial groups as having a specific disability"}</p>
            {/if}
        </div>
    {/each}
</div>


<style>
    .alerts {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1rem;
        max-width: 100%;
    }

    .alert-card {
        width: 100%;
        max-width: 140px;
        margin-top: -0.5rem;
    }

    .alert-card p {
        margin-top: -1rem;
        line-height: 1.4rem;
    }

    .alert-description {
        font-size: 0.9rem;
        margin-bottom: 0;
    }

    .svg-container {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-bottom: 1rem;
    }
</style>