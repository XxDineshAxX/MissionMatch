import React, { useState, useContext, useEffect } from "react";
import "./DonationProgressBar.css"; // Import CSS file for styling
import { SigninContext } from "../../contexts/SigninContext";
import { useSelectedUid } from "../../contexts/SelectedUidContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../index';

function DonationProgressBar() {
  const { selectedUidData, setSelectedUidData } = useSelectedUid();
  const { selectedUid, donationType, amount, title, description, dispensed } = selectedUidData;

  const [donationAmount, setDonationAmount] = useState(0);
  const [confirmedDonation, setConfirmedDonation] = useState(null);
  const [raisedAmount, setRaisedAmount] = useState(dispensed);
  const goalAmount = amount; // Set your fundraising goal amount here

  const { currentUser } = useContext(SigninContext);

  useEffect(() => {
    setRaisedAmount(dispensed);
  }, [dispensed]);

  const handleDonationChange = (event) => {
    const amount = parseFloat(event.target.value);
    if (!isNaN(amount)) {
      setDonationAmount(amount);
    }
  };

  const handleConfirmDonation = async () => {
    // Update progress bar only upon confirmed payment
    setConfirmedDonation(donationAmount);
    const newRaisedAmount = raisedAmount + donationAmount;

    // Open Stripe window after updating Firestore
    window.open("https://donate.stripe.com/test_bIY00d3JW9E3exq7ss", "_blank");

    try {
      // Update dispensed field in userGrants document
      await updateDoc(doc(db, 'userGrants', selectedUid), {
        dispensed: newRaisedAmount
      });

      // Update context with the new dispensed amount
      setSelectedUidData(prevState => ({
        ...prevState,
        dispensed: newRaisedAmount
      }));

    } catch (error) {
      console.error('Error updating dispensed amount:', error);
    }
  };

  const percentage = Math.min((raisedAmount / goalAmount) * 100, 100); // Ensure percentage doesn't exceed 100

  return (
    <div className="donation-progress-bar">
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="progress-info">
        <span>Raised: ${raisedAmount}</span>
        <span>Goal: ${goalAmount}</span>
      </div>
      {!confirmedDonation && (
        <>
          <input
            type="number"
            value={donationAmount}
            onChange={handleDonationChange}
            placeholder="Enter Donation Amount"
          />

          <button
            className="donate-btn"
            onClick={handleConfirmDonation}
            disabled={donationAmount <= 0} // Disable button if donation amount is 0
          >
            Confirm Donation
          </button>
        </>
      )}
      {confirmedDonation && <p>Thank you for your donation!</p>}
    </div>
  );
}

export default DonationProgressBar;
