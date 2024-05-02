import { createContext, useEffect, useState } from "react";
import { auth, db } from "../index";  // Make sure db is imported
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";  // Necessary for fetching Firestore data


export const SigninContext = createContext();

export const SigninProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState({});  // State to hold additional user details

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);  // Reference to the user's document
        try {
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setCurrentUser({
              uid: user.uid,
              email: user.email,
              ...userData  // Spread other user data, including userType
            });
            setUserDetails({
              username: userData.username,
              userType: userData.userType  // Specifically include userType
            });
          } else {
            console.log("No such document!");
            setCurrentUser({ uid: user.uid, email: user.email });  // Set only auth data if no document
            setUserDetails({});
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      } else {
        setCurrentUser(null);
        setUserDetails({});
      }
    });

    return () => unsubscribe();  // Cleanup subscription
  }, []);

  return (
    <SigninContext.Provider value={{ currentUser, userDetails }}>
      {children}
    </SigninContext.Provider>
  );
};

