# MERN Multi-Level Category Management API

## 📑 Project Overview

This is a **Node.js + Express.js + MongoDB (Mongoose)** backend API for multi-level category management. It supports user authentication (JWT), category CRUD operations, and handles nested categories in tree structure.  

---

## 🚀 How to Set Up & Run the Project

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <project-folder>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root folder and add the following:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/categoryDB
JWT_SECRET=your_jwt_secret_key
```

### 4. Run the Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`.

---

## ✅ API Endpoints

### Authentication APIs

| Method | Endpoint            | Description               |
|-------|---------------------|---------------------------|
| POST  | `/api/auth/register` | Register a new user       |
| POST  | `/api/auth/login`    | Login user and get token  |

---

### Category APIs (Protected - Require JWT Token)

| Method | Endpoint                   | Description                                              |
|-------|----------------------------|----------------------------------------------------------|
| POST  | `/api/category`              | Create a new category (with optional parent)            |
| GET   | `/api/category`              | Fetch all categories in tree structure                 |
| PUT   | `/api/category/:id`          | Update a category (name or status)                     |
| DELETE| `/api/category/:id`          | Delete a category and reassign subcategories to parent |

---

## 🔐 Authentication Flow

1. Register or login to get a JWT token.
2. Pass the JWT token in `Authorization` header as `Bearer TOKEN_HERE` for all category APIs.

---

## 📦 Sample API Request & Response

### 🔑 Register User

**Request:**

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "User registered successfully"
}
```

---

### 🔑 Login User

**Request:**

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "your_jwt_token_here"
}
```

---

### 🌳 Create Category

**Request:**

```http
POST /api/category
Authorization: Bearer your_jwt_token_here
Content-Type: application/json

{
  "name": "Electronics",
  "parent": null
}
```

**Response:**

```json
{
  "_id": "category_id",
  "name": "Electronics",
  "parent": null,
  "status": "active"
}
```

---

### 🌲 Get All Categories (Tree Format)

**Request:**

```http
GET /api/category
Authorization: Bearer your_jwt_token_here
```

**Response:**

```json
[
  {
    "_id": "parent_category_id",
    "name": "Electronics",
    "parent": null,
    "status": "active",
    "children": [
      {
        "_id": "child_category_id",
        "name": "Mobiles",
        "parent": "parent_category_id",
        "status": "active",
        "children": []
      }
    ]
  }
]
```

---

### ✏️ Update Category

**Request:**

```http
PUT /api/category/:id
Authorization: Bearer your_jwt_token_here
Content-Type: application/json

{
  "name": "New Category Name",
  "status": "inactive"
}
```

**Response:**

```json
{
  "message": "Category updated successfully"
}
```

---

### ❌ Delete Category

**Request:**

```http
DELETE /api/category/:id
Authorization: Bearer your_jwt_token_here
```

**Response:**

```json
{
  "message": "Category deleted successfully and subcategories reassigned"
}
```

---

## ⚙️ Important Features

- JWT-based authentication and authorization.
- Multi-level nested category tree.
- Reassign child categories on parent deletion.
- Automatic status update for subcategories when parent is activated/deactivated.
- MongoDB optimized with indexing and relational reference for performance.

---

## 🛑 Notes

- Make sure MongoDB is running locally or update `MONGO_URI` in `.env` for production use.
- All category APIs are protected and require valid JWT token in the `Authorization` header.
- Use Postman or any API client for testing.

---

## 👨‍💻 Author

Created by **Anglara Digital Solutions**

---