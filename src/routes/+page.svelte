<svelte:head>
    <title>Data on inclusion for students with disabilities</title>
    <meta name="Inclusion Data" content="Data on inclusion for students with disabilities" />
</svelte:head>

<script>
    import { data, selectedDistrict, selectedDistrictData } from "$lib/stores/stores.js"
    import Beeswarm from "$lib/components/Beeswarm.svelte"
    import Scroller from "$lib/components/Scroller.svelte"
    import StateMap from "$lib/components/StateMap.svelte"
    import SelectDistricts from "$lib/components/SelectDistricts.svelte"
    import DistrictsBeeswarm from "$lib/components/DistrictsBeeswarm.svelte"
    import TableOfDistricts from "$lib/components/TableOfDistricts.svelte"
    import Sources from "$lib/components/Sources.svelte"

    console.log($data)

    // Scroller variables
    let index, offset, progress
	let top = 0
	let threshold = 0.1
	let bottom = 0.8

    let isDistrictSelected = false
    $: isDistrictSelected = $selectedDistrict && $selectedDistrict.length > 0
</script>


<div class="intro">
    <div class="beeswarm-container">
        <Beeswarm />
    </div>

    <h1 class="headline">
        Explore inclusion data for school districts near you
    </h1>

    <h3 class="byline text-width">
        Updated with data from the 2022-23 school year
    </h3>

    <StateMap />

    <p class="text-width">
        When a family with a child with disabilities moves, they're often surprised to find that their child’s services change. Sometimes drastically. Services they depended on before can vanish. Services they didn’t know about can appear. Both are distressing in their own ways, and largely out of their control.
    </p>
    <p class="text-width">
        Many of these services take place at school. By law, all children with disabilities are entitled to learn in the “least restrictive environment,” meaning they have the right to be included in typical settings as much as possible, with the accommodations they would need to do so. This doesn’t get applied consistently between schools, districts, and states, however. The reality that many families have found is that a disabled student cannot expect to receive similar levels and types of services on one side of a line versus another.
    </p>
    <p class="text-width">
        Data, however, gives us one perspective into these disparities. Every year districts report on if their students with disabilities are in typical or separate settings, how often they are disciplined, if certain racial groups are disproportionately represented in certain disability groups, what their graduation rates are, and more.
    </p>
    <p class="text-width">
        This site makes that data accessible and clear for families, educators, and policymakers to use. Keep scrolling to explore.
    </p>
</div>

<Scroller 
    top={top} 
    threshold={threshold} 
    bottom={bottom} 
    bind:index 
    bind:offset 
    bind:progress
>
    <div slot="background" class="background">
        <SelectDistricts />

        {#if isDistrictSelected}
            <DistrictsBeeswarm index={index} />
        {:else}
            <p>Please select a district to view the data.</p>
        {/if}
    </div>

    <div slot="foreground">
        <section>
        </section>
        {#if isDistrictSelected}
            <section>
                <div class="text-foreground"><strong>{$selectedDistrictData[0].properties["Institution Name"]}</strong>'s inclusion score is <strong>{$selectedDistrictData[0].properties.quartile}</strong> out of <strong>4</strong></div>
            </section>
            <section>
                <div class="text-foreground">Each circle in this graphic represents a school district in the state. The farther right the circle is, the higher its inclusion score.</div>
            </section>
            <section>
                <div class="text-foreground">Scaling the circles shows how many students with <strong>IEP</strong>s the district has.</div>
            </section>
            <section>
                <div class="text-foreground">(An <strong>IEP</strong> is an <strong> I</strong>ndividualized <strong> E</strong>ducation <strong> P</strong>lan -- a document that every student with a disability has. It outlines what supports and services the student will receive at school)</div>
            </section>
            <section>
                <div class="text-foreground">Here is {$selectedDistrictData[0].properties["Institution Name"]} relative to the <strong>largest districts</strong> in the state</div>
            </section>
            <section>
                <div class="text-foreground">And to the the <strong>districts it touches</strong>.</div>
            </section>
        {:else}
            <section>
                <div class="text-foreground">Please select a district to view detailed information.</div>
            </section>
        {/if}
        <section>
            <div class="text-foreground">Explore this chart, or the table below, to learn more
        </section>
    </div>
</Scroller>

<div class="table">
    <TableOfDistricts data={$data} />
</div>

<Sources />


<style>
    .intro {
        margin-bottom: 2rem;
        position: relative;
    }

    .beeswarm-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1;
    }

    .headline {
        width: 100%;
        max-width: 48rem;
        margin: 18rem auto 3rem auto;
        text-align: left;
        color: var(--colorInclusiveGray);
        background: var(--colorBackgroundWhite);
        position: relative;
        z-index: 2;
        
        /* Add padding */
        padding: 1rem 2rem;
        
        /* Offset the padding with negative margin */
        margin-top: calc(18rem - 1rem);
        margin-bottom: calc(3rem - 1rem);
        margin-left: 0rem;
        
        /* Ensure the element takes up full width plus padding */
        box-sizing: border-box;
        width: calc(100% + 4rem);

        /* Add subtle shadow */
        box-shadow: var(--shadow);
    }

    @media (max-width: 768px) {
        .headline {
            width: 100%;
            margin-left: auto;
            margin-right: auto;
            padding: 1rem 1rem;
        }
    }

    .byline {
        font-size: 1rem;
        margin-bottom: 0.75rem;
        color: var(--colorNonInclusive);
    }

    .no-scroll {
        overflow-y: hidden !important;
    }

    .background {
        background-color: var(--colorBackgroundWhite);
        padding-bottom: 2rem;
        box-shadow: var(--shadow);
    }

    section {
        height: 100vh;
        max-width: 40rem;
        margin: 0 auto;
    }

    .text-foreground {
        display: inline;
        padding: 0.2rem 0.7rem;
        color: var(--colorWhite);
        background-color: var(--colorDarkGray);
        font-size: 1.2rem;
        box-shadow: var(--shadow);
        max-width: 90%;
    }

    .table {
        background-color: var(--colorBackgroundWhite);
        box-shadow: var(--shadow);
        z-index: 5;
    }
</style>