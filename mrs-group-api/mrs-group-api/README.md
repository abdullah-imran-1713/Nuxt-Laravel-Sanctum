<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/UsmanLhrPk/mrs-group-api/refs/heads/main/public/logo-lg.png?token=GHSAT0AAAAAACXKAVOL3VGAZNEF4QNNMPNUZ3X6MIQ" width="400" alt="Laravel Logo"></a></p>

[![Code Style](https://github.com/UsmanLhrPk/mrs-group-api/actions/workflows/pint-linter.yml/badge.svg)](https://github.com/UsmanLhrPk/mrs-group-api/actions/workflows/pint-linter.yml)

# MRS Group API Documentation

Welcome to the **MRS Group API**! This API is designed to manage a Customer Relationship Management (CRM) system with features like user authentication, lead management, client management, notifications, and integrations.

---

## **Table of Contents**

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Modules](#modules)
    - [User Management](#1-user-management)
    - [Lead Source Management](#2-lead-source-management)
    - [Client Management](#3-client-management)
    - [Appointments](#4-appointments)
    - [Job Management](#5-job-management)
    - [Notifications](#6-notifications)
    - [Task Management](#7-task-management)
    - [Communication](#8-communication)
    - [Payments](#9-payments)
    - [Calendar Integration](#10-calendar-integration)
    - [Inventory Management](#11-inventory-management)
    - [Contacts Book](#12-contacts-book)
    - [Price Book](#13-price-book)
    - [Lead Platform Integrations](#14-lead-platform-integrations)
4. [Error Handling](#error-handling)
5. [Setup Instructions](#setup-instructions)
6. [Code Quality](#code-quality)

---

## **Overview**

The MRS Group API is built using **Laravel** and leverages:
- **MariaDB**: For database management.
- **Laravel Sanctum**: For secure authentication.
- **Laravel Breeze**: For rapid scaffolding of authentication features.
- **Laravel Pint**: For ensuring code quality and formatting.

This API enables seamless management of CRM functionalities via RESTful endpoints.

---

## **Authentication**

### **Laravel Sanctum**

- The API uses **Laravel Sanctum** for token-based authentication.
- A token is required for accessing all secure endpoints.

### **Login Endpoint**
`POST /api/login`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password"
}
```
**Request Body**:
```json
{
  "token": "your_access_token"
}
```

Include the token in the Authorization header as:

Authorization: Bearer your_access_token

## **Modules**

#### **1. User Management**
-  Endpoints:
   -  GET /api/users - List all users.
   -  POST /api/users - Create a new user.
   -  PATCH /api/users/{id} - Update user details.
   -  DELETE /api/users/{id} - Delete a user.
   -  Features:
   -  Role-based access control using Laravel Policies.

#### **2. Lead Source Management**
- Endpoints:
   - GET /api/lead-sources - List all lead sources.
   - POST /api/lead-sources - Add a new lead source.
   - PATCH /api/lead-sources/{id} - Update lead source details.
   - DELETE /api/lead-sources/{id} - Remove a lead source.

#### **3. Client Management**
- Endpoints:
   - GET /api/clients - List all clients.
   - POST /api/clients - Add a new client.
   - PATCH /api/clients/{id} - Update client details.
   - DELETE /api/clients/{id} - Remove a client.

#### **4. Appointments**
- Endpoints:
   - GET /api/appointments - List all appointments.
   - POST /api/appointments - Schedule a new appointment.
   - PATCH /api/appointments/{id} - Update appointment details.
   - DELETE /api/appointments/{id} - Cancel an appointment.

#### **5. Job Management**
- Endpoints:
   - GET /api/jobs - List all jobs.
   - POST /api/jobs - Create a new job.
   - PATCH /api/jobs/{id} - Update job details.
   - DELETE /api/jobs/{id} - Remove a job.

#### **6. Notifications**
- Endpoints:
   - GET /api/notifications - List notifications.
   - POST /api/notifications - Send a notification.

#### **7. Task Management**
- Endpoints:
   - GET /api/tasks - List all tasks.
   - POST /api/tasks - Create a new task.
   - PATCH /api/tasks/{id} - Update task details.
   - DELETE /api/tasks/{id} - Delete a task.

#### **8. Communication**
- Endpoints:
   - POST /api/chat - Initiate a chat.
   - POST /api/call - Initiate a call.
   - GET /api/chat/{id} - Retrieve chat history.

#### **9. Payments**
- Endpoints:
   - POST /api/payments - Process a payment.
   - GET /api/payments/history - View payment history.

#### **10. Calendar Integration**
- Endpoints:
    - GET /api/calendar - Fetch events.
    - POST /api/calendar/events - Add an event.

#### **11. Inventory Management**
- Endpoints:
  - GET /api/inventory - List inventory items.
  - POST /api/inventory - Add an inventory item.

#### **12. Contacts Book**
- Endpoints:
    - GET /api/contacts - List all contacts.
    - POST /api/contacts - Add a new contact.

#### **13. Price Book**
- Endpoints:
    - GET /api/price-book - Fetch price book entries.
    - POST /api/price-book - Add a new price book entry.

#### **14. Lead Platform Integrations**
- Endpoints:
    - GET /api/lead-platforms - List all lead platforms.
    - POST /api/lead-platforms - Add a new platform.

## Error Handling
#### Response Format:
```json
{
  "message": "Error message",
  "status_code": 400,
  "errors": {
    "field_name": ["Error details"]
  }
}
```

## Setup Instructions
#### 1.	Clone the repository:
    git clone https://github.com/your-repo.git

#### 2.	Install dependencies:
    composer install
    npm install

#### 3.	Run migrations:
    php artisan migrate


#### 4.	Run database seeding (if necessary):
    php artisan db:seed
#### 5.	Serve the application:
    php artisan serve

## Code Quality
#### Laravel Pint
#### Run Pint to check code quality
    ./vendor/bin/pint

Contributing

