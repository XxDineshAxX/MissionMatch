import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./NavBar.css";
import { SigninContext } from "../contexts/SigninContext";

function NavBar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const { currentUser } = useContext(SigninContext);
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

  console.log(currentUser);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link
            to="/MissionMatch/"
            className="navbar-logo"
            onClick={closeMobileMenu}
          >
            MissionMatch
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fa-solid fa-bars"}></i>
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link
                to="/MissionMatch/"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>
            {currentUser != null ? (
              <li className="nav-item">
                <Link
                  to="/MissionMatch/services"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Match
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  to="/MissionMatch/sign-up"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Match
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link
                to="/MissionMatch/explore"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Explore
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/MissionMatch/application"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Post Application
              </Link>
            </li>
            {currentUser ? (
              <li className="nav-item">
                <Link
                  to="/MissionMatch/profile"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Welcome {currentUser.email}
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  to="/MissionMatch/sign-up"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </li>
            )}
          </ul>
          {button && (
            <Button buttonStyle="btn--outline">
              {currentUser ? `Welcome ${currentUser.email}` : "SIGN UP"}
            </Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
