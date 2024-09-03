import { Link, useNavigate } from 'react-router-dom';
import './card.scss';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect, useRef, useState } from 'react';
import apiRequest from '../../lib/apiRequest';
import { SocketContext } from '../../context/SocketContext';
import { useNotificationStore } from '../../lib/notificationStore';
import { format } from "timeago.js";


export default function Card({ item }) {
  const [saved, setSaved] = useState(item.isSaved);
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const [receiverInfo, setReceiverInfo] = useState(null)

  const messageEndRef = useRef();

  const decrease = useNotificationStore((state) => state.decrease);

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

  const  handleDelete = async () =>{
    await apiRequest.delete(`/posts/${item.id}`);
    window.location.reload();
  }

  const handleChat = async (rID) =>{
    const chat = await apiRequest.post('/chats', {receiverId: rID})
    const chatData = chat.data;
    setReceiverInfo(chatData.receiver)
    handleOpenChat(chatData.id, rID)
  }

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest("/chats/" + id);
      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }
      setChat({ ...res.data, receiver });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;
    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className='card'>
      <Link to={`/listing/${item.id}`} className='imageContainer'>
        {item.images.length > 0 ? <img src={item.images[0]} alt=""/> : <img src="/home.png" alt="" style={{
          width: "30px",
          height: "30px",
          borderRadius: "0px",
          filter: "invert(1)",
        }}/>}
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
                    <img src="/delete.png" alt="delete" onClick = {handleDelete}/>
                  </div>
                </>
              ) : (
                <>
                  <div className="icon" onClick={handleSave} style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}>
                    <img src="/save.png" alt="save" />
                  </div>
                  <div className="icon" style={{
                backgroundColor: chat ? "#fece51" : "white",
              }} onClick={() => handleChat(item?.user?.id ? item.user.id : item.userId)}>
                    <img src="/chat.png" alt="chat" />
                  </div>
                </>
              )
            }
          </div>
        </div>
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={receiverInfo.avatar || "noavatar.jpg"} alt="" />
              {receiverInfo.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {chat.messages.map((message) => (
              <div
                className="chatMessage"
                style={{
                  alignSelf:
                    message.userId === currentUser.id
                      ? "flex-end"
                      : "flex-start",
                  textAlign:
                    message.userId === currentUser.id ? "right" : "left",
                }}
                key={message.id}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  )
}
