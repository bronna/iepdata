<script>
    import SmallSchools from '$lib/components/SmallSchools.svelte';
    import Divider from "$lib/components/Divider.svelte";
    import { LineChart } from 'lucide-svelte';
    import { colors } from "$lib/styles/colorConfig";
</script>

<svelte:head>
    <title>School Performance Analysis</title>
    <meta name="description" content="Analysis of small school performance compared to per pupil spending" />
</svelte:head>

<div class="container">
    <h1 class="text-width">Small Schools Performance Analysis</h1>
    
    <div class="text-width description">
        <p>
            This analysis explores the relationship between per pupil spending and academic 
            performance in small primary schools. The scatterplot below shows the 
            percentage of students achieving proficient and above scores plotted against 
            per pupil spending.
        </p>
    </div>
    
    <Divider>
        <LineChart color={colors.colorInclusiveDark} />
    </Divider>
    
    <div class="viz-container">
        <SmallSchools />
    </div>
    
    <div class="text-width findings">
        <h3>Findings</h3>
        <ul>
            <li>x</li>
            <li>y</li>
            <li>z</li>
        </ul>
        
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

<style>
    .container {
        padding: 2rem 0;
    }
    
    h1 {
        text-align: left;
        color: var(--colorInclusiveDark);
        margin-bottom: 1.5rem;
    }
    
    .description {
        margin-bottom: 2rem;
    }
    
    .description p {
        margin-bottom: 1rem;
    }
    
    .viz-container {
        margin: 2rem auto;
        max-width: 1000px;
        width: 100%;
    }
    
    .findings {
        margin-top: 3rem;
    }
    
    .findings h3 {
        color: var(--colorInclusiveDark);
        margin-bottom: 1rem;
        font-family: var(--font-headers);
    }
    
    .findings ul {
        margin-left: 1.5rem;
        margin-bottom: 2rem;
    }
    
    .findings li {
        margin-bottom: 0.5rem;
        line-height: 1.6;
    }
    
    .source {
        font-size: 0.9rem;
        color: var(--colorDarkGray);
        margin-top: 2rem;
        padding-top: 1rem;
        border-top: 1px solid var(--colorLightGray);
    }
</style>