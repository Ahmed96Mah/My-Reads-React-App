import './css/App.css';
import { Routes, Route } from 'react-router-dom';
import * as Operation from './util/BooksAPI';
import { useState, useEffect } from 'react';
import Search from './pages/Search';
import MyReads from './pages/MyReads';
import About from './pages/About';
import SignUp from './pages/SignUp';

function App() {
  const [Searched, setSearched] = useState([]);
  const [Books, setBooks] = useState([]);
  const [BookID, setBookID] = useState('');

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

  const onHandleLookup = (BookID) => {
    setBookID(BookID);
  };

  const logout = () => {
    localStorage.token = Math.random().toString(36).substring(-8);
  };

  useEffect(() => {
    let mounted = true;

    const getBooks = async () => {
      const books = await Operation.getAll();
      if(mounted){
        setBooks(books);
      }
    };

    (localStorage.loggedIn === 'true') && getBooks();
    
    return () => {
      mounted = false;
    };
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
            onHandleLookup={onHandleLookup}
            logged={localStorage.loggedIn}
            onlogout={logout}
          />
        }
      />
      <Route
        exact
        path="/"
        element={
          <MyReads
            Books={Books}
            onChangeShelf={onChangeShelf}
            onHandleLookup={onHandleLookup}
            logged={localStorage.loggedIn}
            onlogout={logout}
          />
        }
      />
      <Route path="/about" element={<About bookID={BookID} onlogout={logout}/>} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
