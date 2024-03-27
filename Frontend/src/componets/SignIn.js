import React, { useState ,useContext} from "react";
import "./SignIn.css"; // Importing CSS file for styling
import logo from "../img/logo.png"; // Importing logo image
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginContext } from "../context/LoginContext";

// Declare variables and functions
const emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;

const notifyA = (msg) => toast.error(msg);
const notifyB = (msg) => toast.success(msg);

export default function SignIn() {
  const  {setUserLogin}=useContext(LoginContext)
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postData = () => {
    if (!emailRegex.test(email)) {
      notifyA("Invalid Email");
      return;
    }

    fetch("http://localhost:5000/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text || 'Server Error');
          });
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("Signed in successfully");
          console.log(data);
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setUserLogin(true)
          navigate("/");
        }
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        notifyA("An error occurred while signing in.");
      });
  };

  return (
    <div className="signIn">
      <div>
        <div className="loginform">
          <img className="signUpLogo" src={logo} alt="" /> {/* Logo */}
          <div>
            {/* Modified input field for email */}
            <input
              type="email"
              value={email}
              placeholder="Email Address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              autoComplete="email"
            />
          </div>
          <div>
            {/* Modified input field for password */}
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              autoComplete="current-password"
            />
          </div>
          <input
            type="submit"
            id="login-btn"
            onClick={postData}
            value="Sign In"
          />{" "}
          {/* Sign-in button */}
        </div>
        <div className="loginform2">
          {/* Link to SignUp component */}
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "blue", cursor: "pointer" }}>
            SignUp
          </Link>
        </div>{" "}
        {/* Sign-up message */}
      </div>
    </div>
  );
}





// import React, { useState } from 'react';
// import './SignIn.css'; // Importing CSS file for styling
// import logo from '../img/logo.png'; // Importing logo image
// import SignUp from './SignUp'; // Importing SignUp component (though not used in this component)
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from 'react-toastify';

// export default function SignIn() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const notifyA = (msg) => toast.error(msg);
//   const notifyB = (msg) => toast.success(msg);

//   const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//   const postData = () => {
//     // checking email
//     if (!emailRegex.test(email)) {
//       notifyA("Invalid Email");
//       return;
//     }

//     // sending data to server 
//     fetch("http://localhost:5000/signin", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json"
      
//       },
//       body: JSON.stringify({
//         email: email,
//         password: password
//       })
//     }).then(res => res.json())
//       .then(data => {
//         if (data.error) {
//           notifyA(data.error);
//         } else {
//           notifyB(data.message);
//           console.log(data.token)
//           localStorage.setItem("jwt",data.token); // Correct token storage
//           navigate("/");
//         }
//         console.log(data);
//       });
//   };

//   return (
//     <div className="signIn">
//       <div>
//         <div className="loginform">
//           <img className="signUpLogo" src={logo} alt="" /> {/* Logo */}
//           <div>
//             {/* Modified input field for email */}
//             <input type="email" name='email' id='email' value={email} placeholder='Email Address' onChange={(e) => { setEmail(e.target.value) }} required autoComplete="email" />
//           </div>
//           <div>
//             {/* Modified input field for password */}
//             <input type="password" name='password' value={password} id='password' placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} required autoComplete="current-password" />
//           </div>
//           <input type="submit" id="login-btn" onClick={() => { postData() }} value="Sign In" /> {/* Sign-in button */}
//         </div>
//         <div className="loginform2">
//           {/* Link to SignUp component */}
//           Don't have an account? <Link to="/signup" style={{ color: 'blue', cursor: 'pointer' }}>SignUp</Link>
//         </div> {/* Sign-up message */}
//       </div>
//     </div>
//   );
// }
