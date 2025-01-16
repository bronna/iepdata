<script>
    import Scatterplot from '$lib/components/Scatterplot.svelte'
    import BubbleMap from '$lib/components/BubbleMap.svelte'
</script>

<h1>About</h1>

<div class="text-width about">
    <p>
        This is a project to make data about disabled students in Oregon more accessible and understandable for families, students, and advocates. Brianna started it after talking to several principals of elementary schools in two different states about what her then-baby's grade school experience would look like. She was disturbed by the lack of transparency and consistency in the supports that disabled students receive in different areas, and set out to find data that could help give her a better sense of things. She soon realized this data could be helpful to others as well, and started this site as a way to visualize and format the data in accessible ways.
    </p>
</div>

<div class="text-width map-container" style="--map-width: {500}px; --map-height: {500}px;">
    <p>(don't mind these, just some current visualization tests)</p>
    <Scatterplot />
    <BubbleMap />
</div>

<style>
    .about {
        margin-top: 4rem;
        margin-bottom: 4rem;
    }

    .map-container {
        margin: 0 auto;
        width: 100%;
        height: 100%;
    }
</style>
