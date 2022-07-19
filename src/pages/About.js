import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Operation from '../util/BooksAPI';
import '../css/App.css';
import AboutDiv from '../components/AboutDiv';

const About = ({ bookID }) => {
  const [Book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      const book = await Operation.get(bookID);
      setBook([book]);
    };

    Book.length === 0 && getBook();
  }, [bookID, Book]);

  return Book[0] !== undefined ? (
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
    </div>
  ) : (
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
