import { Link, useNavigate } from "react-router-dom";
import "./Services.css";
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
import { useSelectedChat } from "../../contexts/ChatContext";


export default function Services() {

  const { setSelectedChat } = useSelectedChat();
  const { currentUser } = useContext(SigninContext);
  const navigate = useNavigate();
  const [nonProfits, setNonProfits] = useState([]);
  const [error, setError] = useState(null);
  const [npo, setNPO] = useState("");
  const [user, setUser] = useState(null);
  const [type, setType] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
        const userRef = doc(db, "userGrants", currentUser.uid);
        const userGrantsDoc = await getDoc(userRef);
        if (userGrantsDoc.exists() ){
          setType(userGrantsDoc.data().donationType)
          //const type = userGrantsDoc.data().donationType
        }

        console.log(type)
        
    }

    const fetchNonProfits = async () => {
      try {
        const q = query(collection(db, "users"),
          where("userType", "!=", currentUser.userType)); 
        const querySnapshot = await getDocs(q);
        const nonProfitList = [];
        for (const docRef of querySnapshot.docs) {
          const donorData = docRef.data();
          const donorGrantsRef = doc(db, "userGrants", donorData.uid);
          const donorGrantsDoc = await getDoc(donorGrantsRef);
          if (donorGrantsDoc.exists() && donorGrantsDoc != null) {
            //console.log(donorGrantsDoc.data().donationType);
            console.log(donorGrantsDoc.data().donationType)
            const type2 = donorGrantsDoc.data().donationType;

            if (type == type2){
              nonProfitList.push({ ...donorData, grants: donorGrantsDoc.data() });
            }
            
            //nonProfitList.push({ ...donorData, grants: donorGrantsDoc.data() });
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
    fetchData()
  }, []); 

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
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);

  }, []);

  return (
    <div className="matching-page">
      <h1>Matching</h1>
      <div className="matching-main">
        {nonProfits.map(nonProfit => (
          <div key={nonProfit.uid} className="org-section">
            <h2>{nonProfit.username}</h2>
            <h3>Goals:</h3>
            <ul>
              <li>{
              nonProfit.grants.donationType}
                <>
                  <span>&#10003;</span>
                </>
                </li>
                <li>Money Needed: ${
              nonProfit.grants.donationGoal}
                <>
                  <span>&#10003;</span>
                </>
                </li>
                <li>Money Raised: ${
              nonProfit.grants.dispensed}
                <>
                  <span>&#10003;</span>
                </>
                </li>
            </ul>
            <Link to="/MissionMatch/chat">
              <button onClick={() => handleChatCreation(nonProfit.uid, nonProfit.username)}>Request Match</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
