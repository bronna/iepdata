import { getData } from '$lib/data/processData.js'
import { forceSimulation, forceCollide, forceX, forceY } from 'd3-force'
import { geoTransverseMercator, geoPath } from 'd3-geo'

export async function load({ params }) {
    const data = await getData()
    
    // add force calc logic, cx and cy for each district's bubble, so that can then be passed into the BubbleMap component to position bubbles right away

    return {
        data
    }
}