# API Documentation

## 1. Task Management

### Create a New Task
```http
POST /api/task

Request Body:
{
  "title": "string",
  "description": "string",
  "priority": "medium",
  "assignees": ["671a65f7d4b352b8e7a01aa1"],
  "duedate": "2024-10-24T15:00:44.480Z"
}

Responses:
201 - Created: Task created successfully
400 - Bad Request: Invalid input data
500 - Internal Server Error
```

### Retrieve All Tasks
```http
GET /api/task

Responses:
200 - OK: Returns array of task objects
404 - Unauthorized: Token invalid
500 - Internal Server Error
```

### Edit Task
```http
PATCH /api/task/edit/:id

Parameters:
- id (required): Task ID

Responses:
200 - OK: Task updated successfully, returns {data}
404 - Not Found: Task not found
500 - Internal Server Error
```

### Assign Task (admin)
```http
PATCH /api/task/assign/:id

Parameters:
- id (required): Task ID
- Authorization: Bearer <JWT>

Request Body:
{
  "assignees": "671a702ed4b352b8e7a01aa4"
}

Responses:
200 - OK: Task assigned successfully, returns {data}
404 - Not Found: Task not found
500 - Internal Server Error
```

### Delete Task (admin)
```http
DELETE /api/task/delete/:id

Parameters:
- id (required): Task ID
- Authorization: Bearer <JWT>

Responses:
200 - OK: Task deleted successfully
404 - Not Found: Task not found
500 - Internal Server Error
```

## 2. Authentication

### Register User
```http
POST /api/auth/register

Request Body:
{
  "username": "string",
  "email": "string",
  "password": "string"
}

Responses:
201 - Created: Account created successfully
400 - Bad Request: Invalid input data or user already exists
```

### Login
```http
POST /api/auth/login

Request Body:
{
  "username": "string",
  "password": "string"
}

Responses:
200 - OK: Login successfully, returns JWT token & refresh token
401 - Invalid credentials
```

## 3. User Management

### Get Users
```http
GET /api/users

Headers:
Authorization: Bearer <JWT>

Responses:
200 - OK: Returns user data
401 - Unauthorized
```

### Get All Users (admin)
```http
GET /api/all-users

Headers:
Authorization: Bearer <JWT>

Responses:
200 - OK: Returns user data including blocked users
401 - Unauthorized
```

### Block User (admin)
```http
POST /api/:id/block

Parameters:
- id (required): User ID to block

Headers:
Authorization: Bearer <JWT>

Responses:
200 - OK: Returns user data
401 - Unauthorized
```

### Unblock User (admin)
```http
POST /api/:id/unblock

Parameters:
- id (required): User ID to unblock

Headers:
Authorization: Bearer <JWT>

Responses:
200 - OK: User unblocked successfully, returns {userId}
400 - Bad Request: User is not blocked or does not exist
401 - Unauthorized
```