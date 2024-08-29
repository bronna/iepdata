<script>
    import { goto } from '$app/navigation'
    import { writable, derived } from "svelte/store"
    import { arrowUp, arrowDown } from "$lib/utils/arrows.js"
    import InclusionRing from "$lib/components/InclusionRing.svelte"

    export let data

    const sortKey = writable("Total Student Count")
    const sortOrder = writable(-1)
    const visibleRows = writable(9)
    const showAllRows = writable(false)

    function sortBy(key) {
        sortKey.set(key)
        sortOrder.update(n => -n) // toggle between ascending and descending
    }

    const sortedDistrictsData = derived(
        [sortKey, sortOrder],
        ([$sortKey, $sortOrder]) => {
            if (!$sortKey) return data

            // Filter out items with undefined, null, or "undefined" Institution Name and state data row
            let filteredData = data.filter(item => 
                item.properties["Institution Name"] != null && 
                item.properties["Institution Name"] !== "undefined" &&
                item.properties["Institution Name"].trim() !== "" &&
                item.properties["GEOID"] !== '999999'
            )

            // Then sort the filtered data
            return filteredData.sort((a, b) => {
                let aValue = a.properties[$sortKey]
                let bValue = b.properties[$sortKey]
                
                // For numeric fields
                if (["Total Student Count", "weighted_inclusion", "Students with Disabilities"].includes($sortKey)) {
                    // Convert to numbers, treating null/undefined as -Infinity
                    aValue = aValue === null || aValue === undefined ? -Infinity : Number(aValue)
                    bValue = bValue === null || bValue === undefined ? -Infinity : Number(bValue)
                    return $sortOrder * (aValue - bValue)
                }
                
                // For strings
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return $sortOrder * aValue.localeCompare(bValue)
                }
                
                // For other types or mixed types, convert to string
                aValue = aValue === null || aValue === undefined ? '' : String(aValue)
                bValue = bValue === null || bValue === undefined ? '' : String(bValue)
                return $sortOrder * aValue.localeCompare(bValue)
            })
        }
    )

    function navigateToDistrict(districtGEOID) {
        goto(`/${districtGEOID}`)
    }

    function toggleShowMore() {
        showAllRows.update(value => !value)
        if($showAllRows) {
            visibleRows.set($sortedDistrictsData.length)
        } else {
            visibleRows.set(9)
        }
    }
</script>

