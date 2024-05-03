import "./Profile.css";
import React, { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { SigninContext } from "../../contexts/SigninContext";
import { auth } from "../../index";
import { Link } from "react-router-dom";
import { db } from "../../index";
import { doc, updateDoc, collection, addDoc, getDocs, setDoc } from "firebase/firestore";
import "./DonationList.css";

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

  const [donationHistory, setDonationHistory] = useState([]);

  const { currentUser } = useContext(SigninContext);

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);

    const fetchDonationHistory = async () => {
      try {
        const historyRef = collection(db, "history", currentUser.uid, "donations");
        const donationSnapshot = await getDocs(historyRef);
        const donations = [];
        donationSnapshot.forEach((doc) => {
          // Extract data from each donation document
          const donationData = doc.data();
          console.log(donationData);
          donations.push(donationData);
        });
        // Set donationHistory state to the array of donations
        setDonationHistory(donations);
      } catch (error) {
        console.error("Error fetching donation history:", error);
      }
    };

    fetchDonationHistory();
  }, [currentUser]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };


  return (
    <div className="profile-container">
      <h1>Profile</h1>

      <h2>{currentUser.username}</h2>
      <Link to="/MissionMatch/">
        <button className="signup-btn" onClick={() => signOut(auth)}>
          logout
        </button>
      </Link>

      <Link to="/MissionMatch/admin">
        <button className="signup-btn">Go to Admin Page </button>{" "}
      </Link>

      <h3> Your Messages </h3>
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

        <h3> History </h3>
        <div className="donation-table-container">
      <table className="donation-table">
        <thead>
          <tr>
            <th className="date-column">Timestamp</th>
            <th className="type-column">Donation Type</th>
            <th className="role-column">Role</th>
            <th className="amount-column">Amount</th>
          </tr>
        </thead>
        <tbody>
          {donationHistory.map((donation, index) => (
            <tr key={index}>
              <td className="date-column">{formatDate(donation.timestamp)}</td>
              <td className="type-column">{donation.donationType}</td>
              <td className="role-column">{donation.role}</td>
              <td className="amount-column">${donation.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        
      </div>
    </div>
  );
};

export default Profile;
