# Tasks API

This is a simple backend API for managing tasks, built using Node.js, Express, and MongoDB.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)

## Features

**Task Management:**

- Create, Read, Update, Delete (CRUD) operations for tasks. - Filter and sort tasks by category and privacy. - Assign due dates, priorities, and categories. - Add text tasks or a list of tasks. - Toggle task sharing.

- **Category Management:**
  - Create, Read, Update, Delete (CRUD) operations for categories.
- **User Authentication and Authorization:**
  - User registration (with email confirmation).
  - User login.
  - Secure authentication using JSON Web Tokens (JWT).
  - Password hashing with bcrypt for enhanced security.
- **User Profile:**
  - Get user profile information.
- **Input Validation:**
  - Robust validation of task and category data using Joi.
- **Error Handling:**
  - Centralized error handling middleware.
  - Custom error classes for different types of errors.
- **(Optional) Email Notifications:**

  - Send email notifications for new tasks or updates using Nodemailer.

- **Pagination:** Support for paginated responses for improved performance.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MooRagab/Tasks_API.git
   cd Tasks_API
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a ".env" file in config folder root directory and add your environment variables. Example:

```env
PORT = your_port
DBURI = your_db_uri
NODEMAILER_EMAIL=your_email
NODEMAILER_PASSWORD=your_email_password
SALT_ROUND= your_salt
EMAIL_TOKEN=your_email_token
SIGNIN_TOKEN=your_email_signin_token
BEARER_KEY=your_bearer_key
```

## Usage

1. **Starting The Server:**

```bash
   npm run dev
```

## API Endpoints

### Authentication

| Method | Endpoint                        | Description             | Authentication |
| :----: | :------------------------------ | :---------------------- | :------------: |
|  POST  | `/api/auth/signup`              | Register a new user     |       No       |
|  GET   | `/api/auth/confirmemail/:token` | Confirm user's email    |       No       |
|  POST  | `/api/auth/signin`              | Login and get JWT token |       No       |

### Tasks

| Method | Endpoint                               | Description              | Authentication |
| :----: | :------------------------------------- | :----------------------- | :------------: |
|  GET   | `/api/tasks`                           | Get all tasks            |      Yes       |
|  GET   | `/api/tasks/:taskId`                   | Get a specific task      |      Yes       |
|  POST  | `/api/tasks/addtext`                   | Add a text task          |      Yes       |
|  POST  | `/api/tasks/addlist`                   | Add a list of tasks      |      Yes       |
|  PUT   | `/api/tasks/update/:taskId`            | Update a task            |      Yes       |
| DELETE | `/api/tasks/delete/:taskId`            | Delete a task            |      Yes       |
| PATCH  | `/api/tasks/toggleTaskSharing/:taskId` | Toggle task sharing      |      Yes       |
|  GET   | `/api/tasks/sharedtasks`               | Show shared tasks        |      Yes       |
|  GET   | `/api/tasks/tasksbycategory`           | Filter tasks by category |      Yes       |
|  GET   | `/api/tasks/tasksbyprivacy`            | Filter tasks by privacy  |      Yes       |

### Categories

| Method | Endpoint                             | Description             | Authentication |
| :----: | :----------------------------------- | :---------------------- | :------------: |
|  GET   | `/api/categories`                    | Get all categories      |      Yes       |
|  GET   | `/api/categories/:categoryId`        | Get a specific category |      Yes       |
|  POST  | `/api/categories/create`             | Create a new category   |      Yes       |
|  PUT   | `/api/categories/update/:categoryId` | Update a category       |      Yes       |
| DELETE | `/api/categories/delete/:categoryId` | Delete a category       |      Yes       |

### User Profile

| Method | Endpoint                    | Description      | Authentication |
| :----: | :-------------------------- | :--------------- | :------------: |
|  GET   | `/api/users/userserprofile` | Get user profile |

## Technologies Used

- **Backend:**
  - **Node.js:** JavaScript runtime environment.
  - **Express.js:** Web application framework for building APIs.
  - **MongoDB:** NoSQL database for storing data.
  - **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
- **Authentication and Security:**
  - **jsonwebtoken (JWT):** For generating and verifying JSON Web Tokens.
  - **bcryptjs:** For hashing and salting passwords.
- **Validation:**
  - **Joi:** For data validation.
- **Other:**
  - **Nodemailer (Optional):** For sending email notifications.
  - **dotenv:** For managing environment variables.
  - **nodemon:** For automatic server restarts during development.

## Project Structure

- **src:**
  - **controllers:**
    - `category.controller.js`
    - `registration.controller.js`
    - `task.controller.js`
    - `user.controller.js`
  - **DB:**
    - `models:` Mongoose schemas for data models (e.g., Task, User, Category).
    - `connection.js:` MongoDB connection setup.
  - **middlewares:**
    - `auth.js:` Authentication middleware.
    - `validation.js:` Validation middleware.
  - **routes:**
    - `category.route.js`
    - `registration.route.js` (Assuming this is for authentication routes)
    - `task.route.js`
    - `user.route.js`
  - **services:**
    - `email.js` (If using Nodemailer)
    - `errorHandling.js`
    - `pagination.js`
  - `index.js:` Entry point of the application.
