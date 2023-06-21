import {_to_array} from '../app/helper'

describe("test helper functions", () => {
    test("coords to array", () => {
        let coords = {
            lat: 48.9,
            long: 15.0,
            toArray: _to_array
        };
        expect(coords.toArray()).toEqual([48.9, 15.0])
    })
})
