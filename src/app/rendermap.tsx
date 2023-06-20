import "leaflet/dist/leaflet.css";
import {MapContainer, TileLayer} from "react-leaflet"

export const RenderMap = () => {
    return (
        <>
        <MapContainer center={[48.0, 15.0]} zoom={13}>
            <TileLayer 
                attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

            />
        </MapContainer>
        </>
    )
}
