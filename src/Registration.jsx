import React, { useState } from 'react';
import './App.css';

const Register = ({ onSuccessfulRegistration }) => {
  // Task 3: Define State Variables
  // Hint: Define state variables to manage user input fields (name, email, password, repeatPassword).
  // const [user, setUser] = useState({})

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValid, setFormValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Task 4: Validate Form Inputs
    // Hint: Implement validation checks for each input field (name, email). Password validation is given as an example.
    // Use these checks to determine if the form is valid and update the formValid state accordingly.

    // Example validation functions
    const isNameValid = (name) => {
      // Check if name is valid
    };

    const isEmailValid = (email) => {
      // Check if email is valid
    };

    const hasTenOrMoreChars = (str) => str.length >= 10;
    const hasSpecialChar = (str) => /[!@#$%^&*(),.?":{}|<>]/.test(str);
    const isPasswordValid = (password) =>
      hasTenOrMoreChars(password) && hasSpecialChar(password);

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
          aria-invalid={!formValid && formSubmitted && !user.name}
        />

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          aria-invalid={!formValid && formSubmitted && !user.email}
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          aria-invalid={!formValid && formSubmitted && !user.password}
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

        {!formValid && formSubmitted && <span>{errorMessage}</span>}

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Register;
