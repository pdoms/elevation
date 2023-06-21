import {LatLng, LatLngTuple, LeafletMouseEvent} from "leaflet";
import "leaflet/dist/leaflet.css";
import {SetStateAction, useEffect, useRef, useState, FC} from "react";
import {MapContainer, Marker, TileLayer, useMapEvents, useMap} from "react-leaflet"
import {_to_array} from "./helper";
import {Icon} from "leaflet";
import icn from "../assets/location-pin.png"

export const PinMarker = new Icon({
    iconUrl: icn,
    iconSize: [64,64]
})

interface ISetViewOnClick {
    coords: LatLngTuple
}

/* This Component renders the map, loaded from openstreetmap.org. It further 
 * handles clicks on the map.
 * */
export const RenderMap = () => {
    const [currentPosition, setCurrentPosition] = useState<LatLngTuple>([48.0, 15.0])

    useEffect(() => {
        // get user location via navigator -> this works best with gps connected devices
        // and can deviate quite significantly if indoors on a Laptop etc. 
        let loc = navigator.geolocation;
        loc.getCurrentPosition(onSuccess, onError)
    }, [])

    const onSuccess = (pos: GeolocationPosition): void => {
        let {longitude, latitude} = pos.coords;
        setCurrentPosition({
            lat: latitude,
            long: longitude,
            toArray: _to_array
        }.toArray())

    }

    const onError = (err: GeolocationPositionError): void => {
        //TODO: inform user
        console.error(err)
        //set to vienna for now, this could also be provided via env var
        setCurrentPosition([48.210033, 16.363449])
    }

    //centers the view of the map when map is clicked
    const SetViewOnClick: FC<ISetViewOnClick> = ({coords}): null => {
      const map = useMap()
      map.setView(coords, map.getZoom())
      return null
    }
    
    //click handler, to set the marker a new on click, and trigger further api calls
    const LocationFinder = (): null => {
        const map = useMapEvents({
            click: (e: LeafletMouseEvent) => {
                console.log(e)
                let latlng: LatLngTuple = [e.latlng.lat, e.latlng.lng]
                setCurrentPosition(latlng)

            },
        });
        return null;
    };

    return (
        <>
            <MapContainer 
                center={currentPosition} 
                zoom={14}
            >
                <TileLayer 
                    attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <SetViewOnClick coords={currentPosition}/>
                <LocationFinder />
                <Marker position={currentPosition} icon={PinMarker}/>
            </MapContainer>
        </>
    )
}
