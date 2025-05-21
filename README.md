# 📚 Book Review API

A secure and modular RESTful API to manage books and user reviews. Includes JWT-based authentication, access/refresh token handling, and MongoDB integration.

## 🚀 Features

1. User registration and login with hashed passwords
2. JWT-based authentication with access and refresh tokens
3. Refresh token handling via HTTP-only cookies
4. CRUD operations for Books and Reviews
5. Search books by exact title or author (case-insensitive)
6. Pagination and sorting support

## ⚙️ Setup Instructions

### 1. Clone the repository
 ```bash
 git clone https://github.com/your-repo/book-review-api.git
 cd book-review-api
```
### 2. Install dependencies

```bash
npm install
```
### 3. Configure Environment Variables

Create a .env file based on the provided .env.sample:
``` bash
PORT=3000
MONGO_URI=your_mongodb_connection_uri
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=10d
```
### 4. Start the server
```bash
npm run dev   # if using nodemon
# OR
node server.js
```
Server will be running at: http://localhost:3000

## 🗂️ Database Schema

This project uses MongoDB as its database. Below is a brief overview of the primary collections and their fields

### 1.  Users Collection

{
  "_id": ObjectId,
  "username": String,
  "email": String,
  "password": String (hashed),
  "role": String, // default: "user"
  "createdAt": Date,
  "updatedAt": Date
}

### 2. Books Collection

{
  "_id": ObjectId,
  "title": String,
  "author": String,
  "genre": String,
  "description": String,
  "createdAt": Date,
  "updatedAt": Date
}

### 3.  Reviews Collection

{
  "_id": ObjectId,
  "user": ObjectId (ref: User),
  "book": ObjectId (ref: Book),
  "rating": Number (1–5),
  "comment": String,
  "createdAt": Date,
  "updatedAt": Date
}

## 📮 API Endpoints
### 🔐 Auth Routes

- POST  **`/api/auth/signup`**: Registers a new user by creating an account with the provided credentials and stores the user information in the MongoDB database.
  
- POST **`/api/auth/login`**  : Authenticates the user using the provided email and password. If the credentials are valid, the server responds with a short-lived access token (valid for 15 minutes) and a refresh token (valid for 7 days).
  - The access token is returned in the response body and must be sent in the Authorization header as a Bearer token to access protected routes.
  - The refresh token is securely stored in an HttpOnly cookie to prevent XSS attacks. It is used to obtain a new access token without requiring the user to log in again.
    
- POST **`/api/auth/refresh-token`** : Generates a new access token using a valid refresh token. Upon successful verification of the refresh token, a new access token is issued.

### 📘 Book Routes

- POST  **`/api/books`** :  Creates a new book record in the MongoDB database.
   - **Payload** : Requires `title`, `author`, `genre`, and `description` in the request body.
   - **Access** : Protected route – only authenticated users can access this endpoint.
   - **Authorization**: Protected route – only authenticated users can access this endpoint.
     
- GET  **`/api/books`** : Retrieves a list of all books available in the database.
  - **Access** : Public – no authentication required.
  - **Response** : Returns an array of all books with basic details.

- GET **`/api/books/:id`** : Fetches detailed information about a single book, including its associated reviews and average rating (if available).
  - **Parameters** : `id (string)` – MongoDB ObjectId of the book to be fetched.
  - **Access** : Public – no authentication required.

- GET **`/api/books/search?q=<search_term>`** : Searches for books by `title` or `author`. The search is case-insensitive and supports exact word matches.
  - **Query Parameters** : `q (string)` – Required. The keyword to search.
  - **Access** : Public – no authentication required.

### ⭐ Review Routes

- POST **`/api/:bookId/reviews`** : Allows an authenticated user to submit a review for a specific book.
  - **Parameters** : `bookId` – The ID of the book being reviewed.
  - **Payload** : Requires `rating` (Number) and `comment` (String) in the request body.
  - **Access** : Protected route – requires a valid Bearer token in the Authorization header.
    
  **Constraints**:
    - A user can submit only one review per book.
    - Attempting to submit multiple reviews for the same book will result in an error.
    
- PUT `/api/:reviewId` : Enables an authenticated user to update their existing review.
  - **Parameters** : `reviewId` – The ID of the review to be updated.
  - **Payload** : Can include updated rating and/or comment.
  - **Access** : Protected route – only the user who created the review can update it.
    
- DELETE `/api/:reviewId` : Allows an authenticated user to delete their review.
  - **Parameters** : `reviewId` – The ID of the review to be deleted.
  - **Access** : Protected route – only the user who created the review can delete it.

## 🔑 Authentication

This API uses **JWT (JSON Web Tokens)** for authentication. Use Postman to run the followinf endpoints.

### 🧾 Steps to Authenticate:

1. **Register a New User**

