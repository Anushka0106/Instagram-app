import React, { useEffect, useState } from 'react';
import logo from "../img/logo.png";
import "./SignUp.css";
import SignIn from './SignIn';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast } from 'react-toastify';

export default function SignUp() {
  const navigate = useNavigate(); // Moved inside the functional component
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Corrected regex syntax
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*]).{8,}$/;

  const postData = () => {
    // checking email
    if (!emailRegex.test(email)) {
     notifyA("Invalid Email")
     return
    }
    else if(!passRegex.test(password)){
      notifyA("Password must contains at least 8 characters, including at least one number and one includes both lower and uppercase letter and special character ")
      return
    }

    // sending data to server 
    fetch("http://localhost:5000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name, // Corrected the spelling of "name"
        email: email,
        userName: userName,
        password: password
      })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          notifyA(data.error)
        }
        else {
          notifyB(data.message)
          navigate("/signin")
        }
        console.log(data)
      })
  }

  return (
    <div className='signup'>
      <div className='form-container'>
        <div className='form'>
          <img className="signUpLogo" src={logo} alt='' />
          <p className='loginPara'>
            Sign up to see photos and videos <br /> from your friends
          </p>
          <div>
            <input type="email" name='email' id='email' value={email} placeholder='Email Address' onChange={(e) => { setEmail(e.target.value) }} required />
          </div>
          <div>
            <input type="text" name='name' id='name' value={name} placeholder='Full Name' onChange={(e) => { setName(e.target.value) }} required />
          </div>
          <div>
            <input type="text" name='username' value={userName} id='usernname' placeholder='Username' onChange={(e) => { setUserName(e.target.value) }} required />
          </div>
          <div>
            <input type="password" name='password' value={password} id='password' placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} required />
          </div>
          <p className='loginPara' style={{ fontSize: "12px", margin: "3px 0px" }}>
            By signing up, you agree to our Terms, <br /> Data use policy, and privacy policy <br /> cookies policy.
          </p>
          <input type='submit' id='submit-btn' value="Sign Up" onClick={postData} />
        </div>
        <div className='form2'>
          Already have an account ?
          <Link to="/signin">
            <span style={{ color: "blue", cursor: "pointer" }}>SignIn</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
