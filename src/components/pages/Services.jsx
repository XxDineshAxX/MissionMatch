import { useState, useContext, useEffect } from "react";
import { SigninContext } from "../../contexts/SigninContext";
import "./Services.css";

const mockDataOrganizations = [
  {
    userType: "non-profit",
    name: "Company A",
    goals: ["Money for Research", "Money for Expansion", "Money for Marketing"],
    needs: ["$500,000", "$200,000", "$100,000"],
  },
  {
    userType: "single donor",
    name: "Non-Profit B",
    goals: ["Money for Charity Operations", "Money for Community Outreach"],
    needs: ["$300,000", "$150,000"],
  },
  {
    userType: "non-profit",
    name: "Company C",
    goals: [
      "Money for Product Development",
      "Money for Hiring",
      "Money for Office Space",
    ],
    needs: ["$800,000", "$400,000", "$250,000"],
  },
];

export default function Services() {
  const [organizations, setOrganizations] = useState([]);
  const { userDetails } = useContext(SigninContext);

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);

    // If user is signed in, filter out services based on user type
    if (userDetails && userDetails.userType) {
      // Filter out services based on user type
      setOrganizations(() => {
        return mockDataOrganizations.filter((org) => {
          return org.userType === userDetails.userType;
        });
      });
    }
  }, [userDetails]);

  return (
    <div className="matching-page">
      <h1>Matching</h1>
      <div className="matching-main">
        {organizations.map((org, index) => (
          <div key={index} className="org-section">
            <h2>{org.name}</h2>
            <h3>Goals:</h3>
            <ul>
              {org.goals.map((goal, goalIndex) => (
                <li key={goalIndex}>
                  {goal}
                  <ul>
                    {org.needs.map((need, needIndex) => (
                      <li key={needIndex}>
                        {needIndex === goalIndex ? (
                          <>
                            {need} <span>&#10003;</span>
                          </>
                        ) : (
                          <>
                            {need} <span className="cross">&#10005;</span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <button>Request Match</button>
          </div>
        ))}
      </div>
    </div>
  );
}
