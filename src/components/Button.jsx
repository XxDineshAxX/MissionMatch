import "./Button.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { SigninContext } from "../contexts/SigninContext";

const STYLES = [
  "btn--primary",
  "btn--outline",
  "btn--test",
  "btn--blue--primary",
  "btn--blue--outline",
];

const SIZES = ["btn--medium", "btn--large"];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
}) => {
  const { currentUser } = useContext(SigninContext);

  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  // If user presses the button it will direct based on if user is signed in or not.
  if (currentUser) {
    return (
      <Link to="/profile" className="btn-mobile">
        <button
          className={`btn ${checkButtonStyle} ${checkButtonSize}`}
          onClick={onClick}
          type={type}
        >
          {children}
        </button>
      </Link>
    );
  } else {
    return (
      <Link to="/sign-up" className="btn-mobile">
        <button
          className={`btn ${checkButtonStyle} ${checkButtonSize}`}
          onClick={onClick}
          type={type}
        >
          {children}
        </button>
      </Link>
    );
  }
};
