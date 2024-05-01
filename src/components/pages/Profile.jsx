import "./Profile.css";
import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { SigninContext } from "../../contexts/SigninContext";
import { auth } from "../../index";
import { Link } from "react-router-dom";

const Profile = () => {
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

  const { currentUser } = useContext(SigninContext);

  return (
    <div className="profile-container">
      <h2>Profile</h2>

      <h2>{currentUser.username}</h2>
      <button className="signup-btn" onClick={() => signOut(auth)}>
        logout
      </button>

      <Link to="/admin">
        <button className="signup-btn">Go to Admin Page </button>{" "}
      </Link>

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
};

export default Profile;
