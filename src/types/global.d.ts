export {}
declare global {
    type CoordArray = [number, number]
    type Coordinates = {
        lat: number,
        long: number
        setLatitude: (lat: number) => void
        setLongitude: (long: number) => void
        toArray: () => CoordArray
        toDMS: () => string
        
    }
}
