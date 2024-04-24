import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Menu</h2>
            <Link to="/sign-up">Home</Link>
            <Link to="/services">Service</Link>
            <Link to="/explore">Explore</Link>
          </div>
          <div className="footer-link-items">
            <h2>Contact Us</h2>
            <Link to="/contact">Contact</Link>
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
