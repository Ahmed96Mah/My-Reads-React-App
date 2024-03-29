const api = 'https://reactnd-books-api.udacity.com';

let token = localStorage.token;

const searchforUser = () => {
  const storageKeys = Object.keys(localStorage);
  const test = storageKeys
    .filter((key) => key.match('user'))
    .filter((key) => localStorage[key].split(',')[3] === localStorage['token']);
  test.length === 0
    ? (localStorage.loggedIn = false)
    : (localStorage.loggedIn = true);
};

searchforUser();

if (!token)
  token = localStorage.token = Math.random().toString(36).substring(-8);

const headers = {
  Accept: 'application/json',
  Authorization: token,
};

export const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then((res) => res.json())
    .then((data) => data.book);

export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then((res) => res.json())
    .then((data) => data.books);

export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shelf }),
  }).then((res) => res.json());

export const search = (query, maxResults) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, maxResults }),
  })
    .then((res) => res.json())
    .then((data) => data.books);

export const createUser = (user) => {
  // Generate a random token for the user
  const userToken = Math.random().toString(36).substring(-8);
  // make sure that the data sent by the form includes all the required fields
  if (user.username !== '' && user.email !== '' && user.password !== '') {
    const storageKeys = Object.keys(localStorage);
    // check if the username or e-mail is already used by another user
    const test = storageKeys
      .filter((key) => key.match('user'))
      .filter(
        (key) =>
          localStorage[key].split(',')[0] === user.username ||
          localStorage[key].split(',')[1] === user.email
      );
    if (test.length === 0) {
      // if no one uses that user name or e-mail, save them along with the password and auth token
      localStorage[
        `user${localStorage.length}`
      ] = `${user.username},${user.email},${user.password},${userToken}`;
      localStorage.token = userToken;
      return true; // indicate a successfull post operation
    } else {
      return false; // indicate a failed post operation
    }
  }
};

export const checkUser = (user) => {
  const storageKeys = Object.keys(localStorage);
  // check that the username and password combo existis
  const test = storageKeys
    .filter((key) => key.match('user'))
    .filter(
      (key) =>
        localStorage[key].split(',')[0] === user.username &&
        localStorage[key].split(',')[2] === user.password
    );
  // if so, set the currently used token in localstorage to the user's token
  test.length === 1 &&
    (localStorage.token = localStorage.getItem(test[0]).split(',')[3]);
};
