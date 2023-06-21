
//since opentopodata.org provides differnt datasets, the dataset could either
//be user defined or configurable, if further features should be considered
const BASEURL = "https://api.opentopodata.org/v1/aster30m?locations="

/**
 * Function that calls the opentopodata dataset with the location params and returns
 * the elevation.
 * @param {number} lat - latitude as number
 * @param {number} long - longitude as number
 * @returns {Promise<number | null>} elevation or null
 * **/
export async function makeFetch(lat: number, long: number): Promise<number | null> {
    let url = urlBuilder(lat, long)
    let response = await fetch(url)
    let data;
    let code = response.status
    if (response.ok) {
        //parsing json can always fail!!!
        try {
            data = await response.json();
        } catch {
            console.error("Failed to fetch elevation data unable to parse response")
            return null
        }
        return data && data.results.length > 0 ? data.results[0].elevation : null
    } else {
        console.error("Failed to fetch elevation data, error code:", code)
        return null
    }
}

/**
 * Interpolates base url with latitude and longitude
 * @param {number} lat - latitude as number
 * @param {number} long - longitude as number
 * @returns {string} constructred url for fetch
 * **/
export function urlBuilder(lat: number, long: number): string {
    return `${BASEURL}${lat},${long}` 
}
