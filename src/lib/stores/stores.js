// src/lib/stores/stores.js
import { readable, writable, derived } from 'svelte/store'
import { getData } from "$lib/data/processData.js"

export const data = readable(getData())

export const hideSmallDistricts = writable(false)

// statewide data
export const stateData = derived(data, $data => $data.filter(d => d.properties.GEOID === '999999'))
export const minWeightedInclusion = derived(stateData, $stateData => $stateData[0].properties.minWeightedInclusion)
export const maxWeightedInclusion = derived(stateData, $stateData => $stateData[0].properties.maxWeightedInclusion)

// Change to array for multiple selection
export const selectedDistrict = writable(["4110040"])

export const selectedDistrictData = derived([selectedDistrict, data], ([$selectedDistrict, $data]) => {
    // Filter for all selected districts
    return $data.filter(d => $selectedDistrict.includes(d.properties.GEOID))
})

export const highlightedDistricts = writable(null)

export const index = writable(0)