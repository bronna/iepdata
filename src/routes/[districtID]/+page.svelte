<script>
    import { data } from "$lib/stores/stores.js"
    import { page } from '$app/stores'
    import { colors } from "$lib/styles/colorConfig"
    import { Pencil } from 'lucide-svelte'
    import InclusionRing from '$lib/components/InclusionRing.svelte'
    import StateMap from "$lib/components/StateMap.svelte"
    import DonutChart from '$lib/components/DonutChart.svelte'
    import CardCarousel from '$lib/components/CardCarousel.svelte'
    import InclusionLegend from '$lib/components/InclusionLegend.svelte'
    import AlertsCards from '$lib/components/AlertsCards.svelte'
    import Divider from "$lib/components/Divider.svelte"
    import Sources from "$lib/components/Sources.svelte"

    $: districtID = $page.params.districtID
    // $: districtData = $data.filter(d => d.properties.GEOID === districtID)[0].properties
    // $: stateData = $data.filter(d => d.properties.GEOID === '999999')[0].properties
    $: districtData = $data?.filter(d => d?.properties?.GEOID === districtID)[0]?.properties ?? {}
    $: stateData = $data?.filter(d => d?.properties?.GEOID === '999999')[0]?.properties ?? {}

    $: console.log(districtData)

    const mapWidth = 1000; // Set this to the original width of your map
    const mapHeight = 600; // Set this to the original height of your map
    const mapScale = 0.1; // Set this to your desired scale

    $: alerts = [
        {name: "Suspension/Expulsion", value: districtData.SuspExplFg},
        {name: "Suspension/Expulsion by race", value: districtData.SuspExplRaceEthnicityFg},
        {name: "Disproportionate representation", value: districtData.DisPrptnRprsntnFg},
        {name: "Disproportionate representation by disability", value: districtData.DisPrptnRprsntnDsbltyFg},
    ]

    $: inclusionCategories = [
        {group: "inclusive", colorIdentifier: "colorInclusive", value: districtData["LRE Students >80%"], definition: "these students spend more than 80% of their day in a regular classroom"},
        {group: "semi-inclusive", colorIdentifier: "colorSemiInclusive", value: districtData["LRE Students >40% <80%"], definition: "these students spend 40% to 80% of their day in a regular classroom"},
        {group: "non-inclusive", colorIdentifier: "colorNonInclusive", value: districtData["LRE Students <40%"], definition: "these students spend less than 40% of their day in a regular classroom"},
        {group: "separate", colorIdentifier: "colorSeparate", value: districtData["LRE Students Separate Settings"], definition: "these students are in a hospital, incarcerated, etc."},
    ]

    $: gradRates = [
        {group: "graduated", value: districtData["IEP 4Yr Cohort Grad 18-19"]},
        {group: "notGraduated", value: 100 - districtData["IEP 4Yr Cohort Grad 18-19"]},
    ]

    let gradDonutCenterText = ''
    $: if (districtData['IEP 4Yr Cohort Grad 18-19'] === 5) {
        gradDonutCenterText = '<' + Math.round(districtData['IEP 4Yr Cohort Grad 18-19']) + '%';
    } else if (districtData['IEP 4Yr Cohort Grad 18-19'] === 95) {
        gradDonutCenterText = '>' + Math.round(districtData['IEP 4Yr Cohort Grad 18-19']) + '%';
    } else {
        gradDonutCenterText = Math.round(districtData['IEP 4Yr Cohort Grad 18-19']) + '%';
    }

    $: stateAvgGradRate = stateData['IEP 4Yr Cohort Grad 18-19']
</script>


