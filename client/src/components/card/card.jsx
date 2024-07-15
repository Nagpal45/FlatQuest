import { Link } from 'react-router-dom';
import './card.scss';

export default function Card({ item }) {
  return (
    <div className='card'>
      <Link to={`/listing/${item.id}`} className='imageContainer'>
        <img src={item.images[0]} alt={item.title} />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/listing/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="pin" />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="bed" />
              <span>{item.bedroom} bedrooms</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="bath" />
              <span>{item.bathroom} bathrooms</span>
            </div>
          </div>
          <div className="icons">
          <div className="icon">
            <img src="/save.png" alt="save" />
          </div>
          <div className="icon">
            <img src="/chat.png" alt="chat" />
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
