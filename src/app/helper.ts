export function CoordinatesFactory(lat: number, long: number): Coordinates {
    return {
        long,
        lat,
        toArray: _to_array,
        toDMS: _dec_2_dms,
        setLatitude: function (lat: number) {this.lat = lat},
        setLongitude: function (long: number) {this.long = long},
    }
}

export function _to_array(this: Coordinates): CoordArray {
    return [this.lat, this.long]
}


//converts longitute/latitude decimal format to DMS format.
export function _dec_2_dms(this: Coordinates): string {
    const {long, lat} = this;
    const CLOCK = 60;
    let isEast = long > 0 ? "E" : "W";
    let isNorth = lat > 0 ? "N" : "S";
    const long_deg = Math.floor(Math.abs(long));
    const long_minutes = _getDecimal(long) * CLOCK;
    const long_seconds = _getDecimal(long_minutes) * CLOCK;
    const lat_deg = Math.floor(Math.abs(lat));
    const lat_minutes = _getDecimal(lat) * CLOCK;
    const lat_seconds = _getDecimal(lat_minutes) * CLOCK;
    return `${lat_deg}° ${Math.floor(lat_minutes)}' ${lat_seconds.toFixed(4)}" ${isNorth}, ${long_deg}° ${Math.floor(long_minutes)}' ${long_seconds.toFixed(4)}" ${isEast}`
}

export function _getDecimal(num: number): number {
    let abs = Math.abs(num)
    return abs - Math.floor(abs)
}

export function meter2feet(m: number | null): number {
    if (m === null) {
        return 0
    }
     const fact = 3.28084;
     return fact * m
}

export function getValuesFromInput(formElement: HTMLElement): CoordArray {
    let targets = formElement.getElementsByTagName("input");
    if (targets && targets.length == 2) {
        return [parseFloat(targets[0].value),parseFloat(targets[1].value)]
    } 
    return [0,0]
}

export function parseValuesToCoordinates(values: {long: string, lat: string}): Coordinates | null {
    let {long, lat} = values;
    let parsed_long = parseFloat(long)
    let parsed_lat = parseFloat(lat)
    return [parsed_lat, parsed_long].some((x: number) => Number.isNaN(x)) ? null : CoordinatesFactory(parsed_lat, parsed_long)
}
