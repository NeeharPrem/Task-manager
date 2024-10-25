# Advanced Task Management Application

This application provides a backend using Node.js, Express.js, and MongoDB, offering APIs for Task Management.

## Table of Contents
1. [Setup Instructions](#setup-instructions)
2. [API Endpoints](#api-endpoints)
3. [Authentication and Authorization](#authentication-and-authorization)
4. [Security Features](#security-features)
5. [Database Integration](#database-integration)
6. [Real-time Features](#real-time-features)
7. [Error Handling and Logging](#error-handling-and-logging)
8. [Cloud Deployment](#cloud-deployment)
9. [Additional Information](#additional-information)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/NeeharPrem/Task-manager.git
   cd Task-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Ensure MongoDB is installed and running locally or use MongoDB Atlas

4. Configure environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
   ```env
   PORT=<enter_port_number>
   MONGODB_URI=<mongodb_connection_string>
   JWT_SECRET=<enter_jwt_secret>
   JWT_REFRESH_SECRET=<enter_refresh_token_secret>
   NODE_ENV=development|production
   FRONTEND_URL = Frontend URL
   ```

5. Start the application:
   ```bash
   npm run start
   ```

6. For production deployment using PM2:
   ```bash
   npm install pm2 -g
   pm2 start src/server.js
   ```

The server will be running on `http://localhost:<PORT>`

## API Endpoints

### Task Management
- **POST** `/api/task` - Create a new task (User, Admin)
- **GET** `/api/task` - Retrieve all tasks (Admin, User)
- **PATCH** `/api/task/edit/:id` - Edit a task (Admin, User)
- **PATCH** `/api/task/assign/:id` - Reassign task (Admin)
- **PATCH** `/api/task/remove-assignee/:id` - Remove an assigned user (Admin)
- **DELETE** `/api/task/delete/:id` - Delete a task (Admin)

### Authentication
- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login and receive JWT

### User Management
- **GET** `/api/users` - Get user profile (User, Admin)
- **GET** `/api/all-users` - Get all users' profiles (Admin)
- **POST** `/api/:id/block` - Block a user (Admin)
- **POST** `/api/:id/unblock` - Unblock user (Admin)

## Authentication and Authorization

- JWT (JSON Web Tokens) implementation for authentication
- Protected routes require Bearer token authentication
- Role-Based Access Control (RBAC) for authorization

## Security Features

- Helmet middleware for enhanced security headers
- Express rate-limit for API request throttling
- Secure environment variable configuration

## Database Integration

- MongoDB as the primary database
- Stores user and task information
- Proper data modeling and relationships

## Real-time Features

- WebSocket implementation using Socket.IO
- Real-time notifications for:
  - New task creation
  - Task status changes

## Error Handling and Logging

- Comprehensive error handling middleware
- Winston logger implementation
- Joi validation for request payload validation

## Cloud Deployment

- Application deployed on AWS
- Production Base URL: https://acelearn.online

## Additional Information

- Detailed API documentation available in `docs/api.md`
- For more information, please refer to the documentation