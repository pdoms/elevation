import {useEffect, useState} from 'react';
import {makeFetch} from './controller';
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
        setElevation(elev !== null ? elev : 0)
    }
    //callback/handler to relay input data to the map and fetch elevation data
    const handleInputs = (coordi: Coordinates | null) => {
        if (coordi) {
            setCoords(coordi)
        }
    }
    //callback that fetches elevation data when input changes
    const getElevation = (coords: Coordinates | undefined) => {
        if (coords) {
            makeFetch(coords?.lat, coords.long).then((r: number | null) => {
            setElevation(r !== null ? r : 0)
            })
        } else {
            setElevation(0)
        }
    }

    useEffect(() => {
        if (coords) {
            getElevation(coords)
        }
    }, [coords])


    return (
        <>
            <div className="page_wrapper">
                <div className="heading">Elevation</div>
                    <div className="iocenter_wrapper"> 
                        <IOCenter 
                            getInputs={handleInputs} 
                            elevation={elevation} 
                            coords={coordsFromMap} 
                            getError={() => {}}
                         />
                    </div>
                    <div className="map_wrapper">
                    <RenderMap 
                        coords={coords} 
                        getElevation={handleElevationResult}
                        getCoords={setCoordsFromMap}
                        getError={() => {}}
                    />
                    <div className="resources">
                        <div>Marker icons created by Vector Stall - <a href="https://www.flaticon.com/free-icons/marker" title="marker icons">Flaticon</a> 
                        </div>
                        <div>Elevation Api:<a href="https://www.opentopodata.org/api/" title="elevation source"> opentopdata</a> 
                        </div>
                        <div>Elevation Dataset: <a href="https://www.opentopodata.org/api/" title="dataset used">ASTER</a> [global data, most up-to-date and sufficiently accurate]
                        </div>
                    </div>
                </div>
            </div>
        </>
    )}
