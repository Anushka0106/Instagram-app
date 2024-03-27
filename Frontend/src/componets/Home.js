import React, { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    // Check if the user is authenticated
    if (!token) {
      navigate("/signup"); // Navigate to the signup page
    } else {
      // Fetch all posts when the component mounts
      fetchPosts();
    }
  }, []);

  // Function to fetch all posts from the server
  const fetchPosts = () => {
    fetch("http://localhost:5000/allposts", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
    })
      .then(res => res.json())
      .then(result => setData(result))
      .catch(err => console.log(err));
  }

  // Function to handle liking or unliking a post
  const handleLike = (id) => {
    const post = data.find(post => post._id === id);
    if (post.likes.includes(JSON.parse(localStorage.getItem("user"))._id)) {
      // If the user has already liked the post, unlike it
      unlikePost(id);
    } else {
      // If the user has not liked the post, like it
      likePost(id);
    }
  }

  // Function to perform like action on a post
  const likePost = (id) => {
    fetchAction("like", id);
  }

  // Function to perform unlike action on a post
  const unlikePost = (id) => {
    fetchAction("unlike", id);
  }

  // Function to perform like/unlike action on a post
  const fetchAction = (action, id) => {
    fetch(`http://localhost:5000/${action}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({ postId: id })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
        // Refresh posts after the action
        fetchPosts();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  // Function to handle comment posting
  const makeComment = (text, id) => {
  // Make a POST request to the server to add a new comment
  fetch("http://localhost:5000/comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("jwt")
    },
    body: JSON.stringify({
      text: text, // The comment text
      postId: id, // The ID of the post to which the comment belongs
    }),
  })
    .then(res => {
      // Check if the response is ok
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      // If response is ok, parse the JSON
      return res.json();
    })
    .then((result) => {
      // Log the result (if needed)
      console.log(result);
      // Refresh posts after posting a comment
      fetchPosts();
    })
    .catch(error => {
      // Handle any errors that occur during the process
      console.error('Error:', error.message);
    });
};


  return (
    <div className='home'>
      {/* Render each post */}
      {data.map((post) => (
        <div className='card' key={post._id}>
          {/* Display post header */}
          <div className="card-header">
            <div className='card-pic'>
              <img src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww' alt='Profile Pic' />
            </div>
            {/* Display the name of the user who posted the post */}
            {/* {post.postedBy.name}*/}
            <h5>userName</h5>
          </div>

          {/* Display post image */}
          <div className='card-image'>
            <img src={post.photo} alt='Post Image' />
          </div>

          {/* Display post content and like/unlike button */}
          <div className='card-content'>
            {/* Like/Unlike button */}
            {post.likes.includes(JSON.parse(localStorage.getItem("user"))._id) ? (
              <span className="material-symbols-outlined material-symbols-outlined-red" onClick={() => unlikePost(post._id)}>favorite</span>
            ) : (
              <span className="material-symbols-outlined" onClick={() => likePost(post._id)}>favorite</span>
            )}
            {/* Display number of likes */}
            <p>{post.likes.length} Likes</p>
            {/* Display post body */}
            <p>{post.body}</p>
            {/* Display users who liked the post */}
            {post.likes.length > 0 && (
              <p>Liked by: {post.likes.map((like, index) => (
                <span key={index}>{like.name}{index !== post.likes.length - 1 ? ', ' : ''}</span>
              ))}</p>
            )}
          </div>

          {/* Add comment section */}
          <div className='add-comment'>
            <span className="material-symbols-outlined">mood</span>
            <input type='text' placeholder='Add a comment' value={comment} onChange={(e) => setComment(e.target.value)} />
            <button className='comment' onClick={() => makeComment(comment, post._id)}>Post</button>
          </div>
        </div>
      ))}
    </div>
  );
}
