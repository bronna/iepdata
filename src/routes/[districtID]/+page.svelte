<script>
    import { page } from '$app/stores'
    $: districtID = $page.params.districtID
</script>

<h1>{districtID}</h1>