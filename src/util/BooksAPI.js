const api = 'https://reactnd-books-api.udacity.com';

let token = localStorage.token;

const searchforUser = () => {
  const storageKeys = Object.keys(localStorage);
  const test = storageKeys.filter((key) => key.match('user')).filter((key) => localStorage[key].split(',')[3] === localStorage["token"]);
  (test.length === 0)? (localStorage.loggedIn = false):(localStorage.loggedIn = true);
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
  const userToken = Math.random().toString(36).substring(-8);
  if (user.username !== "" && user.email !== "" && user.password !== "") {
    localStorage[`user${localStorage.length}`] = `${user.username},${user.email},${user.password},${userToken}`;
    localStorage.token = userToken;
  }
};

export const checkUser = (user) => {
  const storageKeys = Object.keys(localStorage);
  const test = storageKeys.filter((key) => key.match('user')).filter((key) => localStorage[key].split(',')[0] === user.username && localStorage[key].split(',')[2] === user.password);
  (test.length === 1) && (localStorage.token = localStorage.getItem(test[0]).split(',')[3]);
};