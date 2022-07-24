# MyReads: A Book Tracking App (Fullfillment of Udacity's React Development Nanodegree)

## Project Description

A React bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read. The project was scafolded using **create-react-app**.

### Operational Steps

To Start the project, You should follow the following steps:

1- Install project's dependencies using:
```
npm install
```

2- Then, start running the project using:
```
npm start
```

3- Sign-up (with a **unique** username & e-mail), and now you have access for the app.

<br>

### Extra Tasks

The project also has the following extra features:

1- The app saves the preferences of multiple users, by requireing a signup/login first.

2- The app has an about page (which can be accessed by clicking on **(?)** button) for each book (either at home or search page), which displays the following details about the book:

- Book ID
- Authors
- Average Rating
- Categories
- Page Count
- Publisher
- Published Date

### Project Link

You can access the build project from (github pages) [here](https://ahmed96mah.github.io/My-Reads-React-App/)

### Project's Notes

1- There is a select bookshelf component for each displayed book. The **current** value assigned to that component persists on both the home page and search page.

2- The user can assign each book to any of the three avaiable bookshelfs.

3- The changes made to the bookshelfs' content persist after reloading the page.

4-Since this is a front-end project, the database was **simulated** by using the localstorage to store the users info (username, e-mail, password & authentication token). Also, the BookAPI file has been modified to accomedate the new back-end functionalities required by the app, including the following additions:

- A **searchforUser** function was added to cross-check the provided authentication token with the one assigned for the user.

- A **createUser** function was added to generate an authentication token and save it along with the user's info in the ***simulated** database.

- A **checkUser** function was added to validate the user's login info.
