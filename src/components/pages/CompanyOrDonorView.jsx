import React, { useState } from "react";
import './CompanyOrDonorView.css'; // Make sure you have this CSS file

function CompanyOrDonorView() {
  const [nonProfits, setNonProfits] = useState([
    { id: 1, name: "Non-Profit A", needs: "Educational Supplies" },
    { id: 2, name: "Non-Profit B", needs: "Funding for Research" },
    { id: 3, name: "Non-Profit C", needs: "Community Health Resources" },
    { id: 4, name: "Non-Profit D", needs: "Environmental Advocacy" },
    { id: 5, name: "Non-Profit E", needs: "Art and Culture Promotion" },
    { id: 6, name: "Non-Profit F", needs: "Disaster Relief Resources" },
    { id: 7, name: "Non-Profit G", needs: "Animal Welfare Support" },
    { id: 8, name: "Non-Profit H", needs: "Homelessness Solutions" },
    { id: 9, name: "Non-Profit I", needs: "Youth Sports Programs" },
    { id: 10, name: "Non-Profit J", needs: "Technology Access" }
  ]);

  return (
    <div className="nonprofit-view">
      <h2>Non-Profits Seeking Support</h2>
      <div className="nonprofit-grid">
        {nonProfits.map(nonProfit => (
          <div key={nonProfit.id} className="nonprofit-box">
            <h3>{nonProfit.name}</h3>
            <p>Needs: {nonProfit.needs}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompanyOrDonorView;
