import React, { useContext, useEffect } from "react";
import { SigninContext } from "../../contexts/SigninContext";
import NonProfitView from "./NonProfitView";
import CompanyOrDonorView from "./CompanyOrDonorView";

function Explore() {
  const { userDetails } = useContext(SigninContext);

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1>Explore Opportunities</h1>
      {userDetails.userType === "non-profit" ? (
        <NonProfitView />
      ) : (
        <CompanyOrDonorView />
      )}
    </div>
  );
}

export default Explore;
