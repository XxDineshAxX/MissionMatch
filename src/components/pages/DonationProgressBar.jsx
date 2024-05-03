import React, { useState, useContext } from "react";
import "./DonationProgressBar.css"; // Import CSS file for styling
import { SigninContext } from "../../contexts/SigninContext";

function DonationProgressBar() {
  const [donationAmount, setDonationAmount] = useState(0);
  const [confirmedDonation, setConfirmedDonation] = useState(null);
  const [raisedAmount, setRaisedAmount] = useState(0);
  const goalAmount = 1000; // Set your fundraising goal amount here
  //const stripe = ('stripe')('sk_test_51PBjwgCnXQzMJSHMgxTM0w0hnPRY9HLt1S7yelFFtZRXFwqI8beBwIheMoDcv4lVEKTb1svKxFEUHqGqWErJwVGe00RKzEpF4i'); // stripe instance, test

  const handleDonationChange = (event) => {
    const amount = parseFloat(event.target.value);
    if (!isNaN(amount)) {
      setDonationAmount(amount);
    }
  };

  const handleConfirmDonation = () => {
    window.open("https://donate.stripe.com/test_bIY00d3JW9E3exq7ss", "_blank");
    // Update progress bar only upon confirmed payment
    setConfirmedDonation(donationAmount);
    setRaisedAmount(raisedAmount + donationAmount);
  };

  const percentage = Math.min((raisedAmount / goalAmount) * 100, 100); // Ensure percentage doesn't exceed 100

  const { currentUser } = useContext(SigninContext);

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
