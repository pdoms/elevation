export {}
declare global {
    type CoordArray = [number, number]
    type Coordinates = {
        lat: number,
        long: number
        toArray: () => CoordArray
    }
}
