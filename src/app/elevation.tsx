import {useEffect, useState} from 'react';
import {IOCenter} from './iocenter';
import {RenderMap} from './rendermap';

/**
 * Main Component that displays IOCenter, RenderMap and Sources/Resources.
 * It functions as an interface between the components, by relaying user inputs
 * to the map and elevation data back to IOCenter for displaying.
 * **/
export const Elevation = () => {
    const [coords, setCoords] = useState<Coordinates | undefined>()
    const [coordsFromMap, setCoordsFromMap] = useState<Coordinates | undefined>()
    const [elevation, setElevation] = useState(0)
    
    //callback/handler to relay elevation data to IOCenter for display
    const handleElevationResult = (elev: number | null) => {
        if (elev) {
            setElevation(elev)
        }
    }
    //callback/handler to relay input data to the map and fetch elevation data
    const handleInputs = (coordi: Coordinates | null) => {
        if (coordi) {
            setCoords(coordi)
            getElevation(coords)
        }
    }
    //callback that fetches elevation data when input changes
    const getElevation = (coords: Coordinates | undefined) => {
    }


    return (
       <>
        <IOCenter 
            getInputs={handleInputs} 
            elevation={elevation} 
            coords={coordsFromMap} 
            getError={() => {}}
            />
        <RenderMap 
            coords={coords} 
            getElevation={handleElevationResult}
            getCoords={setCoordsFromMap}
            getError={() => {}}
            />
        <div>
        <div>Marker icons created by Vector Stall - <a href="https://www.flaticon.com/free-icons/marker" title="marker icons">Flaticon</a> </div>
        <div>Elevation Api:<a href="https://www.opentopodata.org/api/" title="elevation source"> opentopdata</a> </div>
        <div>Elevation Dataset: <a href="https://www.opentopodata.org/api/" title="dataset used">ASTER</a> [global data, most up-to-date and sufficiently accurate]</div>
</div>
       </>
    )
}
