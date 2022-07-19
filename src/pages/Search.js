import { useState } from 'react';
import { Link } from 'react-router-dom';
import Book from '../components/Book';

const Search = ({
  booksSearched,
  existingBooks,
  onHandleSearch,
  onChangeShelf,
  onHandleLookup,
}) => {
  const [Value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
    onHandleSearch(e.target.value.trim());
  };

  return (
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
                    b['title'] === book['title'] &&
                    b['authors'][0] === book['authors'][0]
                ).length === 1 ? (
                  <Book
                    book={
                      existingBooks.filter(
                        (b) => b['title'] === book['title']
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
    </div>
  );
};

export default Search;
