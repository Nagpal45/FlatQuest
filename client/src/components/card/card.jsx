import { Link, useNavigate } from 'react-router-dom';
import './card.scss';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useState } from 'react';
import apiRequest from '../../lib/apiRequest';

export default function Card({ item }) {
  console.log(item);
  const [saved, setSaved] = useState(item.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/user/save", { postId: item.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };


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
            {
              item.userId === currentUser?.id ? (
                <>
                  <div className="icon">
                    <img src="/edit.png" alt="edit" />
                  </div>
                  <div className="icon">
                    <img src="/delete.png" alt="delete" />
                  </div>
                </>
              ) : (
                <>
                  <div className="icon" onClick={handleSave} style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}>
                    <img src="/save.png" alt="save" />
                  </div>
                  <div className="icon">
                    <img src="/chat.png" alt="chat" />
                  </div>
                </>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
