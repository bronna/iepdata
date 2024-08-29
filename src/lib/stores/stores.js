import { readable, writable, derived } from 'svelte/store'
import { getData } from "$lib/data/processData.js"

export const data = readable(getData())

export const hideSmallDistricts = writable(false)

// statewide data
export const stateData = derived(data, $data => $data.filter(d => d.properties.GEOID === '999999'))
export const minWeightedInclusion = derived(stateData, $stateData => $stateData[0].properties.minWeightedInclusion)
export const maxWeightedInclusion = derived(stateData, $stateData => $stateData[0].properties.maxWeightedInclusion)

// possibly move to context within beeswarm
//export const selectedDistricts = writable(["4110040", "4110820", "4101920"])
export const selectedDistrict = writable("4110040")
//export const selectedDistrict = writable(null)

export const selectedDistrictData = derived([selectedDistrict, data], ([$selectedDistrict, $data]) => {
    return $data.filter(d => d.properties.GEOID === $selectedDistrict)
})

export const highlightedDistricts = writable(null)

export const index = writable(0)