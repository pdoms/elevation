import {useState} from 'react';
import {IOCenter} from './iocenter';
import {RenderMap} from './rendermap';
export const Elevation = () => {
    const [coords, setCoords] = useState<Coordinates | undefined>()
    const [elevation, setElevation] = useState(0)

    const handleElevationResult = (elev: number | null) => {}
    const handleInputs = (coords: Coordinates | null) => {}

    return (
       <>
        <IOCenter 
            getInputs={handleInputs} 
            elevation={elevation} 
            coords={coords} />
        <RenderMap 
            coords={coords} 
            getElevation={handleElevationResult}
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
