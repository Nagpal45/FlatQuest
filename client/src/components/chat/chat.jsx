import { useContext, useState } from 'react';
import './chat.scss';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import { format } from 'timeago.js';

export default function Chat({ chats }) {
  const [chatOpen, setChatOpen] = useState(null);
  const {currentUser} = useContext(AuthContext);

  const handleOpenChat = async (id, receiver) => {
    try{
      const res = await apiRequest("/chats/"+id);
      setChatOpen({...res.data, receiver});
    }catch(err){
      console.log(err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");

    if(!text) return;
    try{
      const res = await apiRequest.post("/messages"+chatOpen.id, {
        text,
      });
      setChatOpen(prev => ({...prev,messages: [...prev.messages, res.data]}));
      e.target.reset();
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='chat'>
      <div className="messages">
        <h1>Messages</h1>
        {
          chats?.map((chat) => (
            <div className="message" key={chat.id}
            style={{
              backgroundColor: chatOpen.seenBy.includes(currentUser.id) ? "white" : "#fecd514e",
            }}
            onClick={() => handleOpenChat(chat.id, chat.receiver)}
            >
              <img src={chat.receiver.avatar || "/noavatar.jpg"} alt="" />
              <span>{chat.receiver.username}</span>
              <a href="">{chat.lastMessage}</a>
            </div>
          ))}
      </div>
      {
        chatOpen && <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chatOpen.receiver.avatar || "/noavatar.jpg"} alt="" />
              {chatOpen.receiver.username}
            </div>
            <span className="close"
              onClick={() => setChatOpen(null)}
            >X</span>
          </div>
          <div className="center">
          {chatOpen.messages.map((message) => (
            <div className="chatMessage" 
            style={{
              alignSelf: message.userId === currentUser.id ? "flex-end" : "flex-start",
              textAlign: message.userId === currentUser.id ? "right" : "left",
            }} key={message.id}>
              <p>{
                message.text
              }</p>
              <span>{
                format(message.createdAt)
              }</span>
            </div>
          ))}
          </div>
          <form onSubmit={handleSubmit}  className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      }
    </div >
  )
}
