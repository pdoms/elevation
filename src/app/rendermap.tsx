import "leaflet/dist/leaflet.css";
import {useEffect, useState} from "react";
import {MapContainer, Marker, TileLayer} from "react-leaflet"
import {PinMarker} from "./marker";
import { Position } from "./position";

export const RenderMap = () => {
    const [currentPosition, setCurrentPosition] = useState<[number, number] | undefined>()

    useEffect(() => {
        let l = new Position();
        l.getUserPosition();
        setCurrentPosition(l.toArray())
    }, [])

    return (
        <>
        <MapContainer center={currentPosition ? currentPosition : [48.210033, 16.363449]} zoom={13}>
            <TileLayer 
                attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
                <Marker position={currentPosition ? currentPosition : [48.210033, 16.363449]} icon={PinMarker}/>
            
        </MapContainer>
        </>
    )
}