{#if districtData}
  <div class="district-info">
    
    <div class="text-width metric" id="header">
        <h1 class="district-name text-width">{districtData["Institution Name"]}</h1>
        <div class="map-container" style="--map-width: {mapWidth}px; --map-height: {mapHeight}px;">
            <StateMap districtData={districtData} />
        </div>
        <div>
            <div class="inclusion-ring-container">
                <InclusionRing 
                    data={districtData}
                />
                {#if districtData["Total Student Count"] < 500 && districtData.weighted_inclusion}
                    <span class="uncertainty">*</span>
                {/if}
            </div>
            <p class="inclusion-score">out of 4</p>
        </div>
    </div>

    <div class="text-width metric iep-percent">
        <p><strong>{districtData["Students with Disabilities"]}% </strong>of students in this district have an IEP</p>
    </div>

    <div class="text-width metric">
        <h3 class="header">Inclusion Breakdown</h3>
        <div class="inclusion-breakdown">
            <DonutChart
                data={inclusionCategories}
                chartColors = {[colors.colorInclusive, colors.colorSemiInclusive, colors.colorNonInclusive, colors.colorSeparate]}
                centerText={+districtData["Total Student Count"].toLocaleString()}
                centerText2="students"
                centerText3="with IEPs"
            />
            <InclusionLegend data={inclusionCategories} />
        </div>
    </div>

    <div class="text-width metric">
        <h3 class="header">Alerts</h3>
        <!-- <p class="asterisk">*discipline rates lower than usual due to remote learning</p> -->
        {#if districtData["Total Student Count"] && alerts}
            <AlertsCards alertsData={alerts} />
        {:else}
            <p>No data available</p>
        {/if}
    </div>

    <div class="text-width metric">
        <h3 class="header">4-Year Graduation Rate for Students with IEPs</h3>
        <!-- <p class="asterisk">*school year 2018-19</p> -->
        <div class="grad-donut">
            {#if districtData["Total Student Count"]}
                <DonutChart 
                    height = {160}
                    width = {160}
                    outerRadius = {80}
                    innerRadius = {55}
                    barSpacing = {0.7}
                    data = {gradRates} 
                    chartColors = {[colors.colorInclusive, colors.colorLightGray]}
                    centerText={gradDonutCenterText}
                    indicator={[{group: "gradRate", value: stateAvgGradRate}, {group: "notGradRate", value: 100 - stateAvgGradRate}]}
                    indicatorLabel={`State Avg: ${Math.round(stateAvgGradRate)}%`}
                />
            {:else}
                <p>No data available</p>
            {/if}
        </div>
    </div>

    <div class="text-width metric">
        {#if districtData}
            <CardCarousel districtData={districtData} data={$data} />
        {/if}
    </div>
  </div>
    
{/if}

<Divider>
    <Pencil />
</Divider>

<Sources />


<style>
    .district-info {
        background-color: var(--colorBackgroundWhite);
        padding-top: 1rem;
    }

    .district-name {
        letter-spacing: 0.04rem;
        text-align: left;
    }

    .metric {
        margin-top: 2.5rem;
        margin-bottom: 2.5rem;
        align-items: center;
    }

    #header {
        display: flex;
        flex-direction: row;
        gap: 2rem;
    }

    .inclusion-breakdown {
        display: flex;
        flex-direction: row;
        gap: 2rem;
    }

    @media (max-width: 600px) {
        .inclusion-breakdown {
            flex-wrap: wrap;
        }
    }

    .inclusion-score {
        font-size: 0.8rem;
        margin-top: 0.15rem;
        font-weight: 600;
    }

    .inclusion-ring-container {
        display: flex;
        align-items: center; /* Vertically center the contents */
    }

    .uncertainty {
        margin-left: 4px; /* Adjust as needed for spacing */
        align-self: flex-start; /* Align asterisk to the top */
        font-size: 1.6rem;
        color: var(--colorDarkGray);
        margin-left: 0.25rem;
    }

    .map-container {
        transform: scale(var(--map-scale, 0.1));
        transform-origin: top left;
        width: calc(var(--map-width) * var(--map-scale, 0.1));
        height: calc(var(--map-height) * var(--map-scale, 0.1));
    }

    .iep-percent {
        margin-top: -2rem;
        display: flex;
        justify-content: flex-start;
    }

    .iep-percent p {
        font-size: 1.1rem;
        background-color: var(--colorDarkGray);
        color: var(--colorBackgroundWhite);
        padding: 0.25rem 0.5rem;
        display: inline-block;
        margin: 0;
    }

    .grad-donut {
        margin-top: 1rem;
    }
</style>