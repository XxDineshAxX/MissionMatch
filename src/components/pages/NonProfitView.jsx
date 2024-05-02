import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from '../../index'
import './NonProfitView.css'; // Ensure you have a corresponding CSS file for styling

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
        const donorList = [];
        querySnapshot.forEach((doc) => {
          donorList.push(doc.data());
        });
        const shuffledDonors = donorList.sort(() => Math.random() - 0.5);
        const randomDonors = shuffledDonors.slice(0, 10);
        setNonProfits(randomDonors);
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
        {nonProfits.map(nonProfit => (
          <div key={nonProfit.uid} className="nonprofit-box">
            <h3>{nonProfit.username}</h3>
            <p>Needs: something</p>
            <button>Message</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NonProfitView;
