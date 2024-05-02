import React, { useEffect } from "react";
import "./Admin.css";

const Admin = () => {
  const mockData = [
    { id: 1, title: "Mock Post 1", body: "This is a mock post." },
    { id: 2, title: "Mock Post 2", body: "This is another mock post." },
  ];

  const dataToRender = mockData.length > 0 ? mockData : mockData;

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="admin-container">
      <h1 className="title">Admin Page</h1>
      {dataToRender.map((post) => (
        <div key={post.id} className="post-container">
          <h3 className="post-title">{post.title}</h3>
          <p className="post-body">{post.body}</p>
          <button className="delete-button">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Admin;
