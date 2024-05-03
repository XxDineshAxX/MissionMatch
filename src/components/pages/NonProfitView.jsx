import React, { useContext, useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from '../../index'
import './NonProfitView.css'; // Ensure you have a corresponding CSS file for styling
import { SigninContext } from "../../contexts/SigninContext";
import { useNavigate } from "react-router-dom";
import { useSelectedChat } from "../../contexts/ChatContext";

const NonProfitView = () => {
  const { setSelectedChat } = useSelectedChat();
  // Expanded mock data representing companies
  const { currentUser } = useContext(SigninContext);
  const navigate = useNavigate();
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState(null);
  const [npo, setNPO] = useState("");
  const [user, setUser] = useState(null);

  const handleChatCreation = async (user, username) => {
    const combinedId =
      currentUser.uid > user
        ? currentUser.uid + user
        : user + currentUser.uid;

        setSelectedChat({
          chatID:combinedId,
          recepientid: user,
          recName: username,
        });
    try {
      const chatstore = await getDoc(doc(db, "chats", combinedId));

      if (!chatstore.exists()) {
        
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

      } else {
        console.log('chat exists');
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    }

    // setNPO("");
    // setUser(null);

    navigate("/MissionMatch/chat");
  };

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const q = query(collection(db, "users"),
          where("userType", "!=", "non-profit")); 
        const querySnapshot = await getDocs(q);
        const nonProfitList = [];
        for (const docRef of querySnapshot.docs) {
          const donorData = docRef.data();
          const donorGrantsRef = doc(db, "userGrants", donorData.uid);
          const donorGrantsDoc = await getDoc(donorGrantsRef);
          if (donorGrantsDoc.exists() && donorGrantsDoc != null) {
            nonProfitList.push({ ...donorData, grants: donorGrantsDoc.data() });
          } 
        }
        // in case of expansion
        // const shuffledNonProfits = nonProfitList.sort(() => Math.random() - 0.5);
        // const randomNonProfits = shuffledNonProfits.slice(0, 10);
        setDonors(nonProfitList);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchDonors();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div className="nonprofit-view">
      <h2>Available Grants from Companies</h2>
      <div className="company-grid">
      {error && <div>Error: {error}</div>}
        {donors.map(donor => (
          <div key={donor.uid} className="nonprofit-box">
            <h3>{donor.username}</h3>
            
            <p>Offering: {donor.grants.donationType}</p>
            <button onClick={() => {
              handleChatCreation(donor.uid, donor.username);
              setNPO(donor.username);
            }}>Connect with {donor.username}!
            </button>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default NonProfitView;
