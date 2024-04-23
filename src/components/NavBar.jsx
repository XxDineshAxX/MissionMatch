import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./NavBar.css";
import { SigninContext } from "../contexts/SigninContext";

function NavBar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const { isSignedIn, userInfo } = useContext(SigninContext);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            MissionMatch
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fa-solid fa-bars"}></i>
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/services"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/explore"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Explore
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/application"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Post Application
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link
                to="/sign-up"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                {isSignedIn ? `Welcome ${userInfo.username}` : "Sign Up"}
              </Link>
            </li> */}
          </ul>
          {button && (
            <Button buttonStyle="btn--outline">
              {isSignedIn ? `Welcome ${userInfo.username}` : "SIGN UP"}
            </Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
