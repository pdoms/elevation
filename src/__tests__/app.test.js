import {_to_array} from '../app/helper'
import {makeFetch, urlBuilder} from '../app/controller'

describe("test helper functions", () => {
    test("coords to array", () => {
        let coords = {
            lat: 48.9,
            long: 15.0,
            toArray: _to_array
        };
        expect(coords.toArray()).toEqual([48.9, 15.0])
    })

    test("url builder", () => {
        const expects = "https://api.opentopodata.org/v1/aster30m?locations=48.9,15"
        expect(urlBuilder(48.9, 15.0)).toBe(expects)
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
