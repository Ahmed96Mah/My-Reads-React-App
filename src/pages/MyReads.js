import { Link } from 'react-router-dom';
import BookShelf from '../components/BookShelf';

const MyReads = ({ Books, onChangeShelf }) => {
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
        />
        <BookShelf
          title="Want to Read"
          books={Books}
          shelfName="wantToRead"
          onChangeShelf={onChangeShelf}
        />
        <BookShelf
          title="Read"
          books={Books}
          shelfName="read"
          onChangeShelf={onChangeShelf}
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
