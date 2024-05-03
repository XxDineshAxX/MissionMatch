import React, { useState, useEffect, useContext } from "react";
import { db } from "/src/index.js";
import { SigninContext } from "../../contexts/SigninContext";
import {
  doc,
  setDoc,
} from "firebase/firestore";


function Application() {

  const { currentUser } = useContext(SigninContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    donationGoal: "",
    donationType: "",
  });

  const handleChange = (e) => {
    // Validate input to allow only positive numbers
    const { name, value } = e.target;
    const newValue = value.replace(/\D/g, ""); // Remove non-digit characters
    setFormData({ ...formData, [name]: newValue });
  };

  const handleChangeT = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const grantData = {
        title: formData.title,
        description: formData.description,
        donationGoal: formData.donationGoal,
        donationType: formData.donationType,
        dispensed: 0,
      };

      const userGrantRef = doc(db, "userGrants", currentUser.uid);
      
      await setDoc(userGrantRef, grantData);

      setFormData({
        title: "",
        description: "",
        donationGoal: "",
        donationType: "",
      });

      alert('Thanks for posting!');
    } catch (error)
    {
      console.log("error: ", error)
    }
  };

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="sign-up">
      <div className="signup-container">
        <p>Post an Application or Grant:</p>
        {currentUser.userType != "non-profit" && 
        <p>
          Let Non-Profit Organizations know you're ready to help!
        </p>
        }
        {currentUser.userType == "non-profit" && 
        <p>
          Get the word out on your goals!
        </p>
        }
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            className="signup-input"
            type="text"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChangeT}
            required
          />
          <input
            className="signup-input"
            type="text"
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleChangeT}
            required
          />
          <input
            className="signup-input"
            type="text"
            placeholder="Donation Goal"
            name="donationGoal"
            value={formData.donationGoal}
            onChange={handleChange}
            required
          />
          <select
              className="signup-input"
              name="donationType"
              value={formData.donationType}
              onChange={handleChangeT}
              required
            >
              <option value="">Select Donation Type</option>
              <option value="money">Money</option>
              <option value="supplies">Supplies</option>
              <option value="volunteers">Volunteers</option>
            </select>

          <button type="submit" className="signup-btn">
            Post Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default Application;
