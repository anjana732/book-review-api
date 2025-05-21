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

