<svelte:head>
    <title>Data on inclusion for students with disabilities</title>
    <meta name="Inclusion Data" content="Data on inclusion for students with disabilities" />
</svelte:head>

<script>
    import { data, selectedDistricts, selectedDistrictsData, primaryDistrictData } from "$lib/stores/stores.js"
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
    let threshold = 0.8
    let bottom = 0.8

    // Check if any districts are selected
    $: isDistrictSelected = $selectedDistricts && $selectedDistricts.length > 0

    // Total number of scrolly sections
    $: totalScrollySections = isDistrictSelected ? 8 : 2

    // Function to skip the scrolly experience
    function skipToEnd() {
        index = totalScrollySections - 1
        // Scroll to the table section
        document.querySelector('.post-scroll-content').scrollIntoView({ 
            behavior: 'smooth' 
        })
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
                How does your school district support students with disabilities? Compare and find out
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
                Updated with data from the 2023-24 school year
            </h3>
        
            <p class="text-width">
                Maybe you've had this experience: meeting with a team of educators, specialists, and administrators to discuss your student's Individualized Education Program (IEP), but you feel like the systems at play are opaque. No matter how much everyone wants to do the right thing, you get the sense that your child's classroom placement isn't really about your child, but about the existing structures. When the team suggests something like pulling your child out of regular classes for most of the day, something feels off.
            </p>
            <p class="text-width">
                Missing from these discussions is context: How do the services in your district compare to other districts? Are there districts doing a better job of including students with disabilities? This tool helps you explore these questions using data reported by school districts each year.
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
                    <!-- <Divider>
                        <Search />
                    </Divider> -->
        
                    <SelectDistricts />
        
                    <VisualizationToggle {index} />
                </div>
        
                <div slot="foreground" class="foreground-content">
                    
                    {#if isDistrictSelected}
                        <section>
                            <ScrollyCard active={index === 0}>
                                Every dot here represents a school district in <strong>Oregon</strong>. But they're not randomly scattered--districts where students with disabilities spend <strong><em>more</em> time in a regular classroom</strong> are on the <strong>right</strong>. Districts where they spend <strong><em>less</em></strong> are on the <strong>left</strong>
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 1}>
                                Right now the largest district, <strong>{$primaryDistrictData?.properties["Institution Name"]}</strong>, is selected. Change the selection at any point to see where your district lands
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 2}>
                                Based on state data, if your child has a disability in <strong>{$primaryDistrictData?.properties["Institution Name"]}</strong>, on average they're likely to <strong>spend {Math.round($primaryDistrictData?.properties["average_separation_time"] || 0)}%</strong> of their day <strong>separated from typical peers</strong>. This varies, of course, depending on the individual level of needs
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 3}>
                                Let's look at <strong>{$primaryDistrictData?.properties["Institution Name"]}</strong> compared to the <strong>largest districts</strong> in the state
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 4}>
                                And to the <strong>ones that surround</strong> it. Though these districts are geographically touching, they can have completely different approaches to inclusion
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 5}>
                                This isn't even necessarily about resources or good intentions--we all want what's best for kids. It's about having examples of what's possible. Some districts have developed systems that <strong>prioritize inclusion</strong>
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 6}>
                                Others are <strong>still working on it</strong>
                            </ScrollyCard>
                        </section>
                        <section>
                            <ScrollyCard active={index === 7}>
                                Now you can explore what's working and what's not in other districts. <strong>Dig in deeper</strong> for any district by <strong>selecting 'more'</strong> in the tooltip or table below
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

                <div class="outro">
                    <p class="text-width">
                        Every piece of data on this chart represents real kids spending real days in classrooms alongside their peers, or elsewhere. Your child's placement doesn't have to be limited by "how we've always done things," it can be inspired by what's working elsewhere.
                    </p>
                    <!-- <p class="text-width">
                        Now you have examples to share with your child's team.
                    </p>
                    <p class="text-width">
                        <em>Ready to explore solutions? [Download district comparison sheets][Find successful inclusion models][Connect with other parents]</em>
                    </p> -->
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
    .headline {
        color: var(--colorInclusive);
        max-width: 44rem;
    }

    .intro {
        margin-top: 1.5rem;
        margin-bottom: 1rem;
        position: relative;
    }

    @media (max-width: 768px) {
        .headline {
            margin-top: 2rem;
        }

        .intro {
            margin-top: 0rem;
        }
    }

    .byline {
        font-size: 1rem;
        margin-bottom: 0.6rem;
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



<!-- 
<br>
<br>
<em>*An IEP is a document that outlines what supports a student with a disability will receive at school. It's personalized to each student</em>


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
</SimpleAccordion> -->