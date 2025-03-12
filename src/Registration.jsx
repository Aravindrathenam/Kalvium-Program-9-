import React, { useState } from 'react';
import './App.css';

const Register = ({ onSuccessfulRegistration }) => {
  // Task 3: Define State Variables
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValid, setFormValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Task 4: Validate Form Inputs
  const isNameValid = (name) => name.trim().length > 2; // Name should have at least 3 characters

  const isEmailValid = (email) => {
    // Basic email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const hasTenOrMoreChars = (str) => str.length >= 10;
  const hasSpecialChar = (str) => /[!@#$%^&*(),.?":{}|<>]/.test(str);
  const isPasswordValid = (password) =>
    hasTenOrMoreChars(password) && hasSpecialChar(password);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (
      isNameValid(user.name) &&
      isEmailValid(user.email) &&
      isPasswordValid(user.password) &&
      user.password === user.repeatPassword
    ) {
      setFormValid(true);
      console.log('User Data:', user);
      localStorage.setItem('userData', JSON.stringify(user));
      onSuccessfulRegistration();
      setUser({
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
      });
    } else {
      setFormValid(false);
      setErrorMessage('Please check your inputs');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleFormSubmit} noValidate>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          aria-invalid={!formValid && formSubmitted && !isNameValid(user.name)}
        />

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          aria-invalid={!formValid && formSubmitted && !isEmailValid(user.email)}
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          aria-invalid={!formValid && formSubmitted && !isPasswordValid(user.password)}
        />

        <label htmlFor="repeatPassword">Repeat Password:</label>
        <input
          id="repeatPassword"
          type="password"
          value={user.repeatPassword}
          onChange={(e) => setUser({ ...user, repeatPassword: e.target.value })}
          aria-invalid={
            !formValid && formSubmitted && user.password !== user.repeatPassword
          }
        />

        {!formValid && formSubmitted && <span className="error">{errorMessage}</span>}

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Register;
