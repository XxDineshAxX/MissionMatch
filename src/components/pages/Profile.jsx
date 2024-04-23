import "./Profile.css";
import { useState, useEffect, useContext } from "react";
import { SigninContext } from "../../contexts/SigninContext";

function Profile () {

  const posts = [
    {
      id: 1,
      title: "First Post",
      description: "This is the first post",
    },
    {
      id: 2,
      title: "Second Post",
      description: "This is the second post",
    },
    {
      id: 3,
      title: "Third Post",
      description: "This is the third post",
    },
  ];

  const { isSignedIn, userInfo } = useContext(SigninContext);

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {
      !isSignedIn && 
      <h2>User Name</h2>
      }

      {
      isSignedIn && 
      <h2>{userInfo.username}</h2>
      }

      <div className="feed-container">
        {/* Display the feed of posts here */}
        <div className="feed">
          {/* Map through an array of posts and render each post */}
          {posts.map((post) => (
            <div key={post.id} className="post">
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}


export default Profile;
