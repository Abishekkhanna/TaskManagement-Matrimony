
# Task Management App

A full-stack web application that enables users to create, update, delete, and track tasks under different projects. Built with Angular 16, Node.js (TypeScript), Express, and MySQL.

## 📌 Project Overview

This application allows users to manage tasks across various projects without the need for authentication. Users can:

- Create, edit, and delete projects.
- Create, update, delete, and view tasks associated with projects.
- Filter tasks by status and priority.

## 🚀 Features

- **Project Management**: Create, edit, delete, and list projects.
- **Task Management**: Create, edit, delete, and list tasks.
- **Filtering**: Filter tasks by status (To Do, In Progress, Completed) and priority (Low, Medium, High).
- **Responsive UI**: Built with Angular Material for a clean and responsive design.

## 🛠️ Technologies Used

- **Frontend**: Angular 16, Angular Material
- **Backend**: Node.js, Express, TypeScript
- **Database**: MySQL

## 📂 Folder Structure

```bash
task-management-app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.ts
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── ...
│   │   └── ...
│   └── ...
└── README.md
```

## ⚙️ Setup Instructions

### Prerequisites

- Node.js (v14.x or later)
- Angular CLI (v16.x or later)
- MySQL Server

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:

   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=task_management_db
   PORT=3000
   ```

4. Initialize the database:

   - Create the database in MySQL:

     ```sql
     CREATE DATABASE task_management_db;
     ```

   - Run the provided SQL script to create tables and insert dummy data:

     ```sql
     -- Create Projects Table
     CREATE TABLE projects (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       description TEXT,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );

     -- Create Tasks Table
     CREATE TABLE tasks (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       description TEXT,
       status ENUM('To Do', 'In Progress', 'Completed') DEFAULT 'To Do',
       priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
       project_id INT,
       due_date DATE,
       FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
     );

     -- Insert Dummy Projects
     INSERT INTO projects (name, description) VALUES
     ('Project Alpha', 'First project description'),
     ('Project Beta', 'Second project description'),
     ('Project Gamma', 'Third project description');

     -- Insert Dummy Tasks
     INSERT INTO tasks (title, description, status, priority, project_id, due_date) VALUES
     ('Design UI', 'Design the user interface', 'To Do', 'High', 1, '2025-04-25'),
     ('Setup Database', 'Initialize the MySQL database', 'In Progress', 'Medium', 1, '2025-04-28'),
     ('Implement Authentication', 'Add user login functionality', 'To Do', 'High', 2, '2025-05-01'),
     ('Create REST API', 'Develop the backend API', 'In Progress', 'Medium', 2, '2025-05-03'),
     ('Write Documentation', 'Prepare project documentation', 'To Do', 'Low', 3, '2025-05-05');
     ```

5. Start the backend server:

   ```bash
   npm run dev
   ```

   The backend server will run on `http://localhost:3000`.

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   ng serve
   ```

   The frontend will be accessible at `http://localhost:4200`.

## 📋 API Endpoints

### Projects

- `GET /api/projects` - Retrieve all projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/:id` - Retrieve a specific project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

### Tasks

- `GET /api/tasks` - Retrieve all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Retrieve a specific task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
