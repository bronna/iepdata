<script>
    import SchoolProficiencyBySize from '$lib/components/SchoolProficiencyBySize.svelte'
    import SmallSchools from '$lib/components/SmallSchools.svelte'
    import SchoolSizeExpenditureChart from '$lib/components/SchoolSizeExpenditureChart.svelte'
    import SchoolProficiencyTrends from '$lib/components/SchoolProficiencyTrends.svelte'
    import SideHeader from '$lib/components/SideHeader.svelte'
    import { colors } from "$lib/styles/colorConfig"
    import Divider from "$lib/components/Divider.svelte"
    import { ChartNoAxesColumn, TrendingUp, Ruler } from 'lucide-svelte'

    let windowWidth = 0
</script>

<svelte:head>
    <title>School Size & Performance</title>
    <meta name="description" content="Analysis of small school performance compared to per pupil spending" />
</svelte:head>


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
                WLWV Primary School Size & Performance
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
        <div class="viz-container">
            <div class="section-heading">
                <Divider>
                    <ChartNoAxesColumn size={24} />
                </Divider>
            </div>
            <SchoolProficiencyBySize />
        </div>

        <div class="viz-container">
            <div class="section-heading">
                <Divider>
                    <ChartNoAxesColumn size={24} />
                </Divider>
                <h2>Spending, School Size, and Performance</h2>
                <p style="text-align:center; font-size:1rem; margin-top:-0.5rem;">* per pupil spending data not available for 23/24 school year, 22/23 data shown</p>
            </div>
            <SmallSchools />
        </div>

        <div class="viz-container">
            <div class="section-heading">
                <Divider>
                    <TrendingUp size={24} />
                </Divider>
                <h2>School Proficiency Trends Over Time</h2>
            </div>
            <div style="height: 470px;">
                <SchoolProficiencyTrends />
            </div>
        </div>
        
        <div class="viz-container">
            <div class="section-heading">
                <Divider>
                    <Ruler />
                </Divider>
                <h2>Size and Spending</h2>
                <p style="text-align:center; font-size:1rem; margin-top:-0.5rem;">* per pupil spending data not available for 23/24 school year, 22/23 data shown</p>
            </div>
            <div style="height: 470px;">
                <SchoolSizeExpenditureChart />
            </div>
        </div>
        
        <div class="text-width">
            <div class="source">
                <p>
                    <strong>Source:</strong> 
                    Oregon Department of Education, 
                    Edunomics Lab at Georgetown
                    <a href="https://public.tableau.com/app/profile/edunomicslab/viz/OregonFY21SpendingvsOutcomes/OregonFY21?publish=yes">1</a>
                    <a href="https://public.tableau.com/app/profile/edunomicslab/viz/OregonFY22SpendingvsSY23Outcomes/ORFY22SpendingvsSY23Outcomes#1">2</a>
                    <a href="https://public.tableau.com/app/profile/edunomicslab/viz/OregonFY23SpendingvsSY24Outcomes-updated3_24/ORFY23SpendingvsSY24Outcomes">3</a>
                </p>
            </div>
        </div>
    </div>
</div>

<style>
    h1 {
        text-align: left;
        color: var(--colorInclusiveDark);
        margin-bottom: 1.5rem;
    }
    
    .intro {
        margin: 1rem auto 2rem;
    }
    
    .viz-container {
        margin: 2rem auto 4rem;
        max-width: 1000px;
        width: 100%;
    }
    
    .section-heading {
        margin-bottom: 1.5rem;
    }
    
    .section-heading h2 {
        font-size: 1.5rem;
        color: var(--colorText);
        text-align: center;
        margin: 1rem 0;
        font-family: var(--font-headers);
    }
    
    .source {
        font-size: 0.9rem;
        color: var(--colorDarkGray);
        margin-top: 3rem;
        padding-top: 1rem;
        border-top: 1px solid var(--colorLightGray);
        margin-bottom: 3rem;
    }
    
    @media (max-width: 768px) {
        .section-heading h2 {
            font-size: 1.2rem;
            padding: 0 1rem;
        }
    }
</style>