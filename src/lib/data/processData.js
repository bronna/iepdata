import * as topojson from "topojson-client"
import OregonData from "./oregon_data_23.json"

let largeDistrictCutoff = 500

let inclusiveWeight = 0.9
let semiInclusiveWeight = 0.6
let nonInclusiveWeight = 0.2
let separateWeight = 0

function weightedInclusion(district) {
    return (
        (
            ( (district["LRE Students >80%"] / 100) * district["Total Student Count"] ) * inclusiveWeight
            + ( (district["LRE Students >40% <80%"] / 100) * district["Total Student Count"] ) * semiInclusiveWeight
            + ( (district["LRE Students <40%"] / 100) * district["Total Student Count"] ) * nonInclusiveWeight
            + ( (district["LRE Students Separate Settings"] / 100) * district["Total Student Count"] ) * separateWeight
        ) / district["Total Student Count"] * 100
    )
}

export const getData = () => {
    const objectName = "OR_SDs_merged_23"
    const geojsonData = topojson.feature(OregonData, OregonData.objects[objectName])
    let data = geojsonData.features

    const neighbors = topojson.neighbors(OregonData.objects[objectName].geometries)

    let totalStudents = 0
    let numInclusive = 0
    let numSemiInclusive = 0
    let numNonInclusive = 0
    let numSeparate = 0
    let sumHigherEdTrainingEmployed = 0
    let sumIEP4YrCohortGrad = 0
    let sumIEPDropout = 0
    const alertColumns = [
        "SuspExplFg",
        "SuspExplRaceEthnicityFg",
        "DisPrptnRprsntnFg",
        "DisPrptnRprsntnDsbltyFg"
    ]

    data.forEach((district, index) => {
        if (typeof district.properties["Total Student Count"] === "number" && !isNaN(district.properties["Total Student Count"])) {
            totalStudents += district.properties["Total Student Count"];
        }
        
        if (typeof district.properties["LRE Students >80%"] === "number" && !isNaN(district.properties["LRE Students >80%"])) {
            numInclusive += (district.properties["LRE Students >80%"] / 100) * district.properties["Total Student Count"]
        }
    
        if (typeof district.properties["LRE Students >40% <80%"] === "number" && !isNaN(district.properties["LRE Students >40% <80%"])) {
            numSemiInclusive += (district.properties["LRE Students >40% <80%"] / 100) * district.properties["Total Student Count"]
        }
    
        if (typeof district.properties["LRE Students <40%"] === "number" && !isNaN(district.properties["LRE Students <40%"])) {
            numNonInclusive += (district.properties["LRE Students <40%"] / 100) * district.properties["Total Student Count"]
        }

        if (typeof district.properties["LRE Students Separate Settings"] === "number" && !isNaN(district.properties["LRE Students Separate Settings"])) {
            numSeparate += (district.properties["LRE Students Separate Settings"] / 100) * district.properties["Total Student Count"]
        }

        if (typeof district.properties["Higher Ed/Training/Employed"] === "number" && !isNaN(district.properties["Higher Ed/Training/Employed"])) {
            sumHigherEdTrainingEmployed += (district.properties["Higher Ed/Training/Employed"] / 100) * district.properties["Total Student Count"]
        }

        if (typeof district.properties["IEP 4Yr Cohort Grad 18-19"] === "number" && !isNaN(district.properties["IEP 4Yr Cohort Grad 18-19"])) {
            sumIEP4YrCohortGrad += (district.properties["IEP 4Yr Cohort Grad 18-19"] / 100) * district.properties["Total Student Count"]
        }

        if (typeof district.properties["IEP Dropout 18-19"] === "number" && !isNaN(district.properties["IEP Dropout 18-19"])) {
            sumIEPDropout += (district.properties["IEP Dropout 18-19"] / 100) * district.properties["Total Student Count"]
        }

        // Calculate the weighted inclusion
        if (!district.properties["Total Student Count"]) {
            district.properties.weighted_inclusion = null
        } else {
            district.properties.weighted_inclusion = weightedInclusion(district.properties)
        }

        // Tallying up alerts for each district
        let alertsCount = 0
        // alertColumns.forEach(column => {
        //     if (district.properties[column] === "Yes") {
        //         alertsCount++
        //     }
        // })
        district.properties.nAlerts = alertsCount

        // indicate if large or small district
        if (!district.properties["Total Student Count"]) {
            district.properties.largeDistrict = false
        } else {
            if (district.properties["Total Student Count"] < largeDistrictCutoff) {
                district.properties.largeDistrict = false
            } else {
                district.properties.largeDistrict = true
            }
        }

        // Add array of neighbors
        district.properties.neighbors = neighbors[index].map(neighborIndex => {
            return data[neighborIndex] ? data[neighborIndex].properties["GEOID"] : null
        })
    })

    // Calculate min and max weighted inclusion for large districts
    let minWeightedInclusion = Math.min(
        ...data
            .filter(district => district.properties["Total Student Count"] > 500 && district.properties.weighted_inclusion)
            .map(district => district.properties.weighted_inclusion)
    )
    let maxWeightedInclusion = Math.max(
        ...data
            .filter(district => district.properties["Total Student Count"] > 500 && district.properties.weighted_inclusion)
            .map(district => district.properties.weighted_inclusion)
    )
    let range = maxWeightedInclusion - minWeightedInclusion

    // Calculate min and max weighted inclusion for all districts
    let minWeightedInclusionAll = Math.min(
        ...data
            .filter(district => district.properties.weighted_inclusion)
            .map(district => district.properties.weighted_inclusion)
    )
    let maxWeightedInclusionAll = Math.max(
        ...data
            .filter(district => district.properties.weighted_inclusion)
            .map(district => district.properties.weighted_inclusion)
    )

    // Calculate quartiles
    const quartileThresholds = Array.from({ length: 4 }, (_, i) => minWeightedInclusion + (range * (i + 1) * 0.25))
    data.forEach(district => {
        if (!district.properties.weighted_inclusion) {
            district.properties.quartile = null
        } else {
            for (let i = 0; i < 3; i++) {
                if (district.properties.weighted_inclusion < quartileThresholds[i]) {
                    district.properties.quartile = i + 1
                    break
                }
            }
        }

        // Assign a value of 4 for the top quartile (if not already assigned)
        if (district.properties.weighted_inclusion && !district.properties.quartile) {
            district.properties.quartile = 4
        }
    })

    // Find the 3 largest districts by "Total Student Count"
    const largestDistricts = data
        .filter(district => district.properties["Total Student Count"])
        .sort((a, b) => b.properties["Total Student Count"] - a.properties["Total Student Count"])
        .slice(0, 5)
        .map(district => district.properties.GEOID)

    // Statewide data
    let summaryFeature = {
        //id: 0,
        type: "Feature",
        properties: {
            "Institution Name": "Oregon",
            GEOID: "999999",
            "Total Student Count": totalStudents,
            "LRE Students >80%": (numInclusive / totalStudents) * 100,
            "LRE Students >40% <80%": (numSemiInclusive / totalStudents) * 100,
            "LRE Students <40%": (numNonInclusive / totalStudents) * 100,
            "LRE Students Separate Settings": (numSeparate / totalStudents) * 100,
            "Higher Ed/Training/Employed": sumHigherEdTrainingEmployed / totalStudents * 100,
            "IEP 4Yr Cohort Grad 18-19": sumIEP4YrCohortGrad / totalStudents * 100,
            "IEP Dropout 18-19": sumIEPDropout / totalStudents * 100,
            "minWeightedInclusion": minWeightedInclusion,
            "maxWeightedInclusion": maxWeightedInclusion,
            "minWeightedInclusionAll": minWeightedInclusionAll,
            "maxWeightedInclusionAll": maxWeightedInclusionAll,
            "largestDistricts": largestDistricts,
            "quartileThresholds": quartileThresholds,
        },
        geometry: null
    }
    data.push(summaryFeature)

    return data
        .sort((a, b) => {
            if (!a.properties["Institution Name"] && !b.properties["Institution Name"]) return 0
            if (!a.properties["Institution Name"]) return 1
            if (!b.properties["Institution Name"]) return -1
            return a.properties["Institution Name"].localeCompare(b.properties["Institution Name"])
        })
}