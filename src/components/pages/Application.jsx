import React, { useState, useEffect } from "react";

function Application() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    donationGoal: "",
  });

  const handleChange = (e) => {
    // Validate input to allow only positive numbers
    const { name, value } = e.target;
    const newValue = value.replace(/\D/g, ""); // Remove non-digit characters
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="sign-up">
      <div className="signup-container">
        <p>Post company application</p>
        <form onSubmit={handleSignUpSubmit} className="signup-form">
          <input
            className="signup-input"
            type="text"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            className="signup-input"
            type="text"
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
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

          <button type="submit" className="signup-btn">
            Post Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default Application;
