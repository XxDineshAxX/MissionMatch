import React from 'react';
import './NonProfitView.css'; // Ensure you have a corresponding CSS file for styling

const NonProfitView = () => {
  // Expanded mock data representing companies
  const companies = [
    { id: 1, name: "Company A", description: "Focusing on environmental grants." },
    { id: 2, name: "Company B", description: "Supports educational initiatives." },
    { id: 3, name: "Company C", description: "Health and wellness support provider." },
    { id: 4, name: "Company D", description: "Advocates for technology access." },
    { id: 5, name: "Company E", description: "Champion of renewable energy solutions." },
    { id: 6, name: "Company F", description: "Dedicated to ending homelessness." },
    { id: 7, name: "Company G", description: "Supports global literacy programs." },
    { id: 8, name: "Company H", description: "Promotes community volunteer work." },
    { id: 9, name: "Company I", description: "Invests in arts and cultural projects." },
    { id: 10, name: "Company J", description: "Funds innovative tech startups." }
  ];

  return (
    <div className="nonprofit-view">
      <h2>Available Grants from Companies</h2>
      <div className="company-grid">
        {companies.map(company => (
          <div key={company.id} className="company-box">
            <h3>{company.name}</h3>
            <p>{company.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NonProfitView;
