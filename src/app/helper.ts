import {Icon} from "leaflet";
import icn from "../assets/location-pin.png"

export const PinMarker = new Icon({
    iconUrl: icn,
    iconSize: [64,64]
})


export function getUserPosition(): Coordinates {
        let loc = navigator.geolocation;
        let coords = {} as Coordinates;
        loc.getCurrentPosition((coord: GeolocationPosition) => {
            let {longitude, latitude} = coord.coords;
             coords = {
                lat: latitude,
                long: longitude,
                toArray: _to_array
            }
     })
     return coords
}

function _to_array(this: Coordinates): CoordArray {
    return [this.lat, this.long]
}
