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
import './CompanyOrDonorView.css'; // Make sure you have this CSS file
import { SigninContext } from "../../contexts/SigninContext";

function CompanyOrDonorView() {

  const { currentUser } = useContext(SigninContext);

  const [nonProfits, setNonProfits] = useState([]);
  const [error, setError] = useState(null);
  const [showMessageInput, setShowMessageInput] = useState(false);
  const [npo, setNPO] = useState("");
  const [user, setUser] = useState(null);

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
    fetchNonProfits()
  }, []); 

  const handleOrder = (user) =>{
    setUser(user);
    handleChatCreation();
  }

  const handleChatCreation = async () => {
    console.log(user);
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

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

    setNPO("");
    setUser(null);
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
              handleOrder(nonProfit);
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
