export class Position {
    coords: Coordinates | null
    constructor() {
        this.coords = null      
    } 

    getUserPosition() {
        let loc = navigator.geolocation;
        loc.getCurrentPosition((coord: GeolocationPosition) => {
            let {longitude, latitude} = coord.coords;
            this.coords = {
                lat: latitude,
                long: longitude
            }
        })
    }

    toArray(): [number, number] | undefined {
        if (this.coords != null) {
            return Object(this.coords)
        }
    }
}
