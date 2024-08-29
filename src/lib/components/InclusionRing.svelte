<script>
    import { minWeightedInclusion, maxWeightedInclusion } from "$lib/stores/stores"
    import DonutChart from "$lib/components/DonutChart.svelte"
    import { colors } from "$lib/styles/colorConfig"
    import { scaleOrdinal } from "d3"

    export let data

    $: donutData = [
        {group: "inclusionScore", value: data.weighted_inclusion - $minWeightedInclusion},
        {group: "remainder", value: $maxWeightedInclusion - data.weighted_inclusion},
    ]

    $: colorScale = scaleOrdinal()
        .domain([1, 2, 3, 4])
        .range([colors.colorSeparate, colors.colorNonInclusive, colors.colorSemiInclusive, colors.colorInclusive])
</script>


<div class="ring">
    <DonutChart 
        data = {donutData}
        innerRadius={17}
        outerRadius={22}
        width={44}
        height={44}
        chartColors={[colorScale(data.quartile), colors.colorBackgroundWhite]}
        centerTextScore={data.quartile ? data.quartile : "-"}
    />
</div>


<style>
    .ring {
        position: relative;
        width: 42px;
        height: 42px;
    }
</style>