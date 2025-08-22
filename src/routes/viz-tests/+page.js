import { getData } from '$lib/data/processData.js'
import { forceSimulation, forceCollide, forceX, forceY } from 'd3-force'
import { geoTransverseMercator, geoPath } from 'd3-geo'

export async function load({ params }) {
    const data = await getData()
    
    return {
        data
    }
}