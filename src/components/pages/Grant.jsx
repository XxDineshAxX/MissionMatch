import Cards from "../Cards";
import "./Grant.css";
import React, { useEffect, useState } from "react";
import DonationProgressBar from "./DonationProgressBar";
import { useSelectedUid } from "../../contexts/SelectedUidContext";


function Grant() {
  const { selectedUidData } = useSelectedUid();
  const { selectedUid, donationType, amount, title, description, dispensed } = selectedUidData;

  useEffect(() => {
    
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="grant-container">
        
          <>
            <div className="grant-title">
              <h1>{title}</h1>
              <figure className="grant__item__pic-wrap" data-category="Medical">
                <img src="./images/img-10.jpg" alt="IMG" className="grant__item__img" />
              </figure>
              <h2>{donationType}</h2>
              <p>{amount}</p>
              <p>Raised: {dispensed}</p>
              <DonationProgressBar />
            </div>

            <div className="grant-content">
              <h1>Mission Objective</h1>
              <p>
                {description}
              </p>
            </div>
          </>

      </div>
    </>
  );
}

export default Grant;
