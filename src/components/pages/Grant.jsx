import Cards from "../Cards";
import "./Grant.css";
import React, { useEffect, useState } from "react";
import DonationProgressBar from "./DonationProgressBar";
import { useParams } from "react-router-dom";
import { useSelectedUid } from "../../contexts/SelectedUidContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../index'

function Grant() {
  const { selectedUid } = useSelectedUid();
  const [grant, setGrant] = useState(null);

  useEffect(() => {
    const fetchGrant = async () => {
      try {
        if (selectedUid) {
          const grantDocRef = doc(db, 'userGrants', selectedUid);
          const grantDocSnapshot = await getDoc(grantDocRef);
          if (grantDocSnapshot.exists()) {
            setGrant(grantDocSnapshot.data());
          } else {
            console.log('Grant not found');
          }
        }
      } catch (error) {
        console.error('Error fetching grant:', error);
      }
    };

    fetchGrant();
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, [selectedUid]);

  return (
    <>
      <div className="grant-container">
        {grant && ( // Render only if grant is not null
          <>
            <div className="grant-title">
              <h1>{grant.title}</h1>
              <figure className="grant__item__pic-wrap" data-category="Medical">
                <img src="./images/img-10.jpg" alt="IMG" className="grant__item__img" />
              </figure>
              <h2>Organizer</h2>
              <p>Cancer Fighters LLC</p>
              <DonationProgressBar />
            </div>

            <div className="grant-content">
              <h1>Mission Objective</h1>
              <p>
                {grant.description}
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Grant;
