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
        <p>
            Circle size represents the percentage of students with disabilities at each school.
        </p>
    </div>
    
    <Divider>
        <LineChart color={colors.colorInclusiveDark} />
    </Divider>
    
    <div class="viz-container">
        <SmallSchools />
    </div>
    
    <div class="text-width findings">
        <h3>Key Observations</h3>
        <ul>
            <li>Schools with higher per pupil spending tend to show higher proficiency rates.</li>
            <li>Schools with larger percentages of students with disabilities often have higher per pupil spending.</li>
            <li>The data suggests allocating resources may help improve outcomes for all students.</li>
        </ul>
        
        <div class="source">
            <p><strong>Source:</strong> Oregon Department of Education, 2022-23 school year</p>
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