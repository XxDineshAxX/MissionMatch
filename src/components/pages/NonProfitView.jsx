import React, { useState, useEffect } from "react";

function NonProfitView() {
  const [grants, setGrants] = useState([]);

  useEffect(() => {
    // Fetch grants data
    fetchGrants().then(data => setGrants(data));
  }, []);

  const fetchGrants = async () => {
    // Example API call
    return await fetch('/api/grants').then(res => res.json());
  };

  return (
    <div>
      <h2>Available Grants</h2>
      <ul>
        {grants.map(grant => (
          <li key={grant.id}>{grant.companyName} - {grant.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default NonProfitView;
