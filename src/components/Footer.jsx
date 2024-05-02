import "./Footer.css";
import { Link } from "react-router-dom";
import { SigninContext } from "../contexts/SigninContext";
import { useState, useEffect, useContext } from "react";

function Footer() {
  const { currentUser } = useContext(SigninContext);

  return (
    <div className="footer-container">
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Menu</h2>
            <Link to="/MissionMatch/">Home</Link>
            {currentUser != null ? (
              <Link to="/MissionMatch/services">Match</Link>
            ) : (
              <Link to="/MissionMatch/sign-up">Match</Link>
            )}
            <Link to="/MissionMatch/explore">Explore</Link>
          </div>
          <div className="footer-link-items">
            <h2>Contact Us</h2>
            <Link to="/MissionMatch/contact">Contact</Link>
          </div>
        </div>
        <div className="footer-link-wrapper"></div>
      </div>
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/MissionMatch/" className="social-logo">
              MissionMatch
            </Link>
          </div>
          <small className="website-rights">MissionMatch © 2024</small>
        </div>
      </section>
    </div>
  );
}

export default Footer;
