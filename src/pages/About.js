import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Operation from '../util/BooksAPI';
import '../css/App.css';
import AboutDiv from '../components/AboutDiv';

const About = ({ bookID, onlogout }) => {
  const [Book, setBook] = useState([]);

  useEffect(() => {
    let mounted = true;

    const getBook = async () => {
      const book = await Operation.get(bookID);
      if (mounted) {
        setBook([book]);
      }
    };

    Book.length === 0 && getBook();

    return () => {
      mounted = false;
    };
  }, [bookID, Book]);

  return Book[0] !== undefined ? (
    // Make sure that the page is accessed through the (?) (or details) button
    <div className="container">
      <div className="book-title-div">
        <Link className="close-about" to="/">
          Close
        </Link>
        <h1>{Book[0]['title']}</h1>
      </div>

      <div className="about-div">
        <div className="about-cover">
          <img src={`${Book[0]['imageLinks']['thumbnail']}`} alt="" />
        </div>
        <div className="about-details">
          <AboutDiv
            title="Book ID:"
            bookInfo={Book[0]['id']}
            iterable={false}
          />
          <AboutDiv
            title="Authors:"
            bookInfo={Book[0]['authors']}
            iterable={true}
          />
          <AboutDiv
            title="Average Rating:"
            bookInfo={Book[0]['averageRating']}
            iterable={false}
          />
          <AboutDiv
            title="Categories:"
            bookInfo={Book[0]['categories']}
            iterable={true}
          />
          <AboutDiv
            title="Page Count:"
            bookInfo={Book[0]['pageCount']}
            iterable={false}
          />
          <AboutDiv
            title="Publisher:"
            bookInfo={Book[0]['publisher']}
            iterable={false}
          />
          <AboutDiv
            title="Published Date:"
            bookInfo={Book[0]['publishedDate']}
            iterable={false}
          />
        </div>
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
    // Else, display an empty page
    <div className="container">
      <div className="book-title-div">
        <Link className="close-about" to="/">
          Close
        </Link>
      </div>
    </div>
  );
};

export default About;
