import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BooksList from './Books';
import Register from './Registration';
import './App.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  useEffect(() => {
    // Task 1: Fetch books from API
    // Hint: Use the fetch function to get data from 'https://reactnd-books-api.udacity.com/books'
    // Make sure to include the necessary authorization header if required
    // After fetching, set the books state with the fetched data
    // Remember to handle any errors that may occur during the fetch

    const fetchBooks = async () => {
      // your code here for task 1
    };

    fetchBooks();
  }, []);

  const handleSearch = (searchText) => {
    // Task 2: Implement search functionality
    // Hint: Filter the books array based on the searchText input
    // Convert both the book title and searchText to lowercase for a case-insensitive comparison
    // Update the filteredBooks state with the result of the filtering
  };

  const handleSuccessfulRegistration = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = '/';
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/';
  };

  return (
    <Router>
      <div>
        <header>
          <h1>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Kalvium Books
            </Link>
          </h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Books"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <nav>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            ) : (
              <Link to="/register" className="register-button">
                Register
              </Link>
            )}
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home books={filteredBooks} />} />
          <Route
            path="/register"
            element={
              <Register
                onSuccessfulRegistration={handleSuccessfulRegistration}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

const Home = ({ books }) => {
  return (
    <div className="books-container">
      <BooksList books={books} />
    </div>
  );
};

export default App;