<table class="text-width">
    <thead>
        <tr>
            <th on:click={() => sortBy("Institution Name")} class:sorted={$sortKey === "Institution Name"}>
                <span class="header-content">
                    NAME
                    <span class="sort-arrow">
                        {@html $sortKey === "Institution Name" ? ($sortOrder === 1 ? arrowUp : arrowDown) : arrowDown}
                    </span>
                </span>
            </th>
            <th on:click={() => sortBy("weighted_inclusion")} class:sorted={$sortKey === "weighted_inclusion"}>
                <span class="header-content">
                    INCLUSION SCORE
                    <span class="sort-arrow">
                        {@html $sortKey === "weighted_inclusion" ? ($sortOrder === 1 ? arrowUp : arrowDown) : arrowDown}
                    </span>
                </span>
            </th>
            <th on:click={() => sortBy("Total Student Count")} class:sorted={$sortKey === "Total Student Count"}>
                <span class="header-content">
                    # OF STUDENTS WITH IEPs
                    <span class="sort-arrow">
                        {@html $sortKey === "Total Student Count" ? ($sortOrder === 1 ? arrowUp : arrowDown) : arrowDown}
                    </span>
                </span>
            </th>
            <th class="hide-mobile" on:click={() => sortBy("Students with Disabilities")} class:sorted={$sortKey === "Students with Disabilities"}>
                <span class="header-content">
                    % OF STUDENTS WITH IEPs
                    <span class="sort-arrow">
                        {@html $sortKey === "Students with Disabilities" ? ($sortOrder === 1 ? arrowUp : arrowDown) : arrowDown}
                    </span>
                </span>
            </th>
        </tr>
    </thead>
    <tbody>
        {#each $sortedDistrictsData.slice(0, $visibleRows) as district (district.properties.GEOID)}
            <tr 
                on:click={() => navigateToDistrict(district.properties.GEOID)} 
                tabindex="0" 
                role="button"
            >
                <td class="district-name">
                    <span class="underline-on-hover">{district.properties["Institution Name"]}</span>
                </td>
                <td class="district-metric">
                    <div class="inclusion-ring-container">
                        <div class="metric-content">
                            <InclusionRing data={district.properties} />
                        </div>
                        {#if district.properties["Total Student Count"] < 500 && district.properties.weighted_inclusion}
                            <span class="uncertainty">*</span>
                        {/if}
                    </div>
                </td>
                <td class="student-count">
                    {#if district.properties["Total Student Count"]}
                        <span class="underline-on-hover">{district.properties["Total Student Count"].toLocaleString()}</span>
                    {:else}
                        <span class="no-data">-</span>
                    {/if}
                </td>
                <td class="iep-percentage hide-mobile">
                    {#if district.properties["Students with Disabilities"]}
                        <span class="underline-on-hover">{district.properties["Students with Disabilities"].toLocaleString()}%</span>
                    {:else}
                        <span class="no-data">-</span>
                    {/if}
                </td>
                <td class="arrow-cell">
                    <div class="arrow-cell-content">
                        <svg viewBox="0 0 24 24" width="12" height="12" class="inline-arrow">
                            <path d="M9 18l6-6-6-6" fill="none" stroke="currentColor" stroke-width="3" />
                        </svg>
                    </div>
                </td>
            </tr>
        {/each}
    </tbody>
</table>

{#if $sortedDistrictsData.length > 10}
    <div class="show-more-container">
        <button on:click={toggleShowMore} class="show-more-button">
            {$showAllRows ? "show less" : "show more"}
        </button>
    </div>
{/if}

<style>
    table {
        border-collapse: collapse;
        width: 100%;
        margin-top: 5rem;
    }
    
    th, td {
        padding: 8px 12px;
    }

    @media (max-width: 768px) {
        th, td {
            font-size: 0.75rem;
            padding: 6px 8px;
        }

        th:nth-child(1), td:nth-child(1) {
            width: 50%;
        }

        th:nth-child(2), td:nth-child(2) {
            width: 30%;
            text-align: center;
        }

        th:nth-child(3), td:nth-child(3) {
            width: 20%;
            text-align: right;
        }

        .hide-mobile {
            display: none;
        }
    }

    th {
        border-bottom: 1px solid var(--colorDarkGray);
        text-align: left;
        vertical-align: middle;
        line-height: 1rem;
        font-size: 0.85rem;
        letter-spacing: 0.01rem;
        color: var(--colorText);
        cursor: pointer;
        position: relative;
        opacity: 0.8;
    }

    .header-content {
        display: inline-flex;
        align-items: center;
        gap: 4px;
    }

    .sort-arrow {
        display: inline-block;
        margin-left: 4px;
        opacity: 0.5;
    }

    th.sorted {
        color: var(--colorInclusive);
        opacity: 1;
    }

    th.sorted .sort-arrow {
        opacity: 1;
    }

    tbody tr {
        transition: background-color 0.3s ease;
    }

    tbody tr:hover {
        background-color: var(--colorLightLightGray);
    }

    tbody tr:hover .arrow-cell-content {
        opacity: 1;
    }

    tbody tr[tabindex="0"] {
        cursor: pointer;
    }

    th:nth-child(1), td:nth-child(1) { width: 30%; }
    th:nth-child(2), td:nth-child(2) { width: 20%; }
    th:nth-child(3), td:nth-child(3) { width: 20%; }
    th:nth-child(4), td:nth-child(4) { width: 20%; }
    th:nth-child(5), td:nth-child(5) { width: 10%; }

    .underline-on-hover {
        position: relative;
        display: inline-block;
    }

    .underline-on-hover::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        bottom: -2px;
        left: 0;
        background-color: var(--colorText);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    tbody tr:hover .underline-on-hover::after {
        opacity: 1;
    }

    .arrow-cell {
        text-align: right;
        padding-right: 1rem;
        white-space: nowrap;
    }

    .arrow-cell-content {
        display: inline-flex;
        align-items: center;
        justify-content: flex-end;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .table-nav {
        font-size: 0.8rem;
        color: var(--colorText);
        font-weight: 600;
        letter-spacing: 0.01rem;
        margin-right: 0.25rem;
    }

    .inline-arrow {
        vertical-align: middle;
        flex-shrink: 0;
    }

    .student-count, .iep-percentage {
        text-align: center;
    }

    .no-data {
        color: var(--colorText);
        font-style: italic;
    }

    .district-name {
        font-size: 1.2rem;
        font-weight: 700;
        line-height: 1.5rem;
        letter-spacing: 0.0rem;
        white-space: normal;
        cursor: pointer;
    }

    .district-metric {
        text-align: center;
        white-space: normal;
        padding-left: 2.25rem;
    }

    .district-metric .metric-content {
        min-height: 42px;
    }

    .inclusion-ring-container {
        display: flex;
        align-items: center;
    }

    .metric-content {
        display: flex;
        align-items: center;
    }

    .uncertainty {
        margin-left: 4px;
        align-self: flex-start;
        font-size: 1.6rem;
        color: var(--colorText);
        margin-left: 0.25rem;
    }

    .student-count, .iep-percentage {
        font-size: 1.2rem;
        white-space: normal;
        text-align: right;
        padding-right: 2rem;
    }

    .show-more-container {
        text-align: center;
        margin-top: 1.5rem;
        margin-bottom: 3rem;
    }

    .show-more-button {
        color: var(--colorBackgroundWhite);
        text-transform: uppercase;
        border: 1.5px solid var(--colorText);
        border-radius: 20px;
        background-color: var(--colorDarkGray);
        padding: 0.5rem 1rem;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.04rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .show-more-button:hover {
        background-color: var(--colorMediumGray);
    }
</style>