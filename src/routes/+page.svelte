<svelte:head>
    <title>Data on inclusion for students with disabilities</title>
    <meta name="Inclusion Data" content="Data on inclusion for students with disabilities" />
</svelte:head>


<script>
    import { getData } from "$lib/data/processData.js"
    import Explainer from "$lib/components/Explainer.svelte"
    import SelectDistricts from "$lib/components/SelectDistricts.svelte"
    import DistrictsBeeswarm from "$lib/components/DistrictsBeeswarm.svelte"
    import TableOfDistricts from "$lib/components/TableOfDistricts.svelte"
    import Sources from "$lib/components/Sources.svelte"

    let data = getData()
    console.log(data)
</script>


<h1 class="headline">
    How included are students with disabilities in your local schools?
</h1>

<p class="text-width">
    Every child should feel included and valued in their community. For students with disabilities, however, this continues to be hard to come by. Historically, children with disabilities were not only barred from traditional schools, but also taken from their homes and placed in institutions, oftentimes in squalid conditions. After the passing of the Individuals with Disabilities Education Act, however, the law mandated that all students have a right to a free and appropriate public education, with a specification for children with disabilities to be placed in the "least restrictive environment." This means having disabled students in regular classrooms as much as possible, with any needed supports. Research shows that this setting leads to much more progress made by students than when they are separated out. Typically abled peers also benefit from this environment, as accommodations like universal design end up benefitting many, as well as giving them confidence that, in a supportive community, their own unique needs will be met. Additionally, inclusive environments can help to reduce stigma and discrimination.
</p>

<Explainer>
    <p><strong>I</strong>ndividualized <strong>E</strong>ducation <strong>P</strong>lans (<strong>IEP</strong>s) outline what supports a student with disabilities will need to be able to work towards their educational goals. They're created by a team of teachers, therapists, the student, and their caregivers. They can include things like larger type size on worksheets, a speech output device, or a personal aide.</p>
</Explainer>

<p class="text-width">
    This tool allows you to explore the most recent data on inclusion and outcomes for children with IEPs from school districts around your state. To begin, enter the name of a district below, or select one or more on the map.
</p>

<SelectDistricts data={data} />

<DistrictsBeeswarm data={data} />

<TableOfDistricts data={data} />

<Sources />


<style>
    .headline {
        width: 100%;
        max-width: 60rem;
        margin: 0 auto;
        padding-bottom: 3rem;
    }
</style>