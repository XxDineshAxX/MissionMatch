import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from '../../index'
import './CompanyOrDonorView.css'; // Make sure you have this CSS file

function CompanyOrDonorView() {
  const [nonProfits, setNonProfits] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNonProfits = async () => {
      try {
        const q = query(collection(db, "users"),
        where("userType", "==", "non-profit")); 
        const querySnapshot = await getDocs(q);
        const nonProfitList = [];
        querySnapshot.forEach((doc) => {
          nonProfitList.push(doc.data());
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

  return (
    <div className="nonprofit-view">
      <h2>Non-Profits Seeking Support</h2>
      <div className="nonprofit-grid">
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
}

export default CompanyOrDonorView;