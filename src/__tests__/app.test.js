import {CoordinatesFactory, meter2feet, parseValuesToCoordinates, _dec_2_dms, _getDecimal, _to_array} from '../app/helper'
import {makeFetch, urlBuilder} from '../app/controller'

describe("test helper functions", () => {
    test("coords to array", () => {
        let coords = CoordinatesFactory(48.9, 15.0)
        expect(coords.toArray()).toEqual([48.9, 15.0])
    })

    test("coords to dms helper", () => {
        expect(_getDecimal(12.3456)).toBeCloseTo(0.3456, 3)
        expect(_getDecimal(-12.3456)).toBeCloseTo(0.3456, 3)
    })

    test("coords to dms", () => {
        
        let coords1 = CoordinatesFactory(48.210033, 16.363449)
        expect(coords1.toDMS()).toBe(`48° 12' 36.1188" N, 16° 21' 48.4164" E`)
        let coords2 = CoordinatesFactory(-23.533773, -46.625290) 
        expect(coords2.toDMS()).toBe(`23° 32' 1.5828" S, 46° 37' 31.0440" W`)
    })

    test("coords to dms helper", () => {
        expect(meter2feet(12.3456)).toBeCloseTo(40.5039, 3)
    })

    test("url builder", () => {
        const expects = "https://api.opentopodata.org/v1/aster30m?locations=48.9,15"
        expect(urlBuilder(48.9, 15.0)).toBe(expects)
    })

    test("parse values to coordinates", () => {
        let val_1 = {lat: "12.98", long: "10.10"}
        let val_2 = {lat: "vienna", long: "10.10"}
        let expects = CoordinatesFactory(12.98, 10.10)
        let result = parseValuesToCoordinates(val_1)
        expect(result.lat).toBe(12.98)
        expect(result.long).toBe(10.1)
        expect(parseValuesToCoordinates(val_2)).toBeNull()
    })

    test("fetch elevation", async () => {
        const longitude = 16.363449;
        const latitude = 48.210033;
        const expects = 174;
        let data = await makeFetch(latitude, longitude)
        expect(data).toBe(expects)
        //ASTER includes degrees -83 to 83, hence 90 should return null
        data = await makeFetch(90, 90)
        expect(data).toBeNull()
    })
})
