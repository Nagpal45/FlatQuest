import { Marker, Popup } from 'react-leaflet';
import './marker.scss';
import { Link } from 'react-router-dom';

export default function MapMarker({item}) {
    const position = [item.latitude, item.longitude];
  return (
    <Marker position={position}>
        <Popup>
            <div className="popupContainer">
              <img src={item.images[0]} alt={item.title} />
              <div className="textContainer">
                <Link to={`/listing/${item.id}`}>{item.title}</Link>
                <span className='bed'>{item.bedroom} bedrooms</span>
                <b>$ {item.price}</b>
              </div>
            </div>
        </Popup>
        </Marker>
  )
}
