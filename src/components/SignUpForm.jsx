import { useContext, useState } from "react";
import { SigninContext } from "../contexts/SigninContext";
import "./SignUpForm.css"; 
import { auth, db } from "/src/index.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const [showSignUp, setShowSignUp] = useState(true); // Toggle between sign-up and login forms
  const [err, setErr] = useState(false);
  const { setIsSignedIn, setUserInfo } = useContext(SigninContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    userType: "", 
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const userData = {
        uid: res.user.uid,
        username: formData.username,
        email: formData.email,
        userType: formData.userType, // Store the account type
      };

      await Promise.all([
        setDoc(doc(db, "users", res.user.uid), userData),
        setDoc(doc(db, "userChats", res.user.uid), {}),
      ]);

      navigate("/explore");
    } catch (err) {
      console.error(err);
      setErr(true);
    }
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        setIsSignedIn(true);
        setUserInfo({
          email: formData.email,
        });
        navigate("/explore");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="sign-up">
      {showSignUp ? (
        // Sign-up form
        <div className="signup-container">
          <p>Help Change the World</p>
          <form onSubmit={handleSignUpSubmit} className="signup-form">
            <input
              className="signup-input"
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              className="signup-input"
              type="email"
              placeholder="E-mail"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              class="signup-input"
              type="password"
              placeholder="Password: Must be at least 6 characters"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <select
              className="signup-input"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              required
            >
              <option value="">Select Account Type</option>
              <option value="company">Company</option>
              <option value="non-profit">Non-Profit</option>
              <option value="single donor">Single Donor</option>
            </select>
            <button type="submit" className="signup-btn">Join MissionMatch</button>
            <button type="button" className="signup-btn" onClick={() => setShowSignUp(false)}>Have an account? Log In</button>
          </form>
        </div>
      ) : (
        // Login form
        <div className="signup-container">
          <p>Welcome Back</p>
          <form onSubmit={handleLoginSubmit} className="signup-form">
            <input
              className="signup-input"
              type="text"
              placeholder="E-mail"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              class="signup-input"
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="signup-btn">Log In</button>
            <button type="button" className="signup-btn" onClick={() => setShowSignUp(true)}>Need an account? Sign Up</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default SignUpForm;
