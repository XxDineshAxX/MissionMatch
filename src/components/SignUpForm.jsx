import React, { useState } from 'react';
import './SignUpForm.css'; // Assuming you have a SignUpBox.css file for styles

function SignUpForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit form data
    console.log(formData);
  };

  return (
    <div className="sign-up">
        
        <div className='signup-container'>
            <p>Help Change the World</p>
            <form onSubmit={handleSubmit} className="signup-form">
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
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    className="signup-input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="signup-btn">
                Join MissionMatch
                </button>
            </form>
        </div>
    </div>
  );
}

export default SignUpForm;
