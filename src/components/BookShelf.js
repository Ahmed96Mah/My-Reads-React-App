import Book from './Book';

const BookShelf = ({
  title,
  books,
  shelfName,
  onChangeShelf,
  onHandleLookup,
}) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books
            .filter((b) => b['shelf'] === shelfName)
            .map((b) => {
              return (
                <li key={b['id']}>
                  <Book
                    book={b}
                    onChangeShelf={onChangeShelf}
                    existing={true}
                    onHandleLookup={onHandleLookup}
                  />
                </li>
              );
            })}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
