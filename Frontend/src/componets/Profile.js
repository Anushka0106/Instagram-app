import React ,{useEffect,useState}from 'react';
import './profile.css';

export default function Profile() {
  const[pic,setPic]=useState([])
  useEffect(() => {
    fetch('http://localhost:5000/myposts', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
    .then(res=>res.json())
    .then((result)=>console.log(result))
  }, []);
  
  

  return (
    <div className='profile'>
      {/*profile frame*/}
      <div className='profile-frame'>
        {/*profile pic*/}
        <div className='profile-pic'>
          <img src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww' alt=''/>
        </div>
        {/*profile data*/}
        <div className='profile-data'>
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className='profile-info' style={{ display: "flex" }}>
            <p style={{ marginRight: "10px" }}>40 posts</p>
            <p style={{ marginRight: "10px" }}>40 followers</p>
            <p>40 following</p>
          </div>
        </div>
      </div>
      <hr style={{width:"90%",opacity:"0.8",margin:"25px auto"}}/>
      {/*profile gallery*/}
      <div className='gallery'>
      {pic.map((pics)=>{
        return<img key ={pics._id} src={pics.photo} className='item'></img>
      })}
      </div>
    </div>
  );
}
