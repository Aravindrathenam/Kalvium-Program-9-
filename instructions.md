## Tasks

### Task 1: Fetch Books from API

- **Objective**: Retrieve book data from an external API and manage it in the application state.
- **Hints**:
  - Use the `fetch` function to make a GET request to the API URL.
  - Ensure you handle errors that may arise during the fetch operation.
  - Use `useEffect` to call the fetch function when the component mounts.

### Task 2: Implement Search Functionality

- **Objective**: Allow users to search for books based on title or author names.
- **Hints**:
  - Use the input value from the search bar to filter the list of books.
  - Make comparisons case-insensitive by converting both the search input and book titles/authors to lowercase.
  - Update the state of filtered books based on the search results.

### Task 3: Define State Variables

- **Objective**: Manage user input fields in the registration form.
- **Hints**:
  - Use the `useState` hook to define state variables for user information (name, email, password, repeat password).
  - Ensure each input field is controlled by the corresponding state variable.

### Task 4: Validate Form Inputs

- **Objective**: Ensure user inputs in the registration form are valid before submission.
- **Hints**:
  - Implement validation checks for each input field (e.g., name and email format).
  - Consider defining functions for each validation criteria and updating the form state based on the results.

### Task 5: Render the List of Books

- **Objective**: Display a list of books with relevant details in a user-friendly format.
- **Hints**:
  - Use the `map` method to iterate over the books array and render each book's information.
  - Implement a function to truncate long texts for both titles and authors to improve readability.
  - Make sure to display each book's thumbnail for a visual representation.

Happy Coding! Good Luck.
