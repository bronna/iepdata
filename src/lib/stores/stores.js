import { writable } from 'svelte/store'

export const selectedDistricts = writable(["4110040", "4110820", "4101920"])

export const hideSmallDistricts = writable(false)