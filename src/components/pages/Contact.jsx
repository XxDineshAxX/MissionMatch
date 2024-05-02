import "./Contact.css";
import React, { useEffect } from "react";
export default function Contact() {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="contact">
        <h1 className="contact-header">CONTACT</h1>
        <div className="contact-info-box">
          <div className="contact-info-wrapper">
            <h1 className="contact-info-header">About Us</h1>
            <p>
              At MissionMatch, we believe in the power of partnerships to create
              positive change. Our mission is to bridge the gap between
              companies and non-profit organizations, facilitating meaningful
              connections that drive progress and transform communities. We are
              dedicated to helping businesses fulfill their corporate social
              responsibility goals by matching them with non-profits that share
              their values and objectives.
            </p>
            <p>
              Our platform streamlines the grant-giving process, allowing
              companies to find non-profits that align with their mission and
              vision. Whether you're a business looking to make a difference or
              a non-profit seeking support, MissionMatch is your trusted partner
              in fostering impactful collaborations.
            </p>
            <p>Here's how we make a difference:</p>
            <ul>
              <li>
                Tailored Matching: We use advanced algorithms to connect
                companies with non-profits that share common goals, ensuring a
                seamless and successful partnership.
              </li>
              <li>
                Collaborative Grants: Companies can explore various grant
                opportunities, enabling them to support non-profits in unique
                and impactful ways.
              </li>
              <li>
                Community Impact: We believe that when like-minded people come
                together, incredible things happen. Our platform is designed to
                facilitate these connections and maximize their positive impact.
              </li>
            </ul>
            <p>
              Join MissionMatch today and be part of a community that is
              changing the world, one partnership at a time. Together, we can
              make a difference!
            </p>
            <h1 className="contact-info-header">Contact Us</h1>
            <ul>
              <li>Coming Soon!</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
