<script>
    import { goto } from '$app/navigation'
    import { writable, derived } from "svelte/store"
    import { arrowUp, arrowDown } from "$lib/utils/arrows.js"
    import InclusionRing from "$lib/components/InclusionRing.svelte"

    export let data

    let width
    $: dimensions = { 
        width,
        margin: width <= 768 ? { top: 0, right: 20, bottom: 20, left: 20 } : { top: 0, right: 30, bottom: 20, left: 30 },
    }

    const sortKey = writable("Total Student Count")
    const sortOrder = writable(-1)
    const visibleRows = writable(9)
    const showAllRows = writable(false)

    function sortBy(key) {
        sortKey.set(key)
        sortOrder.update(n => -n)
    }

    const sortedDistrictsData = derived(
        [sortKey, sortOrder],
        ([$sortKey, $sortOrder]) => {
            if (!$sortKey) return data

            let filteredData = data.filter(item => 
                item.properties["Institution Name"] != null && 
                item.properties["Institution Name"] !== "undefined" &&
                item.properties["Institution Name"].trim() !== "" &&
                item.properties["GEOID"] !== '999999'
            )

            return filteredData.sort((a, b) => {
                let aValue = a.properties[$sortKey]
                let bValue = b.properties[$sortKey]
                
                if (["Total Student Count", "weighted_inclusion", "Students with Disabilities", "nAlerts"].includes($sortKey)) {
                    aValue = aValue === null || aValue === undefined ? -Infinity : Number(aValue)
                    bValue = bValue === null || bValue === undefined ? -Infinity : Number(bValue)
                    return $sortOrder * (aValue - bValue)
                }
                
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return $sortOrder * aValue.localeCompare(bValue)
                }
                
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

<table class="district-table">
    <thead>
        <tr>
            <th on:click={() => sortBy("Institution Name")} class:sorted={$sortKey === "Institution Name"}>
                <span class="header-content">
                    <span class="header-text">DISTRICT </span>
                    <span class="sort-arrow">
                        {@html $sortKey === "Institution Name" ? ($sortOrder === 1 ? arrowUp : arrowDown) : arrowDown}
                    </span>
                </span>
            </th>
            <th on:click={() => sortBy("weighted_inclusion")} class:sorted={$sortKey === "weighted_inclusion"}>
                <span class="header-content">
                    <span class="header-text">INCLUSION SCORE</span>
                    <span class="sort-arrow">
                        {@html $sortKey === "weighted_inclusion" ? ($sortOrder === 1 ? arrowUp : arrowDown) : arrowDown}
                    </span>
                </span>
            </th>
            <th on:click={() => sortBy("Total Student Count")} class:sorted={$sortKey === "Total Student Count"}>
                <span class="header-content">
                    <span class="header-text">STUDENTS WITH IEPs</span>
                    <span class="sort-arrow">
                        {@html $sortKey === "Total Student Count" ? ($sortOrder === 1 ? arrowUp : arrowDown) : arrowDown}
                    </span>
                </span>
            </th>
            <th class="hide-mobile" on:click={() => sortBy("Students with Disabilities")} class:sorted={$sortKey === "Students with Disabilities"}>
                <span class="header-content">
                    <span class="header-text">% OF STUDENTS IN DISTRICT WITH IEPs</span>
                    <span class="sort-arrow">
                        {@html $sortKey === "Students with Disabilities" ? ($sortOrder === 1 ? arrowUp : arrowDown) : arrowDown}
                    </span>
                </span>
            </th>
            <th class="hide-mobile" on:click={() => sortBy("nAlerts")} class:sorted={$sortKey === "nAlerts"}>
                <span class="header-content">
                    <span class="header-text">ALERTS</span>
                    <span class="sort-arrow">
                        {@html $sortKey === "nAlerts" ? ($sortOrder === 1 ? arrowUp : arrowDown) : arrowDown}
                    </span>
                </span>
            </th>
            <th class="hide-mobile settings-column">
                <div class="settings-header">
                    <div class="settings-title">
                        % STUDENTS WITH IEPs IN A SETTING THAT IS:
                        <!-- <span class="sort-arrow">
                            {@html $sortKey === "nAlerts" ? ($sortOrder === 1 ? arrowUp : arrowDown) : arrowDown}
                        </span> -->
                    </div>
                    <div class="settings-categories">
                        <span>INCLUSIVE</span>
                        <span>SEMI-INCL</span>
                        <span>NON-INCL</span>
                        <span>SEPARATE</span>
                    </div>
                </div>
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
                <td>
                    {#if district.properties["Total Student Count"]}
                        <span class="underline-on-hover">{district.properties["Total Student Count"].toLocaleString()}</span>
                    {:else}
                        <span class="no-data">-</span>
                    {/if}
                </td>
                <td class="hide-mobile">
                    {#if district.properties["Students with Disabilities"]}
                        <span class="underline-on-hover">{district.properties["Students with Disabilities"].toLocaleString()}%</span>
                    {:else}
                        <span class="no-data">-</span>
                    {/if}
                </td>
                <td class="hide-mobile">
                    {#if district.properties["nAlerts"]}
                        <span class="underline-on-hover">{district.properties["nAlerts"]}</span>
                    {:else}
                        <span class="no-data">-</span>
                    {/if}
                </td>
                <td class="hide-mobile settings-data">
                    {#if district.properties["LRE Students >80%"]}
                        <div class="settings-values">
                            <span>{district.properties["LRE Students >80%"].toFixed(1)}%</span>
                            <span>{district.properties["LRE Students >40% <80%"].toFixed(1)}%</span>
                            <span>{district.properties["LRE Students <40%"].toFixed(1)}%</span>
                            <span>{district.properties["LRE Students Separate Settings"].toFixed(1)}%</span>
                        </div>
                    {:else}
                        <span class="no-data">-</span>
                    {/if}
                </td>
                <td class="arrow-cell">
                    <span class="more underline-on-hover">more ></span>
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
    /* Base Table Styles */
    table {
        border-collapse: collapse;
        width: 90%;
        margin: 2rem auto;
    }

    th, td {
        padding: 8px 12px;
        text-align: left;
    }

    /* Column Widths */
    th:nth-child(1), td:nth-child(1) { width: 20%; }
    th:nth-child(2), td:nth-child(2) { width: 10%; }
    th:nth-child(3), td:nth-child(3) { width: 10%; }
    th:nth-child(4), td:nth-child(4) { width: 10%; }
    th:nth-child(5), td:nth-child(5) { width: 10%; }
    th:nth-child(6), td:nth-child(6) { width: 25%; }
    th:nth-child(7), td:nth-child(7) { width: 5%; }

    /* Header Styles */
    thead {
        border-bottom: 1px solid var(--colorDarkGray);
    }

    th {
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
        display: flex;
        text-align: right;
        align-items: center;
    }

    th:not(:nth-child(2), :nth-child(3), :nth-child(4), :nth-child(5)) .header-content {
        text-align: left;
        width: fit-content;
    }

    .header-text {
        width: fit-content;
    }

    /* Center-aligned Headers */
    th:nth-child(2) .header-content,
    th:nth-child(3) .header-content,
    th:nth-child(4) .header-content,
    th:nth-child(5) .header-content {
        justify-content: center;
        width: 100%;
    }

    /* Sort Arrow Styles */
    .sort-arrow {
        display: inline-flex;
        align-items: center;
        margin-left: 8px;
        opacity: 0.5;
    }

    th.sorted {
        color: var(--colorInclusive);
        opacity: 1;
    }

    th.sorted .sort-arrow {
        opacity: 1;
    }

    /* Table Body Styles */
    tbody tr {
        transition: background-color 0.3s ease;
    }

    tbody tr:hover {
        background-color: var(--colorLightLightGray);
    }

    tbody tr[tabindex="0"] {
        cursor: pointer;
    }

    /* District Name Column */
    .district-name {
        font-size: 1.2rem;
        font-weight: 700;
        line-height: 1.5rem;
        letter-spacing: 0.0rem;
        white-space: normal;
        cursor: pointer;
    }

    /* Inclusion Score Column */
    .district-metric {
        white-space: normal;
        text-align: center;
    }

    .district-metric .metric-content {
        min-height: 42px;
    }

    .inclusion-ring-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .metric-content {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .uncertainty {
        margin-left: 4px;
        align-self: flex-start;
        font-size: 1.6rem;
        color: var(--colorText);
    }

    /* Center-aligned Columns */
    td:nth-child(3),
    td:nth-child(4),
    td:nth-child(5) {
        text-align: center;
    }

    /* Settings Column */
    .settings-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .settings-title {
        text-align: center;
        width: 100%;
        margin-bottom: 0.5rem;
    }

    .settings-categories {
        display: flex;
        justify-content: space-between;
        width: 100%;
        white-space: nowrap;
    }

    .settings-categories span {
        text-align: center;
        flex: 1;
        font-size: 0.8rem;
        background-color: var(--colorInclusive);
        color: var(--colorWhite);
        padding: 2px;
    }

    .settings-values {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .settings-values span {
        text-align: center;
        flex: 1;
        font-weight: 600;
    }

    /* Settings Colors */
    .settings-categories span:nth-child(1) {
        background-color: var(--colorInclusive);
    }
    .settings-values span:nth-child(1) {
        color: var(--colorInclusive);
    }

    .settings-categories span:nth-child(2){
        background-color: var(--colorSemiInclusive);
    }
    .settings-values span:nth-child(2) {
        color: var(--colorSemiInclusive);
    }

    .settings-categories span:nth-child(3) {
        background-color: var(--colorNonInclusive);
    }
    .settings-values span:nth-child(3) {
        color: var(--colorNonInclusive);
    }

    .settings-categories span:nth-child(4) {
        background-color: var(--colorSeparate);
    }
    .settings-values span:nth-child(4) {
        color: var(--colorSeparate);
    }

    /* More Column */
    .arrow-cell {
        white-space: nowrap;
    }

    .more {
        color: var(--colorMediumGray);
    }

    tbody tr:hover .more {
        color: var(--colorText);
    }

    /* Underline Hover Effect */
    .underline-on-hover {
        position: relative;
        display: inline-block;
        padding-right: 0;
    }

    .underline-on-hover::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        bottom: -2px;
        left: 0;
        background-color: var(--colorText);
        color: var(--colorDarkGray);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    tbody tr:hover .underline-on-hover::after {
        opacity: 1;
    }

    /* No Data State */
    .no-data {
        color: var(--colorText);
        font-style: italic;
    }

    /* Show More Button */
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

    /* Mobile Styles */
    @media (max-width: 768px) {
        /* Hide original table headers */
        thead {
            display: none;
        }

        /* Make each row a flex container */
        tbody tr {
            display: flex;
            flex-wrap: wrap;
            padding: 1rem 0;
            border-bottom: 1px solid var(--colorLightGray);
        }

        /* Adjust all cells for mobile layout */
        tbody td {
            padding: 0.25rem;
        }

        /* District name cell - full width top */
        td.district-name {
            width: 60%;
            order: 1;
        }

        /* Inclusion score - top right */
        td.district-metric {
            width: 40%;
            order: 2;
            text-align: right;
        }

        /* Stats (IEP numbers) - bottom left */
        td:nth-child(3),
        td:nth-child(4) {
            width: 50%;
            order: 3;
            font-size: 0.9rem;
            padding-top: 1rem;
        }

        /* Settings column - bottom right */
        td.settings-data {
            width: 50%;
            order: 4;
            padding-top: 1rem;
        }

        /* Adjust settings values for mobile */
        .settings-values {
            flex-direction: column;
            align-items: flex-end;
        }

        .settings-values span {
            text-align: right;
            padding: 0.1rem 0;
        }

        /* Alerts and More - bottom */
        td:nth-child(5),
        td.arrow-cell {
            width: 50%;
            order: 5;
            padding-top: 0.5rem;
        }

        td.arrow-cell {
            text-align: right;
        }

        /* Add "SETTINGS" label */
        .settings-data::before {
            content: 'SETTINGS';
            display: block;
            font-size: 0.7rem;
            color: var(--colorMediumGray);
            text-align: right;
            margin-bottom: 0.25rem;
        }
    }
</style>