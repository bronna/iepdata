<script>
    import { scaleOrdinal, pie, arc } from "d3"
    import { colors } from "$lib/styles/colorConfig"
    import SVGChart from "$lib/components/SVGChart.svelte"

    export let data
    export let innerRadius = 70
    export let outerRadius = 100
    export let width = 200
    export let height = 200
    export let chartColors = []
    export let centerText = ''
    export let centerText2 = ''
    export let centerText3 = ''
    export let centerTextScore = ''
    export let barSpacing = 0.5
    export let indicator = null
    export let indicatorLabel = null

    let dimensions = {
        width: width,
        height: height,
        margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    }

    const padAngle = barSpacing * 0.0174533  // Convert from degrees to radians

    let colorScale, pieFunc, pieData, arcGenerator, indicatorAngle, angle

    $: if (data && data.length > 0) {
        colorScale = scaleOrdinal()
            .domain(data.map(d => d.group))
            .range(chartColors)

        pieFunc = pie()
            .value(d => d.value)
            .sort(null)
            .padAngle(padAngle)

        pieData = pieFunc(data)
        
        arcGenerator = arc().innerRadius(innerRadius).outerRadius(outerRadius)

        // calculate angle if there's an indicator line
        angle = pie().value(d => d.value).sort(null)

        if (indicator !== null) {
            indicatorAngle = angle(indicator)[0].endAngle - (Math.PI / 2)
        }
    }
</script>


<div class="donut-chart">
    <SVGChart {dimensions} originCenter=true>
        {#each pieData as d (d.data.group)}
            <path d={arcGenerator(d)} fill={colorScale(d.data.group)} />
        {/each}

        {#if indicator !== null}
            <line 
                x1={Math.cos(indicatorAngle) * (innerRadius - 5)} 
                y1={Math.sin(indicatorAngle) * (innerRadius - 5)} 
                x2={Math.cos(indicatorAngle) * (outerRadius + 5)}
                    y2={Math.sin(indicatorAngle) * (outerRadius + 5)}
                stroke={colors.colorDarkGray} 
                stroke-width="4" 
            />
            <text
                x=-38
                y=30
                dominant-baseline="start"
                text-anchor="start"
                fill={colors.colorWhite}
                font-size="0.9rem"
                font-weight="600"
                stroke={colors.colorWhite}
                stroke-width="3"
            >
                {indicatorLabel}
            </text>
            <text
                x=-38
                y=30
                dominant-baseline="start"
                text-anchor="start"
                fill={colors.colorText}
                font-size="0.9rem"
                font-weight="600"
            >
                {indicatorLabel}
            </text>
        {/if}

        <text x="0" y={centerText2 ? "-18" : "0"} dominant-baseline="middle" text-anchor="middle" fill={colors.colorText} font-size="2.2rem" font-weight="bold">
            {centerText}
        </text>
        {#if centerText2}
            <text x="0" y="12" dominant-baseline="middle" text-anchor="middle" fill={colors.colorText} font-size="1.2rem">
                {centerText2}
            </text>
        {/if}
        {#if centerText3}
            <text x="0" y="32" dominant-baseline="middle" text-anchor="middle" fill={colors.colorText} font-size="1.2rem">
                {centerText3}
            </text>
        {/if}
        {#if centerTextScore}
            <text x="0" y="2" dominant-baseline="middle" text-anchor="middle" fill={colors.colorText} font-size="1.8rem" font-weight="bold">
                {centerTextScore}
            </text>
        {/if}
    </SVGChart>
</div>


<style>
    /* .donut-chart {
        margin-top: 0.5rem;
        padding-bottom: 1rem;
    } */
</style>