import React, { useState, useEffect } from "react";

function CompanyOrDonorView() {
  const [nonProfits, setNonProfits] = useState([]);

  useEffect(() => {
    // Fetch non-profits needing support
    fetchNonProfits().then(data => setNonProfits(data));
  }, []);

  const fetchNonProfits = async () => {
    // Example API call
    return await fetch('/api/nonprofits').then(res => res.json());
  };

  return (
    <div>
      <h2>Non-Profits Seeking Support</h2>
      <ul>
        {nonProfits.map(nonProfit => (
          <li key={nonProfit.id}>{nonProfit.name} - Needs: {nonProfit.needs}</li>
        ))}
      </ul>
    </div>
  );
}

export default CompanyOrDonorView;
