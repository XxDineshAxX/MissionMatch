import React, { useContext } from "react";
import { SigninContext } from "../../contexts/SigninContext";
import NonProfitView from "./NonProfitView";
import CompanyOrDonorView from "./CompanyOrDonorView";


function Explore() {
  const { userDetails } = useContext(SigninContext);

  return (
    <div>
      <h1>Explore Opportunities</h1>
      {userDetails.userType === 'non-profit' ?
        <NonProfitView /> :
        <CompanyOrDonorView />
      }
    </div>
  );
}

export default Explore;