Select the POST method and paste the following URL into the URL section of Postman:
```bash
http://localhost:3000/api/auth/signup  
```
In the `Body tab`, select `raw` and choose `JSON format`, then provide the following example payload:

```json
{
  "username": "<your_username>",
  "email": "<your_email@example.com>",
  "password": "<your_password>"
}
```
**Sample example**

<img src="/Asset/signup.jpg" alt="Screenshot" width="800" height="400">


2. **Login**

Select the POST method and paste the following URL into the URL section of Postman:

```bash
http://localhost:3000/api/auth/login  
```
In the `Body tab`, select `raw` and choose `JSON format`, then provide the following example payload:

```json
{
  "email": "<your_email@example.com>",
  "password": "<your_password>"
}
```
**Sample example**

<img src="/Asset/login.jpg" alt="Screenshot" width="800" height="400">

3. **Get Access Token**

Once login is done successfully, The access token will be generated. This token will be valid for next 15 minute. Keep it to login to protected route.

**Sample example**

<img src="/Asset/AccessToken.jpg" alt="Screenshot" width="800" height="400">

4. **Generate access token from refresh token**

Select the GET method and paste the following URL into the URL section of Postman:

```bash
http://localhost:3000/api/auth/refresh-token  
```

This will re-generate the access token

**Sample example**

<img src="/Asset/refreshToken.jpg" alt="Screenshot" width="800" height="400">

## 📚 Book APIs

Some endpoints are **protected** and require an **access token** via the `Authorization` header using the **Bearer Token** method. Public routes can be accessed without authentication.

### 🧾 Steps to Communicate with Book APIs

---

### 1. **Create a New Book** – Protected Route

Select the POST method and paste the following URL into the URL section of Postman. It will create a new book record in the database

```bash
http://localhost:3000/api/auth/refresh-token  
```

In the `Body tab`, select `raw` and choose `JSON format`, then provide the following example payload:

```json
{
   "title":"your_book_title",
   "author" :"your_book_author",
   "genre": "your_book_genre",
   "description": "your_book_description"
}
```
**Sample example**

<img src="/Asset/createBook.jpg" alt="Screenshot" width="800" height="400">

### 2. **Get All Books** – Public Route

Select the GET method and paste the following URL into the URL section of Postman. It will fetch all the book records from the database.

```bash
http://localhost:3000/api/books
```

No request body and headers are required.

**Sample example**

<img src="/Asset/getBook.jpg" alt="Screenshot" width="800" height="400">

### 3. **Get Book by ID** – Public Route

Select the GET method and replace :id with a valid book ID in the URL section of Postman. It will fetch the book's details including its reviews and ratings.

```bash
http://localhost:3000/api/books/:<your_book_id>
```
**Sample example**

<img src="/Asset/getBookbyId.jpg" alt="Screenshot" width="800" height="400">

### 4. **Search Books by Title or Author** – Public Route

Select the GET method and provide the search term using the query parameter q. Searches for matching book titles or authors.

```bash
http://localhost:3000/api/books/search?q=<search_term>
```
**Sample example**

<img src="/Asset/getBookByTitleandAuthor.jpg" alt="Screenshot" width="800" height="400">

## ✍️ Review APIs

All review-related endpoints are protected and require an access token via the Authorization header using the Bearer Token method.

### 🧾 Steps to Communicate with Review APIs

---

### 1. **Create a Review for a Book** – Protected Route

```bash
http://localhost:3000/api/:<your_book_id>/reviews
```

In the Body tab, select raw and choose JSON format, then provide the following payload:

```json
{
  "rating": "your rating between 1 to 5",
  "comment":  "your_Comment"
}
```
 Constraint: A user can only submit one review per book. Attempting multiple reviews will return an error.

 **Sample example**

<img src="/Asset/addReview.jpg" alt="Screenshot" width="800" height="400">

### 2. **Update a Review** – Protected Route

Select the PUT method and replace :reviewId with a valid review ID in the URL section of Postman. It allows the review to be updated.

```bash
http://localhost:3000/api/:<your_review_id>
```

Provide the new content in the Body tab:

```json
{
  "rating": "your rating between 1 to 5",
  "comment": "your_Comment"
}
```

**Sample example**

<img src="/Asset/updateReview.jpg" alt="Screenshot" width="800" height="400">

### 3. **Delete a Review** – Protected Route

Select the DELETE method and replace :reviewId with a valid review ID in the URL section of Postman. It removes the review.

```bash
http://localhost:3000/api/:<your_review_id>
```
**Sample example**

<img src="/Asset/deleteReview.jpg" alt="Screenshot" width="800" height="400">

---

Thank you for checking out this project! 🌟

## 💬 Contact

For any queries or feedback, please contact:  
**Anjana Singh**  
📧 anjanasingh1257@gmail.com  
🌐 [LinkedIn](https://www.linkedin.com/in/anjana732) 





