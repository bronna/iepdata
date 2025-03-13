<script>
    import { fade } from 'svelte/transition'
    import SwarmIdentificationSize from '$lib/components/SwarmIdentificationSize.svelte'

    export let data
    console.log('viz test data:', data)

    let currentView = 'map'
</script>

<h1 class="text-width">Oregon's special education funding gap: the 11% cap problem</h1>

<div class="text-width first-text">
    <p> 
        Oregon's current special education funding cap of 11% falls significantly short of meeting the actual needs of school districts across the state. Many of Oregon's largest districts identify well above this threshold, with the largest districts serving student populations where 18% of students have Individualized Education Plans (IEPs).
    </p>
</div>

<div class="map-container">
    <div class="viz-in-progress">
        <SwarmIdentificationSize />
    </div>
    <div class="source">
        Data: Oregon Dept of Education, 2022-23 school year
    </div>
</div>

<div class="text-width last-text">
    <h3>The current landscape</h3>
    <p>Major districts like Portland Public Schools (18% students with IEPs), Salem-Keizer (18%), and Medford (17%) are operating well beyond the funding cap. Even districts like Beaverton (13%) and Eugene 4J (14%) exceed the arbitrary 11% threshold that determines state funding allocation.</p>
    <h3>
        Financial implications
    </h3>
    <p>
        This funding structure creates a problematic disincentive for districts to identify students with disabilities. When districts identify students beyond the 11% cap, they must absorb those additional costs without corresponding state support.
    </p>
</div>

<style>
    .viz-in-progress {
        margin-bottom: 0;
    }

    .map-container {
        margin: 0 auto;
        width: 100%;
        height: 100%;
    }

    .source {
        text-align: right;
        margin-top: -5rem;
        margin-bottom: 2rem;
        margin-right: 2rem;
    }

    .first-text {
        margin-top: 2rem;
    }

    .last-text {
        margin-bottom: 4rem;
    }
</style>