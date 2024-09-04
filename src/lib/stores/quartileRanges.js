import { derived } from 'svelte/store';
import { data } from '$lib/stores/stores.js';

function calculateQuartileRanges(data) {
  // Initialize an object to store min and max values for each quartile
  const quartileRanges = {
    1: { min: Infinity, max: -Infinity },
    2: { min: Infinity, max: -Infinity },
    3: { min: Infinity, max: -Infinity },
    4: { min: Infinity, max: -Infinity }
  };

  // Iterate through the data
  data.forEach(item => {
    const quartile = item.properties.quartile;
    const inclusion = item.properties.weighted_inclusion;

    // Skip if quartile or weighted_inclusion is null or undefined
    if (quartile == null || inclusion == null) return;

    // Update min and max for the corresponding quartile
    quartileRanges[quartile].min = Math.min(quartileRanges[quartile].min, inclusion);
    quartileRanges[quartile].max = Math.max(quartileRanges[quartile].max, inclusion);
  });

  // Convert the object to an array
  return Object.entries(quartileRanges).map(([quartile, range]) => ({
    quartile: parseInt(quartile),
    min: range.min,
    max: range.max
  }));
}

// Create a derived store for quartile ranges
export const quartileRanges = derived(data, $data => calculateQuartileRanges($data));