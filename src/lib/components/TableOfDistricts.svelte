<!-- Enhanced TableOfDistricts.svelte -->
<script>
    import { goto } from '$app/navigation'
    import { writable, derived } from "svelte/store"
    import { arrowUp, arrowDown } from "$lib/utils/arrows.js"
    import InclusionRing from "$lib/components/InclusionRing.svelte"
    import { selectedDistricts } from '$lib/stores/stores.js'

    export let data

    let width
    
    const sortKey = writable("Total Student Count")
    const sortOrder = writable(-1)
    const visibleRows = writable(8) // Increased default to accommodate selected districts
    const showAllRows = writable(false)

    function sortBy(key) {
        sortKey.set(key)
        sortOrder.update(n => -n)
    }

    // Enhanced data processing that prioritizes selected districts
    // Need to make this reactive to selectedDistricts changes
    $: processedData = (() => {
        if (!data) return { selectedData: [], otherData: [] }

        // Filter out invalid districts
        const validData = data.filter(item => 
            item.properties["Institution Name"] != null && 
            item.properties["Institution Name"] !== "undefined" &&
            item.properties["Institution Name"].trim() !== "" &&
            item.properties["GEOID"] !== '999999'
        )

        // Separate selected and non-selected districts
        const selectedData = validData.filter(item => 
            $selectedDistricts && $selectedDistricts.includes(item.properties.GEOID)
        )
        
        const otherData = validData.filter(item => 
            !$selectedDistricts || !$selectedDistricts.includes(item.properties.GEOID)
        )

        // Sort function
        const sortFunction = (a, b) => {
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
        }

        // Sort both arrays
        selectedData.sort(sortFunction)
        otherData.sort(sortFunction)

        return { selectedData, otherData }
    })()

    // Combined data for display - also reactive
    $: displayData = [
        ...processedData.selectedData,
        ...processedData.otherData
    ]

    function navigateToDistrict(districtGEOID) {
        goto(`/${districtGEOID}`)
    }

    function toggleShowMore() {
        showAllRows.update(value => !value)
        if($showAllRows) {
            visibleRows.set(displayData.length)
        } else {
            visibleRows.set(8)
        }
    }

    // Check if we have selected districts to show the divider
    $: hasSelectedDistricts = $selectedDistricts && $selectedDistricts.length > 0
</script>

