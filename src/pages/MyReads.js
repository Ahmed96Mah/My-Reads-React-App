import { Link } from 'react-router-dom';
import BookShelf from '../components/BookShelf';

const MyReads = ({ Books, onChangeShelf, onHandleLookup }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <BookShelf
          title="Currently Reading"
          books={Books}
          shelfName="currentlyReading"
          onChangeShelf={onChangeShelf}
          onHandleLookup={onHandleLookup}
        />
        <BookShelf
          title="Want to Read"
          books={Books}
          shelfName="wantToRead"
          onChangeShelf={onChangeShelf}
          onHandleLookup={onHandleLookup}
        />
        <BookShelf
          title="Read"
          books={Books}
          shelfName="read"
          onChangeShelf={onChangeShelf}
          onHandleLookup={onHandleLookup}
        />
      </div>
      <div className="open-search">
        <Link to="/search" reloadDocument={true}>
          Add a book
        </Link>
      </div>
    </div>
  );
};

export default MyReads;
