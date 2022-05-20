**mystoreapi** is a simple api endpoint for mystore shop application built with Node.js, 
Express Js as a framework of Node.js and Postgre SQL as a database which has 
[features](#features) such as login / register using JWT, pasword hashing, CORS.



## Table Of Content

-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Features](#features)
-   [Examples](#examples)
-   [Built wtih](#features)
-   [Author](#author)
## Prerequisites
-   NPM as package manager.
-   Node.js installed on the local machine.
-   Postgre SQL intalled on the local machine
## Installation

1. Clone this repository:
   `https://github.com/fandipras7/myStoreAPI.git`
2. Open VSCOde and type 'npm install' on your terminal
3. copy all files on env example to the new .env
3. Database configuration
4. Start the server:
    - Open root project folder with command line (terminal, linux. cmd, windows. etc.)
    - Type and run this command `npm start` to start the server.
    - Make sure there are no other processes that use port 4000
5. Run app with api testing tools like postman, etc. on http://localhost:4000/v1/products as an example.
## Features

-   [x] CRUD
-   [x] Search, Sort, Pagination
-   [x] CORS allowed
-   [x] Login/Register with JWT
-   [x] Password hashing
## Built With

-   [Node.js](http://nodejs.org/) - JavaScript runtime environment
-   [Express.js](https://expressjs.com/) - Node.js framework
-   [Postgre SQL](https://www.postgresql.org/) Database
-   [JWT](https://jwt.io/) - Login/Register authentication
-   [Bcrypt] - Password Hashing
## Author

This project was made by me, talent PijarCamp Fullstack WEB Batch 2
