<svelte:head>
    <title>Data on inclusion for students with disabilities</title>
    <meta name="Inclusion Data" content="Data on inclusion for students with disabilities" />
</svelte:head>

<script>
    import { data, selectedDistrict, selectedDistrictData } from "$lib/stores/stores.js"
    import SideHeader from '$lib/components/SideHeader.svelte'
    import Divider from "$lib/components/Divider.svelte"
    import { Search, Pencil, TableProperties } from 'lucide-svelte'
    import Scroller from "$lib/components/Scroller.svelte"
    import SelectDistricts from "$lib/components/SelectDistricts.svelte"
    import SimpleAccordion from "$lib/components/SimpleAccordion.svelte"
    import VisualizationToggle from "$lib/components/VisualizationToggle.svelte"
    import TableOfDistricts from "$lib/components/TableOfDistricts.svelte"
    import Sources from "$lib/components/Sources.svelte"
    import ScrollyCard from "$lib/components/ScrollyCard.svelte"
    import ScrollyProgress from "$lib/components/ScrollyProgress.svelte"

    let windowWidth = 0

    // Scroller variables
    let index, offset, progress
    let top = 0
    let threshold = 0.5
    let bottom = 0.8

    let isDistrictSelected = false
    $: isDistrictSelected = $selectedDistrict && $selectedDistrict.length > 0
    $: {
        if ($selectedDistrict) {
            index = 0;
        }
    }

    // Total number of scrolly sections
    $: totalScrollySections = isDistrictSelected ? 8 : 2

    // Function to skip the scrolly experience
    function skipToEnd() {
        index = totalScrollySections - 1;
        // Scroll to the table section
        document.querySelector('.post-scroll-content').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }
</script>


<svelte:window bind:innerWidth={windowWidth} />

<div class="page-container">
    {#if windowWidth <= 768}
        <!-- Mobile: Header above the headline -->
        <div class="header-container-mobile">
            <SideHeader />
        </div>
    {/if}

    <div class="header-headline-container">
        <div class="headline-container">
            <h1 class="headline">
                Find rates of inclusion, discipline, graduation and more for disabled students in Oregon
            </h1>
        </div>

        {#if windowWidth > 768}
            <!-- Desktop: Header to the right of the headline -->
            <div class="header-container-desktop">
                <SideHeader />
            </div>
        {/if}
    </div>

    <div class="content-container">
        <div class="intro">
            <h3 class="byline text-width">
                Updated with data from the 2022-23 school year
            </h3>
        
            <p class="text-width">
                For families of students with disabilities, a common concern is not knowing what supports their child is eligible for from one area to the next. Moving from one place to another can mean drastic changes in services, even though the disability hasn't changed. These changes can have a huge impact on the well-being and developmental trajectory of a child.
            </p>
            <p class="text-width">
                Usually, families find that the process of how an agency or district evaluates a student's disability is not transparent, and how those evaluations are used to make decisions about services is even less so. However, data is reported to states and the federal government that helps give a view into how students, as a whole, are supported in different areas.
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
                showHelpers={false}
            >
                <div slot="background" class="background">
                    <Divider>
                        <Search />
                    </Divider>
        
                    <SelectDistricts />
        
                    <VisualizationToggle {index} />
                </div>
        
                <div slot="foreground" class="foreground-content">
                    
                    {#if isDistrictSelected}
                        <section>
                            <ScrollyCard active={index === 0}>
                                Let's explore how special education services vary across <strong>Oregon</strong>'s school districts
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 1}>
                                These circles represent all of the school districts in <strong>Oregon</strong>. Districts farther to the <strong>right</strong> are <strong><em>more inclusive</em></strong>, meaning that students with disabilities spend <strong>more time in general education classrooms</strong> with their peers
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 2}>
                                As an example, let's look at Portland Public Schools. This district serves <strong>{$selectedDistrictData[0].properties["Total Student Count"]} students with IEPs*</strong> <em>(note: you can select your local district at any time)</em>
                                <br>
                                <br>
                                <em>*An IEP is a document that outlines what supports a student with a disability will receive at school. It's personalized to each student who needs it</em>
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 3}>
                                Districts report data on how much time students with IEPs spend in regular classrooms. Based on this, <strong>{$selectedDistrictData[0].properties["Institution Name"]}</strong> has an <strong>inclusion score</strong> of <strong>{$selectedDistrictData[0].properties["quartile"]} out of 4</strong>
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
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 4}>
                                Here's how {$selectedDistrictData[0].properties["Institution Name"]} compares to the <strong>largest districts</strong> in the state
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 5}>
                                And to the <strong>districts it touches</strong>
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 6}>
                                You can also <strong>select multiple districts</strong> to compare them directly
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 7}>
                                Now it's your turn! Use the <strong>toggle</strong> to switch between <strong>map and bubble views</strong>. You can also find districts in the <strong>table below</strong>
                            </ScrollyCard>
                        </section>
                    {:else}
                        <section>
                            <ScrollyCard active={index === 1}>
                                Please select a district to view detailed information.
                            </ScrollyCard>
                        </section>
                    {/if}
                </div>
            </Scroller>
        
            <!-- Progress indicator and Skip button -->
            {#if index > 0 && index < totalScrollySections - 1}
                <ScrollyProgress 
                    currentIndex={index} 
                    totalSteps={totalScrollySections}
                    onSkip={skipToEnd}
                />
            {/if}
        
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
    </div>
</div>


<style>
    .intro {
        margin-top: -4rem;
        margin-bottom: 1rem;
        position: relative;
    }

    .headline {
        text-align: left;
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

    .content-wrapper {
        position: relative;
        z-index: 1;
    }

    .foreground-content {
        padding: 30rem 1rem 0 1rem;
        z-index: 2;
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

    .table {
        background-color: var(--colorBackgroundWhite);
        z-index: 5;
    }
</style>