import React from 'react';
import './App.css';

// Truncate text to a specified number of words per line
const truncateText = (text, maxWordsPerLine) => {
  if (!text) return ''; // Handle empty text case
  const words = text.split(' ');
  const lines = [];
  for (let i = 0; i < words.length; i += maxWordsPerLine) {
    lines.push(words.slice(i, i + maxWordsPerLine).join(' '));
  }
  return lines.join('<br />');
};

const BooksList = ({ books }) => {
  return (
    <div className="books-grid">
      {books.length > 0 ? (
        books.map((book) => (
          <div key={book.id} className="book-item">
            {/* Display book thumbnail if available */}
            {book.imageLinks?.thumbnail && (
              <img src={book.imageLinks.thumbnail} alt={book.title} className="book-thumbnail" />
            )}
            
            {/* Display truncated book title */}
            <p
              dangerouslySetInnerHTML={{
                __html: truncateText(book.title, 3),
              }}
            />

            {/* Display truncated authors */}
            <p
              className="book-authors"
              dangerouslySetInnerHTML={{
                __html: book.authors ? truncateText(book.authors.join(', '), 3) : 'Unknown Author',
              }}
            />

            {/* Display "Free" label */}
            <p className="free">Free</p>
          </div>
        ))
      ) : (
        <p>No books available</p>
      )}
    </div>
  );
};

export default BooksList;
