import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from '../../index'
import './CompanyOrDonorView.css'; // Make sure you have this CSS file

function CompanyOrDonorView() {
  const [nonProfits, setNonProfits] = useState([]);
  const [error, setError] = useState(null);
  const [showMessageInput, setShowMessageInput] = useState(false);
  const [npo, setNPO] = useState("");

  useEffect(() => {
    const fetchNonProfits = async () => {
      try {
        const q = query(collection(db, "users"),
          where("userType", "==", "non-profit")); 
        const querySnapshot = await getDocs(q);
        const nonProfitList = [];
        querySnapshot.forEach((doc) => {
          nonProfitList.push({ uid: doc.id, ...doc.data() });
        });
        const shuffledNonProfits = nonProfitList.sort(() => Math.random() - 0.5);
        const randomNonProfits = shuffledNonProfits.slice(0, 10);
        setNonProfits(randomNonProfits);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchNonProfits();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  const checkIfChatExists = async (nonProfitId) => {
    const chatDocRef = doc(db, "chats", `${currentUser.uid}_${nonProfitId}`);
    const chatDocSnap = await getDoc(chatDocRef);
    return chatDocSnap.exists();
  };

  const handleChatCreation = async (nonProfitId) => {
    try {
      const chatExists = await checkIfChatExists(nonProfitId);
      if (!chatExists) {
        // Create a chat document in Firestore
        const chatDocRef = doc(db, "chats", `${currentUser.uid}_${nonProfitId}`);
        await setDoc(chatDocRef, { messages: [] });

        // Update userChats for current user
        const currentUserDocRef = doc(db, "userChats", currentUser.uid);
        await setDoc(currentUserDocRef, {
          [`${currentUser.uid}_${nonProfitId}.userInfo`]: {
            uid: nonProfitId,
            userType: "non-profit"
            // You can add more user information here if needed
          },
          [`${currentUser.uid}_${nonProfitId}.date`]: serverTimestamp()
        }, { merge: true });

        // Update userChats for the non-profit user
        const nonProfitUserDocRef = doc(db, "userChats", nonProfitId);
        await setDoc(nonProfitUserDocRef, {
          [`${currentUser.uid}_${nonProfitId}.userInfo`]: {
            uid: currentUser.uid,
            userType: currentUser.userType
          },
          [`${currentUser.uid}_${nonProfitId}.date`]: serverTimestamp()
        }, { merge: true });

      } else {
        console.log('chat exists');
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const handleMessageSend = async () => {
    setShowMessageInput(false);
  };

  return (
    <div className="nonprofit-view">
      <h2>Non-Profits Seeking Support</h2>
      <div className="nonprofit-grid">
        {error && <div>Error: {error}</div>}
        {nonProfits.map(nonProfit => (
          <div key={nonProfit.uid} className="nonprofit-box">
            <h3>{nonProfit.username}</h3>
            <p>Needs: something</p>
            <button onClick={() => {
              setShowMessageInput(true);
              handleChatCreation(nonProfit.uid);
              setNPO(nonProfit.username)
            }}>Message</button>
          </div>
        ))}
      </div>
      {showMessageInput && (
        <div className="nonprofit-box">
          <h3>Send a Message to {npo}</h3>
          <input type="text" />
          <button onClick={handleMessageSend}>Send</button>
        </div>
      )}
    </div>
  );
}

export default CompanyOrDonorView;
