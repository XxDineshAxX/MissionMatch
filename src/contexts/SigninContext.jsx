import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const SigninContext = createContext();

export const SigninProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    role: "",
  });

  return (
    <SigninContext.Provider
      value={{ isSignedIn, setIsSignedIn, userInfo, setUserInfo }}
    >
      {children}
    </SigninContext.Provider>
  );
};

SigninProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
