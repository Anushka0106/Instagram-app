import React, { useContext } from 'react';
import logo from "../img/logo.png";
import './Navbar.css';
import { Link } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

export default function Navbar({ login }) {
  const{setModalOpen} =useContext(LoginContext)
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("jwt");
    setModalOpen(false);
    // setUserLogin(false);
  };

  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return (
        <>
          <li><Link to='/profile'>Profile</Link></li>
          <li><Link to='/createPost'>Create Post</Link></li>
          {/* Open the modal on click */}
          <li><button className='primaryBtn' onClick={() => setModalOpen(true)}>Log Out</button></li>
        </>
      );
    } else {
      return (
        <>
          <li><Link to='/signup'>Sign Up</Link></li>
          <li><Link to='/signin'>Sign In</Link></li>
        </>
      );
    }
  };

  return (
    <div className='navbar'>
      <img src={logo} alt='Logo' />
      <ul className='nav-menu'>
        {loginStatus()}
      </ul>
    </div>
  );
}
