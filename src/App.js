import './css/App.css';
import { Routes, Route } from 'react-router-dom';
import * as Operation from './util/BooksAPI';
import { useState, useEffect } from 'react';
import Search from './pages/Search';
import MyReads from './pages/MyReads';

function App() {
  const [Searched, setSearched] = useState([]);
  const [Books, setBooks] = useState([]);

  const onChangeShelf = async (shelf, bookObj, exist) => {
    if (exist) {
      const book = Books.filter((b) => b['title'] === bookObj['title']);
      const updatedBooks = Books.filter((b) => b['title'] !== bookObj['title']);
      book[0]['shelf'] = shelf;
      setBooks([...updatedBooks, ...book]);
    } else {
      setBooks([...Books, bookObj]);
    }
    Operation.update(bookObj, shelf);
  };

  const onHandleSearch = async (query) => {
    if (query.trim() !== '') {
      // make sure the query doesn't fully consist of spaces
      const books = await Operation.search(query);
      if (books.length !== undefined) {
        // make sure that there is a serach results before updating
        setSearched([...books]);
      } else {
        // else Searched = []
        setSearched([]);
      }
    } else {
      // else Searched = []
      setSearched([]);
    }
  };

  useEffect(() => {
    const getBooks = async () => {
      const books = await Operation.getAll();
      setBooks(books);
    };

    getBooks();
  }, []);

  return (
    <Routes>
      <Route
        path="/search"
        element={
          <Search
            booksSearched={Searched}
            existingBooks={Books}
            onHandleSearch={onHandleSearch}
            onChangeShelf={onChangeShelf}
          />
        }
      />
      <Route
        exact
        path="/"
        element={<MyReads Books={Books} onChangeShelf={onChangeShelf} />}
      />
    </Routes>
  );
}

export default App;
