
# Product Management CRUD App

A simple product management application built with the MERN stack (MySQL, Express, React, Node.js) that allows you to create, read, update, and delete (CRUD) product data.

## Features

- Add a new product
- View a list of products
- Edit product details
- Delete a product

## Technologies Used

- **Frontend:**
  - React.js
  - Axios (for HTTP requests)
  - Tailwind CSS (for styling)

- **Backend:**
  - Node.js
  - Express.js
  - MySQL

## Prerequisites

- Node.js and npm installed on your machine
- MySQL installed and running on your machine

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/lutfiangga/crud-image-express-react.git
cd crud-image-express-react
```

### 2. Backend Setup

 #### 1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

 #### 2. Install the dependencies:

   ```bash
   npm install
   ```

 #### 3. Create a `.env` file in the `backend` directory and add your MySQL connection string:

   ```bash
   SERVER_PORT=your_server_port
   DB_NAME=your_database
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_HOST=your_hostname
   DB_PORT=your_mysql_port
   DB_DIALECT=mysql
   ```

 #### 4. Start the backend server:

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:5000`.

### 3. Frontend Setup

 #### 1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

 #### 2. Install the dependencies:

   ```bash
   npm install
   ```

 #### 3. Create a `.env` file in the `frontend` directory and add the API URL:

   ```bash
   VITE_PRIVATE_API_URL=your_api_url
   ```

 #### 4. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:3000`.

## Project Structure

```
.
├── backend
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── .env
│   ├── server.js
│   └── package.json
└── frontend
    ├── src
    │   ├── components
    │   ├── pages
    │   ├── App.jsx
    │   ├── main.jsx
    ├── .env
    └── package.json
```

## Usage

- **Add Product:** Click the "Add Product" button and fill in the form to add a new Product.
- **Edit Product:** Click the "Edit" button next to a Product to update their information.
- **Delete Product:** Click the "Delete" button next to a Product to remove them from the database.