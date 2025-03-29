# WorkPay-API

## Overview

WorkPay-API serves as an API Gateway, handling request routing, authentication, and response aggregation. Meanwhile, the backend is responsible for business logic processing, database management, and task execution. This project is developed as a qualification requirement for the **Fullstack Developer** position at **PT. AIC**.

## Tech Stack

- Laravel 12
- MySQL

## Database Structure (ERD)
<p align="center"><img src="ss-db-structure.png" /></p>

## Project Installation

1. Clone this repository:
   ```sh
   git clone https://github.com/munzirgans/workpay/backend.git
   ```
2. Navigate to the project directory:
   ```sh
   cd backend
   ```
3. Install dependencies using Composer:
   ```sh
   composer install
   ```
4. Copy the environment configuration file:
   ```sh
   cp .env.example .env
   ```
5. Configure the database in the `.env` file:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=workpay
   DB_USERNAME=root
   DB_PASSWORD=
   ```
6. Generate the application key:
   ```sh
   php artisan key:generate
   ```
7. Run database migrations:
   ```sh
   php artisan migrate
   ```
8. Start the application:
   ```sh
   php artisan serve
   ```

## API Routes

Below is the list of available API endpoints along with request and response examples:

### Employee Routes

| Method | Endpoint       | Description                     |
| ------ | -------------- | ------------------------------- |
| GET    | /employee      | Retrieve all employees          |
| POST   | /employee      | Add a new employee              |
| GET    | /employee/{id} | Retrieve employee details by ID |
| PUT    | /employee/{id} | Update employee details by ID   |
| DELETE | /employee/{id} | Delete employee by ID           |

#### Request & Response Examples

**Add Employee**

```sh
POST /employee
Content-Type: application/json
{
    "name": "Muhammad Munzir",
    "email": "munzir@gmail.com"
}
```

**Response:**

```json
{
    "message": "Employee berhasil ditambahkan.",
    "data": {
        "id": 1,
        "name": "Muhammad Munzir",
        "email": "munzir@gmail.com"
    }
}
```

**Retrieve Employee List**

```sh
GET /employee
```

**Response:**

```json
[
    {
        "id": 1,
        "name": "Muhammad Munzir",
        "email": "munzirmz36@gmail.com"
    }
]
```

**Update Employee**

```sh
PUT /employee/1
Content-Type: application/json
{
    "name": "Munzir Dev",
    "email": "munzirdev@gmail.com"
}
```

**Response:**

```json
{
    "message": "Data pegawai berhasil diupdate",
    "data": {
        "id": 1,
        "name": "Munzir Gans",
        "email": "munzirgans@gmail.com"
    }
}
```

**Delete Employee**

```sh
DELETE /employee/1
```

**Response:**

```json
{
    "message": "Data pegawai berhasil dihapus."
}
```

### Task Routes

| Method | Endpoint   | Description                 |
| ------ | ---------- | --------------------------- |
| GET    | /task      | Retrieve all tasks          |
| POST   | /task      | Add a new task              |
| GET    | /task/{id} | Retrieve task details by ID |
| PUT    | /task/{id} | Update task by ID           |
| DELETE | /task/{id} | Delete task by ID           |

#### Request & Response Examples

**Add Task**

```sh
POST /task
Content-Type: application/json
{
    "description": "Develop API endpoints",
    "date": "2025-03-29",
    "additional_charges": 50,
    "assignments": [
        {
            "employee_id": 1,
            "hours_spent": 5,
            "hourly_rate": 20
        }
    ]
}
```

**Response:**

```json
{
    "message": "Task dan employee berhasil diassign.",
    "task": {
        "id": 1,
        "description": "Develop API endpoints",
        "date": "2025-03-29",
        "additional_charges": 50
    },
    "assignments": [
        {
            "task_id": 1,
            "employee_id": 1,
            "hours_spent": 5,
            "hourly_rate": 20,
            "total_remuneration": 100
        }
    ]
}
```

**Retrieve Task List**

```sh
GET /task
```

**Response:**

```json
[
    {
        "id": 1,
        "description": "Develop API endpoints",
        "date": "2025-03-29",
        "additional_charges": 50
    }
]
```

**Update Task**

```sh
PUT /task/1
Content-Type: application/json
{
    "description": "Update API endpoints",
    "date": "2025-03-30",
    "additional_charges": 75
}
```

**Response:**

```json
{
    "message": "Task berhasil diperbarui.",
    "task": {
        "id": 1,
        "description": "Update API endpoints",
        "date": "2025-03-30",
        "additional_charges": 75
    }
}
```

**Delete Task**

```sh
DELETE /task/1
```

**Response:**

```json
{
    "message": "Task berhasil dihapus."
}
```

# Contact
For any inquiries or further information, please contact:
- Email: munzirmz36@gmail.com
- LinkedIn: [Muhammad Munzir](https://www.linkedin.com/in/muhammad-munzir-3439aa1aa/)
