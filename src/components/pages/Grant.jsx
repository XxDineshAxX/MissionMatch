import Cards from "../Cards";
import "./Grant.css";
import React, { useEffect } from "react";
import { Button } from "../Button";
import DonationProgressBar from "./DonationProgressBar";

function Grant() {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="grant-container">
        <div className="grant-title">
          <h1>Fight back against Cancer</h1>
          <figure className="grant__item__pic-wrap" data-category="Medical">
            <img
              src="./images/img-10.jpg"
              alt="IMG"
              className="grant__item__img"
            />
          </figure>
          <h2>Organizer</h2>
          <p>Cancer Fighters LLC</p>
          <DonationProgressBar></DonationProgressBar>
        </div>

        <div className="grant-content">
          <h1>Mission Objective</h1>
          <p>
            Cancer Fighters LLC is a dedicated nonprofit organization committed
            to spearheading the fight against cancer. With a passionate team of
            researchers, healthcare professionals, and advocates, we are
            tirelessly working towards eradicating this devastating disease from
            our communities. At Cancer Fighters LLC, we understand the profound
            impact cancer has on individuals and their loved ones. That's why
            we're on a mission to fund groundbreaking research initiatives,
            provide essential support services to patients and families, and
            advocate for policies that advance cancer prevention, early
            detection, and treatment. Our multifaceted approach encompasses
            cutting-edge scientific research, public education campaigns,
            patient empowerment programs, and community outreach efforts.
            Through collaboration with leading medical institutions,
            partnerships with like-minded organizations, and engagement with
            policymakers, we strive to drive meaningful change in the fight
            against cancer. Every dollar donated to Cancer Fighters LLC is a
            step closer to a world free of cancer. Together, we can make a
            difference and offer hope to those affected by this relentless
            disease. Join us in our mission to conquer cancer and create a
            brighter, healthier future for all.
          </p>
        </div>
      </div>
    </>
  );
}

export default Grant;
