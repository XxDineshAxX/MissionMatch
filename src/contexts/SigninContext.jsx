import { createContext, useEffect, useState } from "react";
import { auth } from "../index";
import { onAuthStateChanged } from "firebase/auth";

export const SigninContext = createContext();

export const SigninProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <SigninContext.Provider value={{ currentUser }}>
      {children}
    </SigninContext.Provider>
  );
};
