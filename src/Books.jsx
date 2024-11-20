import React from 'react';
import './App.css';

// Truncate text to a specified number of words per line
const truncateText = (text, maxWordsPerLine) => {
  const words = text.split(' ');
  const lines = [];
  for (let i = 0; i < words.length; i += maxWordsPerLine) {
    lines.push(words.slice(i, i + maxWordsPerLine).join(' '));
  }
  return lines.join('<br />');
};

// Task 5: Render the list of books
// Hint: In the BooksList component, map over the 'books' array to render each book's details.
// Use the truncateText function for the title and authors to ensure proper formatting.

const BooksList = ({ books }) => {
  return (
    <div className="books-grid">
      {books.map((book) => (
        <div key={book.id} className="book-item">
          {/* Task 5.1: Display the book's thumbnail */}
          <p
            dangerouslySetInnerHTML={{
              __html: truncateText(book.title, 3),
            }}
          />
          {/* Task 5.2: Use truncateText to display the book's authors */}
          <p className="free">Free</p>
        </div>
      ))}
    </div>
  );
};

export default BooksList;
