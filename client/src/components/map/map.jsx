import { MapContainer, TileLayer } from "react-leaflet";
import './map.scss';
import 'leaflet/dist/leaflet.css';
import MapMarker from "../marker/marker";


export default function Map({ items }) {
  const position = [20.593, 78.9629];
  return (
    <MapContainer center={items.length === 1 ? [items[0].latitude, items[0].longitude] : position} zoom={5} scrollWheelZoom={false} className="map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <MapMarker key={item.id} item={item} />
      ))}
    </MapContainer>
  )
}
