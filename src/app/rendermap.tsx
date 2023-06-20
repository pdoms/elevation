import "leaflet/dist/leaflet.css";
import {useEffect, useRef, useState} from "react";
import {MapContainer, Marker, TileLayer, useMapEvents} from "react-leaflet"
import {PinMarker} from "./helper";

export const RenderMap = () => {
    const [currentPosition, setCurrentPosition] = useState<[number, number] | undefined>()
    const loc = useRef<Position | null>(null)

    useEffect(() => {
        loc.current = new Position();
        loc.current.getUserPosition();
        setCurrentPosition(loc.current.toArray())
    }, [])


    const LocationFinder = () => {
        useMapEvents({
            click(e) {
                setCurrentPosition(Object.values(e.latlng) as [number, number]

            },
        });
        return null;
    };

    return (
        <>
        <MapContainer 
            center={currentPosition ? currentPosition : [48.210033, 16.363449]} 
            zoom={13}>
            <TileLayer 
                attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationFinder/>
                <Marker position={currentPosition ? currentPosition : [48.210033, 16.363449]} icon={PinMarker}/>
            
        </MapContainer>
        </>
    )
}
