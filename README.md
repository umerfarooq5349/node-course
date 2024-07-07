# Web App Built with Node and Express 🚀

## Project Description

Welcome to the **Web App Built with Node and Express**! This project is designed to help you learn and practice Node.js development. It includes various features such as routing, middleware, and data handling.

## Features

- **Routing** with Express.js 🌐
- **Middleware** for Request Handling 🛠️
- **Data Management** with MongoDB 📊
- **Authentication** and Authorization 🔐
- **API Documentation** with Swagger 📜

## Project Structure

```plaintext
node-course/
├── controller/
├── dev-data/
├── models/
├── node_modules/
├── public/
├── routes/
├── utils/
├── .gitignore
├── app.js
├── package-lock.json
├── package.json
├── server.js
└── README.md
```

## Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/umerfarooq5349/node-course.git
    cd node-course
    ```

2. **Install the dependencies:**

    ```sh
    npm install
    ```



3. **Set up environment variables:**

    Create a `.env` file in the root directory and add the required environment variables.


## Running the Application

1. **Start the development server:**

    ```sh
    npm start
    ```

    

2. **Open your browser and navigate to `http://localhost:3000` to see the application in action.**

    

## Project Setup

- **controller/**: Contains controller functions for handling requests.
- **dev-data/**: Contains sample data for development.
- **models/**: Contains Mongoose models for MongoDB.
- **routes/**: Contains route definitions.
- **utils/**: Contains utility functions.

## API Endpoints

### Get All Items

- **URL:** `/api/items`
- **Method:** `GET`
- **Description:** Retrieves a list of all items.
- **Response:**

    ```json
    [
        {
            "id": 1,
            "name": "Item 1",
            "price": 100
        }
    ]
    ```

### Create an Item

- **URL:** `/api/items`
- **Method:** `POST`
- **Description:** Creates a new item.
- **Request Body:**

    ```json
    {
        "name": "New Item",
        "price": 150
    }
    ```

- **Response:**

    ```json
    {
        "message": "Item created successfully"
    }
    ```

## Dependencies

All dependencies are listed in the `package.json` file and can be installed using the `npm install` command. Some of the key dependencies include:

- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **dotenv**: Module to load environment variables from a `.env` file.

### Sample Code Screenshots

**1. Routing Setup (app.js):**



**2. Middleware Example (server.js):**



**3. Mongoose Model (models/itemModel.js):**



---

### Author

[Umer Farooq](https://github.com/umerfarooq5349)

