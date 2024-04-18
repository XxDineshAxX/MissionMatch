import React, { useState } from 'react';
import './SignUpForm.css'; // Your original CSS file

function SignUpForm() {
  const [showSignUp, setShowSignUp] = useState(true);

  // Form data for both the sign-up and login forms
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

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    console.log('Sign Up Data:', formData);
    // Submit sign-up data here
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    console.log('Login Data:', formData);
    // Submit login data here
  };

  return (
    <div className='sign-up'>
        {showSignUp ? (
            // Sign-up form
            <div className='signup-container'>
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
                    <button type="button" className="signup-btn" onClick={() => setShowSignUp(false)}>
                    Have an account? Log In
                    </button>
                </form>
            </div>
        ) : (
            // Login form
            <div className='signup-container'>
                <p>Welcome Back</p>
                <form onSubmit={handleLoginSubmit} className="signup-form">
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
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="signup-btn">
                    Log In
                    </button>
                    <button type="button" className="signup-btn" onClick={() => setShowSignUp(true)}>
                    Need an account? Sign Up
                    </button>
                </form>
            </div>
        )}
    </div>
  );
}

export default SignUpForm;