<div class="table-container">
    <!-- {#if hasSelectedDistricts}
        <div class="selected-districts-header">
            <h3>Selected Districts ({$selectedDistricts.length})</h3>
            <p>These districts are highlighted based on your selection above</p>
        </div>
    {/if} -->

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
            {#each displayData.slice(0, $visibleRows) as district, index (district.properties.GEOID)}
                <!-- Show divider after selected districts -->
                <!-- {#if hasSelectedDistricts && index === processedData.selectedData.length && processedData.otherData.length > 0}
                    <tr class="section-divider">
                        <td colspan="7">
                            <div class="divider-content">
                                <span>All Other Districts</span>
                            </div>
                        </td>
                    </tr>
                {/if} -->
                
                <tr 
                    on:click={() => navigateToDistrict(district.properties.GEOID)} 
                    tabindex="0" 
                    role="button"
                    class:selected-district={$selectedDistricts.includes(district.properties.GEOID)}
                >
                    <!-- Desktop View -->
                    <td class="district-name hide-mobile">
                        <div class="name-container">
                            <!-- {#if $selectedDistricts.includes(district.properties.GEOID)}
                                <span class="selected-indicator">★</span>
                            {/if} -->
                            <span class="underline-on-hover">{district.properties["Institution Name"]}</span>
                        </div>
                    </td>
                    <td class="district-metric hide-mobile">
                        <div class="inclusion-ring-container">
                            <div class="metric-content">
                                <InclusionRing data={district.properties} />
                            </div>
                            {#if district.properties["Total Student Count"] < 500 && district.properties.weighted_inclusion}
                                <span class="uncertainty">*</span>
                            {/if}
                        </div>
                    </td>
                    <td class="hide-mobile">
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
                        {#if district.properties["nAlerts"] !== null && district.properties["nAlerts"] !== undefined}
                            {#if district.properties["nAlerts"] > 0}
                                <span class="underline-on-hover" style="font-weight: 900; font-size: 1.4rem; color: rgb(222, 84, 102);">
                                    {'!'.repeat(district.properties["nAlerts"])}
                                </span>
                            {:else}
                                <span class="no-data">0</span>
                            {/if}
                        {:else}
                            <span class="no-data">coming soon</span>
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
                    <td class="arrow-cell hide-mobile">
                        <span class="more underline-on-hover">more ></span>
                    </td>

                    <!-- Mobile View -->
                    <div class="mobile-district-column show-mobile">
                        <div class="mobile-name-container">
                            <!-- {#if $selectedDistricts.includes(district.properties.GEOID)}
                                <span class="selected-indicator">★</span>
                            {/if} -->
                            <span class="district-name">{district.properties["Institution Name"]}</span>
                        </div>
                        <div class="district-stats">
                            {#if district.properties["Total Student Count"] && district.properties["Students with Disabilities"]}
                                <span class="stat-emphasis">{district.properties["Total Student Count"].toLocaleString()}</span>, or <span class="stat-emphasis">{district.properties["Students with Disabilities"].toLocaleString()}%</span>,
                                of students have an IEP
                            {:else}
                                <span class="no-data">No data available</span>
                            {/if}
                        </div>
                    </div>

                    <div class="mobile-inclusion-column show-mobile">
                        <div class="inclusion-score">
                            <InclusionRing data={district.properties} /> 
                            {#if district.properties["Total Student Count"] < 500 && district.properties.weighted_inclusion}
                                <span class="uncertainty">*</span>
                            {/if}
                            <span class="score-proportion"> / 4</span>
                        </div>
                        {#if district.properties["LRE Students >80%"]}
                            <span class="settings-label">educational settings</span>
                            <div class="settings-values">
                                <span class="setting-info">{district.properties["LRE Students >80%"].toFixed(1)}% inclusive</span>
                                <span class="setting-info">{district.properties["LRE Students >40% <80%"].toFixed(1)}% semi-incl</span>
                                <span class="setting-info">{district.properties["LRE Students <40%"].toFixed(1)}% non-incl</span>
                                <span class="setting-info">{district.properties["LRE Students Separate Settings"].toFixed(1)}% separate</span>
                            </div>
                        {:else}
                            <span class="no-data">No settings data available</span>
                        {/if}
                    </div>

                    <div class="mobile-alerts-row show-mobile">
                        <div class="mobile-alerts">
                            {#if district.properties["nAlerts"] !== null && district.properties["nAlerts"] !== undefined}
                                {#if district.properties["nAlerts"] > 0}
                                    <span class="underline-on-hover" style="font-weight: 900; font-size: 1rem; color: rgb(222, 84, 102);">
                                        Alerts: {'!'.repeat(district.properties["nAlerts"])}
                                    </span>
                                {:else}
                                    <span>No alerts</span>
                                {/if}
                            {:else}
                                <span class="no-data">Alerts data coming soon</span>
                            {/if}
                        </div>
                        <span class="mobile-more">more ></span>
                    </div>
                </tr>
            {/each}
        </tbody>
    </table>

    {#if displayData.length > 8}
        <div class="show-more-container">
            <button on:click={toggleShowMore} class="show-more-button">
                {$showAllRows ? "show less" : "show more"}
            </button>
        </div>
    {/if}
</div>

<style>
    .table-container {
        width: 90%;
        margin: 0 auto;
    }

    .selected-districts-header {
        margin: 2rem auto 1rem;
        text-align: center;
        max-width: 600px;
    }

    .selected-districts-header h3 {
        color: var(--colorInclusive);
        font-family: var(--font-headers);
        margin-bottom: 0.5rem;
    }

    .selected-districts-header p {
        color: var(--colorDarkGray);
        font-size: 0.9rem;
        margin: 0;
    }

    /* Selected district styling */
    .selected-district {
        background-color: color-mix(in srgb, var(--colorInclusive) 5%, transparent);
        border-left: 4px solid var(--colorInclusive);
    }

    .selected-indicator {
        color: var(--colorInclusive);
        font-weight: 700;
        margin-right: 0.5rem;
        font-size: 1.1rem;
    }

    .name-container,
    .mobile-name-container {
        display: flex;
        align-items: center;
    }

    /* Section divider */
    .section-divider {
        border: none;
        background: none;
    }

    .section-divider td {
        padding: 1rem 0 0.5rem 0;
        border-bottom: none;
    }

    .divider-content {
        text-align: center;
        font-size: 0.9rem;
        color: var(--colorDarkGray);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
        position: relative;
    }

    .divider-content::before,
    .divider-content::after {
        content: '';
        position: absolute;
        top: 50%;
        width: 30%;
        height: 1px;
        background-color: var(--colorLightGray);
    }

    .divider-content::before {
        left: 0;
    }

    .divider-content::after {
        right: 0;
    }

    /* Rest of existing styles... */
    table {
        border-collapse: collapse;
        width: 100%;
        margin: 2rem 0;
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
    tbody tr:not(.section-divider) {
        transition: background-color 0.3s ease;
    }

    tbody tr:not(.section-divider):hover {
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
        margin-left: -3px;
        margin-right: -7px;
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

    /* Mobile/Desktop Visibility */
    .show-mobile {
        display: none;
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
        .table-container {
            width: 100%;
        }

        .hide-mobile {
            display: none !important;
        }

        .show-mobile {
            display: block;
        }

        thead {
            display: none;
        }

        tbody tr:not(.section-divider) {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
            gap: 1rem;
            padding: 1.5rem 1rem;
            border-bottom: 1px solid var(--colorLightGray);
        }

        .section-divider {
            display: block;
            grid-column: 1 / -1;
        }

        /* Left Column - District Info */
        .mobile-district-column {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .mobile-district-column .district-name {
            font-size: 1.2rem;
            font-weight: 800;
            line-height: 1.3;
            margin-bottom: 0.5rem;
        }

        .mobile-district-column .district-stats {
            font-size: 1rem;
            line-height: 1.4;
            color: var(--colorText);
        }

        .mobile-district-column .district-stats .stat-emphasis {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--colorText);
        }

        /* Right Column - Inclusion Info */
        .mobile-inclusion-column {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 0.5rem;
        }

        .mobile-inclusion-column .inclusion-score {
            display: flex;
            align-items: end;
            gap: 0.5rem;
            margin-bottom: 0.8rem;
        }

        .mobile-inclusion-column .inclusion-score .score-proportion {
            font-size: 1.2rem;
        }

        .mobile-inclusion-column .settings-label {
            font-size: 0.8rem;
            text-transform: uppercase;
            font-weight: 700;
            color: var(--colorMediumGray);
            margin-bottom: 0rem;
        }

        .mobile-inclusion-column .settings-values {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 0.2rem;
            font-size: 1rem;
        }

        .mobile-inclusion-column .settings-values .setting-info {
            font-weight: 700;
        }

        .mobile-inclusion-column .settings-values span {
            white-space: nowrap;
        }

        /* Bottom Row - Alerts and More */
        .mobile-alerts-row {
            grid-column: 1 / -1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 0.5rem;
            font-size: 0.9rem;
        }

        .mobile-alerts {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--colorDarkGray);
            font-size: 1rem;
        }

        .mobile-more {
            color: var(--colorText);
            font-weight: 700;
        }
    }
</style>