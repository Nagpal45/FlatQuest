import { useState } from 'react';
import './navbar.scss';
import { Link } from 'react-router-dom';

function Navbar() {
  const [open, setOpen] =useState(false);
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
        <Link href="">Sign In</Link>
        <Link href="" className='register'>Sign Up</Link>
        <div className="menuIcon">
          <img src="/menu.png" alt="" onClick={()=>setOpen((prev) => !prev)} />
        </div>
        <div className={open ? "menu active": "menu"}>
        <Link href="">Home</Link>
        <Link href="">About</Link>
        <Link href="">Contact</Link>
        <Link href="">Agents</Link>
        <Link href="">Sign In</Link>
        <Link href="">Sign Up</Link>
        </div>
     </div>
    </nav>
  );
}

export default Navbar;