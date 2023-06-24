import {FC, useState, FormEvent, ChangeEvent, useEffect, SetStateAction} from 'react';
import { CoordinatesFactory, meter2feet, parseValuesToCoordinates } from './helper';

const ERROR_BACKGROUND =  "rgba(255, 41, 72, 0.27)"
const ERROR_BORDER =  "rgba(255, 41, 72, 1)"


interface IIOCenter {
    getInputs: (coords: Coordinates) => void
    getError: (err: string) => void
    elevation: number | null
    coords: Coordinates | undefined

}
export const IOCenter: FC<IIOCenter> = ({coords, elevation, getInputs, getError}) => {
    const [values, setValues] = useState({lat: "", long: ""})
    const [coords_, setCoords_] = useState<Coordinates>(CoordinatesFactory(0,0))
    const [isErrorLong, setIsErrorLong] = useState<boolean | SetStateAction<boolean>>(false)
    const [isErrorLat, setIsErrorLat] = useState<boolean | SetStateAction<boolean>>(false)

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
        setIsErrorLat(false)
        setIsErrorLong(false)
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
            <div className="io_form_wrapper">
                <form onSubmit={handleSubmit} className="io_form">
                        <label htmlFor="lat_input">Latitude (decimal)</label>
                        <input
                            style={isErrorLat ? {background: ERROR_BACKGROUND, border: `1px solid ${ERROR_BORDER}`} : {}}
                            id="lat_input"
                            name="lat"
                            type={"text"}
                            title={"Enter a decimal number, e.g.: 12.345"}
                            pattern={"-*[0-9]+.*[0-9]*"}
                            onInvalid={() => {setIsErrorLat(true)}}
                            value={values.lat}
                            onChange={handleChange}
                        />
                        <label htmlFor="long_input">Longitude (decimal)</label>
                        <input
                            style={isErrorLong ? {background: ERROR_BACKGROUND, border: `1px solid ${ERROR_BORDER}`} : {}}
                            id="long_input"
                            name="long"
                            type={"text"}
                            pattern={"-*[0-9]+.*[0-9]*"}
                            title={"Enter a decimal number, e.g.: 12.345"}
                            onInvalid={() => {setIsErrorLong(true)}}
                            value={values.long}
                            onChange={handleChange}
                        />
                    <input type="submit" value={"submit"} />
                </form>
                <div className="io_out">
                <div>
                    <div><span className="io_out_key">Elevation: </span>{elevation === null ? 0 : elevation}m / {meter2feet(elevation)}ft</div>
                </div>
                <div>
                    <div><span className="io_out_key">DMS: </span>{coords_ ? coords_.toDMS() : "-"}</div>
                </div>

                </div>
            </div>
       </>
    )
}
