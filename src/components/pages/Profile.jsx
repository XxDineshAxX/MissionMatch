import React, { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { SigninContext } from "../../contexts/SigninContext";
import { auth } from "../../index";
import { Link } from "react-router-dom";
import { db } from "../../index";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { useSelectedChat } from "../../contexts/ChatContext";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(SigninContext);

  const { setSelectedChat } = useSelectedChat();

  const [chatData, setChatData] = useState([]);

  const [donationHistory, setDonationHistory] = useState([]);

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);

    const fetchDonationHistory = async () => {
      try {
        const historyRef = collection(db, "history", currentUser.uid, "donations");
        const donationSnapshot = await getDocs(historyRef);
        const donations = [];
        donationSnapshot.forEach((doc) => {
          const donationData = doc.data();
          donations.push(donationData);
        });
        setDonationHistory(donations);
      } catch (error) {
        console.error("Error fetching donation history:", error);
      }
    };

    fetchDonationHistory();

    const fetchChatIDs = async () => {
      try {
        const userChatsRef = doc(db, "userChats", currentUser.uid);
        const userChatsDocSnapshot = await getDoc(userChatsRef);
        const chats = userChatsDocSnapshot.data().chats || []; // Ensure chats array exists
        const chatData = await Promise.all(chats.map(async chatID => {
          const recipientID = chatID.substring(currentUser.uid.length); // Extract recipient ID by removing current user's UID
          const userDocRef = doc(db, "users", recipientID);
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const { username } = userDocSnapshot.data();
            return { chatID, recipientID, username };
          } else {
            return { chatID, recipientID, username: "Unknown" }; // Set username to "Unknown" if user not found
          }
        }));
        setChatData(chatData);
      } catch (error) {
        console.error("Error fetching chat IDs:", error);
      }
    };

    fetchChatIDs();
  }, [currentUser]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  const handleChatClick = (chatID, recipient, username) => {
    // Navigate to the chat page
    setSelectedChat({
      chatID:chatID,
      recipientid: recipient,
      recName: username,

    });
    navigate(`/MissionMatch/chat`);
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <h2>{currentUser.username}</h2>
      <Link to="/MissionMatch/">
        <button className="signup-btn" onClick={() => signOut(auth)}>
          Logout
        </button>
      </Link>
      <Link to="/MissionMatch/admin">
        <button className="signup-btn">Go to Admin Page</button>
      </Link>

      <h3>Your Messages</h3>
      <div className="feed-container">
        {/* Display the feed of chats here */}
        <div className="feed">
          {chatData.map((chat, index) => (
            <div key={index} className="post" onClick={() => handleChatClick(chat.chatID, chat.recipientID, chat.username)}>
              <h3>Chat {index + 1}</h3>
              <p>Recipient ID: {chat.username}</p>
            </div>
          ))}
        </div>

        <h3>History</h3>
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
