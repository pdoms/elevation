import {LatLng, LatLngTuple, LeafletMouseEvent} from "leaflet";
import "leaflet/dist/leaflet.css";
import {SetStateAction, useEffect, useRef, useState, FC} from "react";
import {MapContainer, Marker, TileLayer, useMapEvents, useMap} from "react-leaflet"
import {CoordinatesFactory, _to_array} from "./helper";
import {Icon} from "leaflet";
import icn from "../assets/location-pin.png"
import {makeFetch} from "./controller";


interface IRenderMap {
    coords: Coordinates | undefined
    getCoords: (coords: Coordinates) => void
    getElevation: (elev: number | null)=> void
    getError: (err: string)=>void
}

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
export const RenderMap: FC<IRenderMap> = ({coords, getElevation, getError, getCoords}) => {
    const [currentPosition, setCurrentPosition] = useState<LatLngTuple>([48.210033, 16.363449])

    useEffect(() => {
        // get user location via navigator -> this works best with gps connected devices
        // and can deviate quite significantly if indoors on a Laptop etc. 
        let loc = navigator.geolocation;
        loc.getCurrentPosition(onSuccess, onError)
    }, [])

    const onSuccess = (pos: GeolocationPosition): void => {
        let {longitude, latitude} = pos.coords;
        let c = CoordinatesFactory(latitude, longitude)
        setCurrentPosition(c.toArray())
        getCoords(c)

    }

    const onError = (err: GeolocationPositionError): void => {
        //TODO: inform user
        console.error(err)
        //set to vienna for now, this could also be provided via env var
        setCurrentPosition([48.210033, 16.363449])
        getCoords(CoordinatesFactory(48.210033, 16.363449))
    }

    //centers the view of the map when map is clicked
    const SetViewOnClick: FC<ISetViewOnClick> = ({coords}): null => {
      const map = useMap()
      map.setView(coords, map.getZoom())
      return null
    }
    
    //click handler, to set the marker a new on click, and trigger further api calls
    const LocationFinder = (): null => {
        useMapEvents({
            click: (e: LeafletMouseEvent) => {
                let latlng: LatLngTuple = [e.latlng.lat, e.latlng.lng]
                setCurrentPosition(latlng)
                getCoords(CoordinatesFactory(latlng[0], latlng[1]))
            
                //Error handling is soft, no errors are really thrown but are
                //rather lifted to the highest possible component, to inform the user
                makeFetch(latlng[0], latlng[1]).then((r: number | null) => {
                    if (r === null) {
                        getError("Unable to fetch data")
                    } else {
                        getElevation(r)
                    }
                }).catch((err) => {
                    getError(err)
                })
            },
        });
        return null;
    };

    useEffect(() => {
        if (coords) {
        setCurrentPosition(coords.toArray())
      }
    }, [coords]) 

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
