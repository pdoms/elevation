import {FC, useState, FormEvent, ChangeEvent, useEffect} from 'react';
import { CoordinatesFactory, getValuesFromInput, meter2feet, parseValuesToCoordinates } from './helper';

interface IIOCenter {
    getInputs: (coords: Coordinates) => void
    getError: (err: string) => void
    elevation: number | null
    coords: Coordinates | undefined

}
export const IOCenter: FC<IIOCenter> = ({coords, elevation, getInputs, getError}) => {
    const [values, setValues] = useState({lat: "", long: ""})
    const [coords_, setCoords_] = useState<Coordinates>(CoordinatesFactory(0,0))

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        let coordinates = parseValuesToCoordinates(values)
        if (coordinates) {
            getInputs(coordinates)
            setCoords_(coordinates)
        } else {
            getError("unable to parse input")
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let {name, value} = event.target;
        setValues({...values, [name]: value})
    }
    
    useEffect(() => {
        values.lat = coords ? coords.lat.toString() : values.lat
        values.long = coords ? coords.long.toString() : values.long
        setValues({...values})
        coords && setCoords_(coords)
    }, [coords])

    

    return (
       <>
            <div>
                <form onSubmit={handleSubmit}>
                        <label htmlFor="long_input">Longitude (decimal)</label>
                        <input
                            id="long_input"
                            name="long"
                            type={"text"}
                            pattern={"-*[0-9]+.*[0-9]*"}
                            title={"Enter a decimal number, e.g.: 12.345"}
                            onInvalid={() => {console.log("is invalid")}}
                            value={values.long}
                            onChange={handleChange}
                        />
                        <label htmlFor="lat_input">Latitude (decimal)</label>
                        <input
                            id="lat_input"
                            name="lat"
                            type={"text"}
                            title={"Enter a decimal number, e.g.: 12.345"}
                            pattern={"-*[0-9]+.*[0-9]*"}
                            onInvalid={() => {console.log("is invalid")}}
                            value={values.lat}
                            onChange={handleChange}
                        />
                    <input type="submit" value={"submit"} />
                </form>
                <div>
                    <div><span>DMS: </span>{coords_ ? coords_.toDMS() : "-"}</div>
                </div>
                <div>
                    <div><span>Elevation: </span>{elevation === null ? 0 : elevation}m / {meter2feet(elevation)}ft</div>
                </div>
            </div>
       </>
    )
}
