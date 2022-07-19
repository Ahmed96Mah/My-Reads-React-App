import { Link } from 'react-router-dom';
import SelectNew from './SelectNew';
import SelectShelf from './SelectShelf';

const Book = ({ book, onChangeShelf, existing, onHandleLookup }) => {
  const handleClick = () => {
    onHandleLookup(book['id']);
  };

  return (
    // This ensures that any book without a thumbnail doesn't get created (no returned component)
    book['imageLinks'] !== undefined && (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book['imageLinks']['thumbnail']})`,
              backgroundSize: 'cover',
            }}
          ></div>
          <div className="book-shelf-changer">
            {existing ? (
              <SelectShelf
                book={book}
                onChangeShelf={onChangeShelf}
                existing={existing}
              />
            ) : (
              <SelectNew
                book={book}
                onChangeShelf={onChangeShelf}
                existing={existing}
              />
            )}
          </div>
          <div className="about" onClick={handleClick}>
            <Link to="/about">?</Link>
          </div>
        </div>
        <div className="book-title">{book['title']}</div>
        <div className="book-authors">
          {book['authors'] !== undefined ? (
            book['authors'].map((author, index) => (
              <span key={index}>
                {index < book['authors'].length - 1 ? `${author}, ` : author}
              </span>
            ))
          ) : (
            <span></span>
          )}
        </div>
      </div>
    )
  );
};

export default Book;
