// src/lib/stores/stores.js

import { readable, writable, derived } from 'svelte/store'
import { getData } from "$lib/data/processData.js"

export const data = readable(getData())

export const hideSmallDistricts = writable(false)

// statewide data
export const stateData = derived(data, $data => $data.filter(d => d.properties.GEOID === '999999'))
export const minWeightedInclusion = derived(stateData, $stateData => $stateData[0].properties.minWeightedInclusion)
export const maxWeightedInclusion = derived(stateData, $stateData => $stateData[0].properties.maxWeightedInclusion)

// Array for multiple district selections
export const selectedDistricts = writable(["4110040"])

// Array of data for all selected districts
export const selectedDistrictsData = derived([selectedDistricts, data], ([$selectedDistricts, $data]) => {
    // Filter for all selected districts
    return $data.filter(d => $selectedDistricts.includes(d.properties.GEOID))
})

// Single data object for the primary selected district (first in the array)
export const primaryDistrictData = derived([selectedDistricts, data], ([$selectedDistricts, $data]) => {
    if (!$selectedDistricts || $selectedDistricts.length === 0) return null
    const primaryId = $selectedDistricts[0] // Always use the first district as primary
    return $data.find(d => d.properties.GEOID === primaryId) || null
})

// Get the primary district ID (first in the selectedDistricts array)
export const primaryDistrictId = derived(selectedDistricts, $selectedDistricts => {
    return $selectedDistricts && $selectedDistricts.length > 0 ? $selectedDistricts[0] : null
})

export const highlightedDistricts = writable(null)

export const index = writable(0)