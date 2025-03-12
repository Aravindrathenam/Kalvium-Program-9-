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
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://reactnd-books-api.udacity.com/books', {
          headers: { 'Authorization': 'whatever-you-want' },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }

        const data = await response.json();
        setBooks(data.books);
        setFilteredBooks(data.books);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = (searchText) => {
    const lowerCaseSearch = searchText.toLowerCase();
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(lowerCaseSearch) ||
        book.authors.toLowerCase().includes(lowerCaseSearch)
    );
    setFilteredBooks(filtered);
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
