import CardItem from "./CardItem";
import "./Cards.css";
import { SigninContext } from "../contexts/SigninContext";
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
import { db } from '../index'

function Cards() {
  const { currentUser } = useContext(SigninContext);
  const [nonProfits, setNonProfits] = useState([]);
  const [error, setError] = useState(null);


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
            console.log(donorGrantsDoc.data().donationType);
            nonProfitList.push({ ...donorData, grants: donorGrantsDoc.data() });
          } 
        }
        // in case of expansion
        // const shuffledNonProfits = nonProfitList.sort(() => Math.random() - 0.5);
        // const randomNonProfits = shuffledNonProfits.slice(0, 10);
        setNonProfits(nonProfitList);
        console.log(nonProfitList[0])
      } catch (error) {
        setError(error.message);
      }
    };
    fetchNonProfits()
  }, []); 

  return (
    <div className="cards">
      <h1>Discover Missions inspired by many like you</h1>
      <div className="cards__container">
        <div className="cards__wrapper">

          <ul className="cards__items">
          {error && <div>Error: {error}</div>}
          {nonProfits.map(nonProfit => (
          <CardItem
          uid={nonProfit.uid} 
          donationType={nonProfit.grants.donationType}
          amount={nonProfit.grants.donationGoal}
          src="./images/img-12.jpg"
          text={nonProfit.grants.description}
          label={nonProfit.grants.title}
          path={
            currentUser != null
              ? `/MissionMatch/grant`
              : "/MissionMatch/sign-up"
          }
        />
        ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
