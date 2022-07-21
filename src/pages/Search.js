import { useState } from 'react';
import { Link } from 'react-router-dom';
import Book from '../components/Book';

const Search = ({
  booksSearched,
  existingBooks,
  onHandleSearch,
  onChangeShelf,
  onHandleLookup,
  logged,
  onlogout,
}) => {
  const [Value, setValue] = useState('');

  const onChange = (e) => {
    if (logged !== 'false') {
      setValue(e.target.value);
      onHandleSearch(e.target.value.trim());
    }
  };

  return (
    // Make sure that user is authenticated first before displaying the page
    logged === 'true' ? (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" reloadDocument={true}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              value={Value}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {booksSearched.map((book) => {
              return (
                <li key={book['id']}>
                  {existingBooks.filter(
                    (b) =>
                      b["id"] === book["id"]
                  ).length === 1 ? (
                    <Book
                      book={
                        existingBooks.filter(
                          (b) => b['id'] === book['id']
                        )[0]
                      }
                      onChangeShelf={onChangeShelf}
                      existing={true}
                      onHandleLookup={onHandleLookup}
                    />
                  ) : (
                    <Book
                      book={book}
                      onChangeShelf={onChangeShelf}
                      existing={false}
                      onHandleLookup={onHandleLookup}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
        <div className="logout">
          <Link to="/" reloadDocument={true} onClick={onlogout}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M96 480h64C177.7 480 192 465.7 192 448S177.7 416 160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64C177.7 96 192 81.67 192 64S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256C0 437 42.98 480 96 480zM504.8 238.5l-144.1-136c-6.975-6.578-17.2-8.375-26-4.594c-8.803 3.797-14.51 12.47-14.51 22.05l-.0918 72l-128-.001c-17.69 0-32.02 14.33-32.02 32v64c0 17.67 14.34 32 32.02 32l128 .001l.0918 71.1c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C514.4 264.4 514.4 247.6 504.8 238.5z" />
            </svg>
          </Link>
        </div>
      </div>
    ) : (
      // Else, prompt the user to login or signup first
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" reloadDocument={true}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              value={Value}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="login-div">
          <div>
            <p>
              You have to <span>login</span> or <span>Signup</span> First
            </p>
            <Link to="/signup">
              <button>Login or Signup Here</button>
            </Link>
          </div>
        </div>
      </div>
    )
  );
};

export default Search;
