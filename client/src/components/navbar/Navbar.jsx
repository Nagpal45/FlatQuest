import { useContext, useState } from 'react';
import './navbar.scss';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Navbar() {
  const [open, setOpen] = useState(false);

  const {currentUser} = useContext(AuthContext);

  

  return (
    <nav>
      <div className="left">
        <Link href="/" className='logo'>
          <img src="/logo.png" alt="" />
          <span>VNestate</span>
        </Link>
        <Link href="">Home</Link>
        <Link href="">About</Link>
        <Link href="">Contact</Link>
        <Link href="">Agents</Link>
      </div>
      <div className="right">
        {currentUser ? (<div className="user">
          <img src={currentUser.avatar || "/noavatar.jpg"}/>
          <span>{currentUser.username}</span>
          <Link to="/profile" className='profile'>
            <div className="notification">
              3
            </div>
            <span>Profile</span>
          </Link>
        </div>) : (
          <>
            <Link to="/login">Sign In</Link>
            <Link to="/register" className='register'>Sign Up</Link>
          </>)}
        <div className="menuIcon">
          <img src="/menu.png" alt="" onClick={() => setOpen((prev) => !prev)} />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link href="">Home</Link>
          <Link href="">About</Link>
          <Link href="">Contact</Link>
          <Link href="">Agents</Link>
          {currentUser ? (<Link to="/profile" className='profile'>
            <span>Profile</span>
            </Link>) : (
              <>
              <Link href="">Sign In</Link>
              <Link href="">Sign Up</Link>
              </>)}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;