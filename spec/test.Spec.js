import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jasmine-dom';
import App from '../src/App.jsx';
import Register from '../src/Registration.jsx';
import BooksList from '../src/Books.jsx';

window.fetch = jasmine.createSpy('fetch').and.callFake(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        books: [
          {
            id: 1,
            title: 'JavaScript: The Good Parts',
            authors: 'Douglas Crockford',
          },
          { id: 2, title: 'Learning React', authors: 'Alex Banks' },
        ],
      }),
  })
);

describe('App and Components Functionality', () => {
  it('should fetch and display books on load', async () => {
    const books = [
      {
        id: '1',
        title: 'JavaScript: The Good Parts of the Programming Language',
        authors: ['Douglas Crockford'],
        imageLinks: { thumbnail: 'http://example.com/thumbnail1.jpg' },
      },
      {
        id: '2',
        title: 'Learning React with Hooks and Redux',
        authors: ['Alex Banks'],
        imageLinks: { thumbnail: 'http://example.com/thumbnail2.jpg' },
      },
    ];

    window.fetch = jasmine.createSpy('fetch').and.callFake(() =>
      Promise.resolve({
        json: () => Promise.resolve({ books }),
      })
    );

    render(<App />);

    await waitFor(() => {
      const firstBookTitle = screen.getByText((content, element) => {
        return content.includes('JavaScript: The Good');
      });
      expect(firstBookTitle).toBeTruthy();

      const secondBookTitle = screen.getByText((content, element) => {
        return content.includes('Learning React');
      });
      expect(secondBookTitle).toBeTruthy();
    });
  });

  it('should filter books based on search input', async () => {
    const books = [
      {
        id: '1',
        title: 'JavaScript: The Good Parts of the Programming Language',
        authors: ['Douglas Crockford'],
        imageLinks: { thumbnail: 'http://example.com/thumbnail1.jpg' },
      },
      {
        id: '2',
        title: 'Learning React with Hooks and Redux',
        authors: ['Alex Banks'],
        imageLinks: { thumbnail: 'http://example.com/thumbnail2.jpg' },
      },
    ];

    window.fetch = jasmine.createSpy('fetch').and.callFake(() =>
      Promise.resolve({
        json: () => Promise.resolve({ books }),
      })
    );

    render(<App />);

    const searchInput = screen.getByPlaceholderText('Search Books');
    fireEvent.change(searchInput, { target: { value: 'React' } });

    await waitFor(() => {
      expect(screen.getByText(/Learning React/i)).toBeTruthy();
      expect(screen.queryByText(/JavaScript: The Good Parts/i)).toBeNull();
    });
  });

  it('should validate registration form inputs and show an error message on invalid inputs', () => {
    const handleSuccessfulRegistration = jasmine.createSpy(
      'handleSuccessfulRegistration'
    );

    render(
      <Register onSuccessfulRegistration={handleSuccessfulRegistration} />
    );

    const nameInput = screen.getByLabelText(/Name:/i);
    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText('Password:');
    const repeatPasswordInput = screen.getByLabelText('Repeat Password:');
    const submitButton = screen.getByRole('button', { name: /Sign up/i });

    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.change(repeatPasswordInput, { target: { value: 'short' } });

    fireEvent.click(submitButton);

    expect(screen.getByText(/Please check your inputs/i)).toBeTruthy();
    expect(handleSuccessfulRegistration).not.toHaveBeenCalled();
  });

  it('should register successfully with valid inputs', () => {
    const handleSuccessfulRegistration = jasmine.createSpy(
      'handleSuccessfulRegistration'
    );

    render(
      <Register onSuccessfulRegistration={handleSuccessfulRegistration} />
    );

    const nameInput = screen.getByLabelText(/Name:/i);
    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText('Password:');
    const repeatPasswordInput = screen.getByLabelText('Repeat Password:');
    const submitButton = screen.getByRole('button', { name: /Sign up/i });

    fireEvent.change(nameInput, { target: { value: 'Valid User' } });
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validPassword123!' } });
    fireEvent.change(repeatPasswordInput, {
      target: { value: 'validPassword123!' },
    });

    fireEvent.click(submitButton);

    expect(handleSuccessfulRegistration).toHaveBeenCalled();
    expect(screen.queryByText(/Please check your inputs/i)).toBeNull();
  });

  it('should render and truncate book titles properly', () => {
    const books = [
      {
        id: '1',
        title: 'JavaScript: The Good Parts of the Programming Language',
        authors: ['Douglas Crockford'],
        imageLinks: { thumbnail: 'http://example.com/thumbnail1.jpg' },
      },
      {
        id: '2',
        title: 'Learning React with Hooks and Redux',
        authors: ['Alex Banks'],
        imageLinks: { thumbnail: 'http://example.com/thumbnail2.jpg' },
      },
    ];

    render(<BooksList books={books} />);

    const firstBookTitle = screen.getByText((content, element) => {
      return content.includes('JavaScript: The Good');
    });
    expect(firstBookTitle).toBeTruthy();

    const firstBookAuthor = screen.getByText((content, element) => {
      return content.includes('Douglas Crockford');
    });
    expect(firstBookAuthor).toBeTruthy();

    const secondBookTitle = screen.getByText((content, element) => {
      return content.includes('Learning React with');
    });
    expect(secondBookTitle).toBeTruthy();

    const secondBookAuthor = screen.getByText((content, element) => {
      return content.includes('Alex Banks');
    });
    expect(secondBookAuthor).toBeTruthy();
  });
});
