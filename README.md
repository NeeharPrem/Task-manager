# Advanced Task Management Application

This application provides backend using Node.js,Express.js and MongoDB, offering APIs for Task Manager.

## Table of Contents
1. [Setup Instructions](#setup-instructions)
2. [API Endpoints](#api-endpoints)
3. [Authentication and Authorization](#authentication-and-authorization)
4. [Data Fetching and Caching](#data-fetching-and-caching)
5. [Database Integration](#database-integration)
6. [Real-time Features](#real-time-features)
7. [Error Handling and Logging](#error-handling-and-logging)
8. [Cloud Deployment](#cloud-deployment)
9. [Additional informations](#additional-informations)

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/NeeharPrem/Task-manager.git
   cd Task-manager
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the database:
   - Ensure MongoDB is installed and running on the system for LocalDB else use Atlas.

5. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     
```
PORT= enter a port number
MONGODB_URI= mongodb_connection_string 
JWT_SECRET= enter a jwt secret
JWT_REFRESH_SECRET= enter a refresh token secret
NODE_ENV= development or production
```

6. Start the application:
   ```
   npm run start
   ```

6. To run the application using pm2:
   ```
   npm install pm2 -g

   pm2 start src/server.js
   ```

The server should now be running on `http://localhost:3000`

## API Endpoints

1.  Tasks (CRUD operations):
   - POST `/api/task/` - Create a new task (user, admin)
   - GET `/api/task/` - Retrieve all tasks (admin,user)
   - PATCH `/api/task/edit/:id` - Edit a task (admin, user)
   - PATCH `/api/task/assign/:id` - Reassign task (admin)
   - PATCH `/api/task/remove-assignee/:id` - Remove a assigned user (admin)
   - DELETE `/api/task/delete/:id` - Delete a task (admin)

2. Aut Routes:
   - POST `/api/auth/register` - Register a new user
   - POST `/api/auth/login` - Login and receive JWT

3. User Routes:
   - GET `/api/users/` - Get user profile (admin)

## Authentication and Authorization

- JWT (JSON Web Tokens) are used for authentication.
- Protected routes require a JWT (Bearer) to ensure safe login.
- Role-Based Access Controlle for autherrization.

## Helmet and Express rate-limit

- For better security Helmet and Express rate-limit used.

## Database Integration

- MongoDB is used as the primary database.
- User and Task informations stored in MongoDB.

## Real-time Features

- WebSocket is implemented using Socket.IO.
- Clients can connect to receive real-time notifications when a new Task added or Task status changed.

## Error Handling and Logging

- Error handling middleware is implemented.
- Winston is used for logging errors.
- Joi used for Form validation.

## Cloud Deployment

- The application is deployed on AWS.
- Deployed BaseURL: https://13.233.120.219

## Additional Informations
### API Documentation

API documentation can be found in the `docs/api.md` file.