import { useState } from 'react';
import './chat.scss';

export default function Chat() {
  const [chatOpen, setChatOpen] = useState(true);
  return (
    <div className='chat'>
      <div className="messages">
        <h1>Messages</h1>
        <div className="message">
          <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
          <span>John doe</span>
          <a href="">Lorem ipsum dolor sit amet...</a>
        </div>
        <div className="message">
          <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
          <span>John doe</span>
          <a href="">Lorem ipsum dolor sit amet...</a>
        </div>
        <div className="message">
          <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
          <span>John doe</span>
          <a href="">Lorem ipsum dolor sit amet...</a>
        </div>
        <div className="message">
          <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
          <span>John doe</span>
          <a href="">Lorem ipsum dolor sit amet...</a>
        </div>
        <div className="message">
          <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
          <span>John doe</span>
          <a href="">Lorem ipsum dolor sit amet...</a>
        </div>
        <div className="message">
          <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
          <span>John doe</span>
          <a href="">Lorem ipsum dolor sit amet...</a>
        </div>
        <div className="message">
          <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
          <span>John doe</span>
          <a href="">Lorem ipsum dolor sit amet...</a>
        </div>
      </div>
      {chatOpen && <div className="chatBox">
        <div className="top">
          <div className="user">
            <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            John Doe
          </div>
          <span className="close"
          onClick={() => setChatOpen(null)}
          >X</span>
        </div>
        <div className="center">
          <div className="chatMessage">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda quibusdam nihil incidunt sed cum, reiciendis rem nulla excepturi eveniet ab illo, ipsam vel. Doloribus tenetur provident animi, ad necessitatibus laborum!</p>
            <span>1 hour ago</span>
          </div>
          <div className="chatMessage own">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda quibusdam nihil incidunt sed cum, reiciendis rem nulla excepturi eveniet ab illo, ipsam vel. Doloribus tenetur provident animi, ad necessitatibus laborum!</p>
            <span>1 hour ago</span>
          </div>
          <div className="chatMessage">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda quibusdam nihil incidunt sed cum, reiciendis rem nulla excepturi eveniet ab illo, ipsam vel. Doloribus tenetur provident animi, ad necessitatibus laborum!</p>
            <span>1 hour ago</span>
          </div>
          <div className="chatMessage">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda quibusdam nihil incidunt sed cum, reiciendis rem nulla excepturi eveniet ab illo, ipsam vel. Doloribus tenetur provident animi, ad necessitatibus laborum!</p>
            <span>1 hour ago</span>
          </div>
          <div className="chatMessage own">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda quibusdam nihil incidunt sed cum, reiciendis rem nulla excepturi eveniet ab illo, ipsam vel. Doloribus tenetur provident animi, ad necessitatibus laborum!</p>
            <span>1 hour ago</span>
          </div>
          <div className="chatMessage">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda quibusdam nihil incidunt sed cum, reiciendis rem nulla excepturi eveniet ab illo, ipsam vel. Doloribus tenetur provident animi, ad necessitatibus laborum!</p>
            <span>1 hour ago</span>
          </div>
          <div className="chatMessage own">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda quibusdam nihil incidunt sed cum, reiciendis rem nulla excepturi eveniet ab illo, ipsam vel. Doloribus tenetur provident animi, ad necessitatibus laborum!</p>
            <span>1 hour ago</span>
          </div>
          <div className="chatMessage">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda quibusdam nihil incidunt sed cum, reiciendis rem nulla excepturi eveniet ab illo, ipsam vel. Doloribus tenetur provident animi, ad necessitatibus laborum!</p>
            <span>1 hour ago</span>
          </div>
        </div>
        <div className="bottom">
          <textarea></textarea>
          <button>Send</button>
        </div>
      </div>}
    </div>
  )
}
