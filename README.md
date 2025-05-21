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
