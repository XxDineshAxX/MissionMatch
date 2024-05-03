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
import { useNavigate } from "react-router-dom";

function CompanyOrDonorView() {

  const { currentUser } = useContext(SigninContext);
  const navigate = useNavigate();
  const [nonProfits, setNonProfits] = useState([]);
  const [error, setError] = useState(null);
  const [npo, setNPO] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchNonProfits = async () => {
      try {
        const q = query(collection(db, "users"),
          where("userType", "==", "non-profit")); 
        const querySnapshot = await getDocs(q);
        const nonProfitList = [];
        for (const docRef of querySnapshot.docs) {
          const donorData = docRef.data();
          const donorGrantsRef = doc(db, "userGrants", donorData.uid);
          const donorGrantsDoc = await getDoc(donorGrantsRef);
          if (donorGrantsDoc.exists() && donorGrantsDoc != null) {
            //console.log(donorGrantsDoc.data().donationType);
            nonProfitList.push({ ...donorData, grants: donorGrantsDoc.data() });
          } 
        }
        // in case of expansion
        // const shuffledNonProfits = nonProfitList.sort(() => Math.random() - 0.5);
        // const randomNonProfits = shuffledNonProfits.slice(0, 10);
        setNonProfits(nonProfitList);
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

    // setNPO("");
    // setUser(null);

    navigate("/MissionMatch/chat");
  };

  return (
    <div className="nonprofit-view">
      <h2>Non-Profits Seeking Support</h2>
      <div className="nonprofit-grid">
        {error && <div>Error: {error}</div>}
        {nonProfits.map(nonProfit => (
          <div key={nonProfit.uid} className="nonprofit-box">
            <h3>{nonProfit.username}</h3>
            
            <p>Needs: {nonProfit.grants.donationType}</p>
            <button onClick={() => {
              handleOrder(nonProfit);
              setNPO(nonProfit.username)
            }}>Connect with {nonProfit.username}!
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompanyOrDonorView;
