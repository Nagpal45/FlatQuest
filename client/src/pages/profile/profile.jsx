import { Link, useNavigate } from 'react-router-dom';
import Chat from '../../components/chat/chat'
import List from '../../components/list/list'
import apiRequest from '../../lib/apiRequest';
import './profile.scss'
import { AuthContext } from '../../context/AuthContext';
import { useContext} from 'react';

export default function Profile() {
  const navigate = useNavigate();

  const {currentUser, updateUser} = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const res = await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/login");
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
  <div className='profilePage'>
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/updateProfile"><button>Update Profile</button></Link>
          </div>
          <div className="info">
            <span>Avatar: <img src={currentUser.avatar || "/noavatar.jpg"} alt="" /></span>
            <span>Username: <b>{currentUser.username}</b></span>
            <span>Email: <b>{currentUser.email}</b></span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>Create new post</button>
          </div>
          <List />
          <div className="title">
            <h1>Saved Lists</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  )
}
