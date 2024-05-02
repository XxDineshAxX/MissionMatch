import { useState, useEffect } from "react";

function Application() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
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
          <button type="submit" className="signup-btn">
            Post Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default Application;
