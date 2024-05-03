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

const NonProfitView = () => {
  // Expanded mock data representing companies
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState(null);

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
            <button>Connect with {donor.username}!</button>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default NonProfitView;
