<svelte:head>
    <title>Data on inclusion for students with disabilities</title>
    <meta name="Inclusion Data" content="Data on inclusion for students with disabilities" />
</svelte:head>

<script>
    import { data, selectedDistrict, selectedDistrictData } from "$lib/stores/stores.js"
    import Beeswarm from "$lib/components/Beeswarm.svelte"
    import Divider from "$lib/components/Divider.svelte"
    import { Search, Pencil, TableProperties } from 'lucide-svelte'
    import Scroller from "$lib/components/Scroller.svelte"
    import StateMap from "$lib/components/StateMap.svelte"
    import SelectDistricts from "$lib/components/SelectDistricts.svelte"
    import SimpleAccordion from "$lib/components/SimpleAccordion.svelte"
    //import DistrictsBeeswarm from "$lib/components/DistrictsBeeswarm.svelte"
    import VisualizationToggle from "$lib/components/VisualizationToggle.svelte"
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
    $: {
        if ($selectedDistrict) {
            index = 0;
        }
    }
</script>


<div class="intro">
    <div class="beeswarm-container">
        <Beeswarm />
    </div>

    <h1 class="headline text-width">
        Find rates of inclusion, discipline, graduation and more for disabled students in Oregon
    </h1>

    <h3 class="byline text-width">
        Updated with data from the 2022-23 school year
    </h3>

    <StateMap />

    <p class="text-width">
        For families of students with disabilities, a common concern is not knowing what supports their child is eligible for from one area to the next. Moving from one place to another, for example, can mean drastic changes in services, even though the disability hasn’t changed. These changes can have a huge impact on the well-being and developmental trajectory of a child.
    </p>
    <p class="text-width">
        Usually, families find that the process of how an agency or district evaluates a student's disability is not made transparent, and how those evaluations lead to decisions about services is even less so. However, data is reported to states and the federal government that helps give a view into how students, as a whole, are supported in different areas.
    </p>
    <p class="text-width">
        Below, you can explore that data.
    </p>
</div>

<div class="content-wrapper">
    <Scroller 
        top={top} 
        threshold={threshold} 
        bottom={bottom} 
        bind:index 
        bind:offset 
        bind:progress
    >
        <div slot="background" class="background">
            <Divider>
                <Search />
            </Divider>

            <SelectDistricts />

            <!-- <DistrictsBeeswarm index={index} /> -->
            <VisualizationToggle index={index} />
        </div>

        <div slot="foreground">
            <section>
            </section>
            {#if isDistrictSelected}
                <section>
                    <div class="text-foreground">These circles represent all of the school districts in <strong>Oregon</strong>. Districts farther to the <strong>right</strong> are <strong><em>more inclusive</em></strong>. Districts farther to the <strong>left</strong> are <strong><em>less inclusive</em></strong>.</div>
                </section>
                <section>
                    <div class="text-foreground"><strong>{$selectedDistrictData[0].properties["Institution Name"]}</strong> is selected. Let's learn more about its inclusion of students with disabilities</div>
                </section>
                <section>
                    <div class="text-foreground">
                        {$selectedDistrictData[0].properties["Institution Name"]} has <strong>{$selectedDistrictData[0].properties["Total Student Count"].toLocaleString()} students</strong> with IEPs
                        <br>
                        <br>
                        <em>(An IEP is a document that outlines what supports a student with a disability will receive at school. It's personalized to each student)</em>
                    </div>
                </section>
                <section>
                    <div class="text-foreground">
                        Based on how much of their day those students spend in regular classrooms, <strong>{$selectedDistrictData[0].properties["Institution Name"]}</strong> has an <strong>inclusion score</strong> of <strong>{$selectedDistrictData[0].properties.quartile} out of 4</strong> and is more inclusive than <strong>{$selectedDistrictData[0].properties.percent_more_inclusive}% of districts</strong> in Oregon.
                        <br>
                        <br>
                        <SimpleAccordion title="How is the inclusion score calculated?">
                            The inclusion score is based on the percent of children with disabilites who are in a regular classroom for:
                            <ul>
                                <li>- more than 80% of the day</li>
                                <li>- more than 40% and less than 80% of the day</li>
                                <li>- less than 40% of the day</li>
                            </ul>
                            Or, in a completely separate environment, like a hospital or detention facility.
                        </SimpleAccordion>
                    </div>
                </section>
                <section>
                    <div class="text-foreground">This is how inclusive {$selectedDistrictData[0].properties["Institution Name"]} is compared to the <strong>largest districts</strong> in the state</div>
                </section>
                <section>
                    <div class="text-foreground">And to the <strong>districts it touches</strong></div>
                </section>
                <section>
                    <div class="text-foreground">
                        There's a lot more to explore in {$selectedDistrictData[0].properties["Institution Name"]}'s IEP data, including <strong>graduation rates</strong> and <strong>racial representation</strong>. You can find that information by clicking on 'learn more' in the district's <strong>tooltip</strong>, or in the <strong>table below</strong>
                        <br>
                        <br>
                        To <strong>start over</strong> select a new district
                    </div>
                </section>
            {:else}
                <section>
                    <div class="text-foreground">Please select a district to view detailed information.</div>
                </section>
            {/if}
        </div>
    </Scroller>

    <div class="post-scroll-content">
        <Divider>
            <TableProperties />
        </Divider>
    
        <div class="table">
            <TableOfDistricts data={$data} />
        </div>
    
        <Divider>
            <Pencil />
        </Divider>
    
        <Sources />
    </div>
</div>


<style>
    .intro {
        margin-top: -4rem;
        margin-bottom: 1rem;
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
        text-align: left;
        color: var(--colorInclusiveDark);
        position: relative;
        z-index: 2;
        margin-top: 14rem;
        margin-bottom: 2.5rem;
        background: linear-gradient(to bottom, transparent 0%, var(--colorBackgroundWhite) 30%);
        padding: 3rem 0 0rem 0;
        font-size: 2.4rem;
        line-height: 3rem;
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

    .content-wrapper {
        position: relative;
        z-index: 1;
    }

    .background {
        background-color: var(--colorBackgroundWhite);
        padding-bottom: 2rem;
    }

    .post-scroll-content {
        position: relative;
        z-index: 2;
        background-color: var(--colorBackgroundWhite);
        margin-top: 2rem;
    }

    section {
        height: 100vh;
        max-width: 40rem;
        margin: 0 auto;
        pointer-events: none; /* Makes the section transparent to pointer events */
    }

    .text-foreground {
        display: inline-block;
        padding: 1rem;
        color: var(--colorWhite);
        background-color: var(--colorText);
        background-color: color-mix(in srgb, var(--colorText) 90%, transparent);
        border-radius: 0.25rem;
        font-size: 1.3rem;
        text-align: center;
        box-shadow: var(--shadow);
        max-width: 90%;
        position: relative;
        z-index: 100;     
        pointer-events: auto;
    }

    .text-foreground * {
        pointer-events: auto; /* Re-enables pointer events for text-foreground contents */
    }

    .table {
        background-color: var(--colorBackgroundWhite);
        z-index: 5;
    }
</style>

