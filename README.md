#  🏀 Sports Web Registration/Login System

This is a simple web app built using **Node.js**, **Express**, **PostgreSQL**, and **EJS** that supports user registration, login, and homepage rendering with user details.

---

## 📦 Features

- Register new users with secure password hashing
- Login functionality with email + password
- PostgreSQL integration using `pg`
- EJS templating for personalized homepage
- Clean front-end using HTML and CSS

---

## 🖥️ Setup Instructions

### 1. 📦 Install Node Packages

Make sure you have **Node.js** and **npm** installed.

Then install all dependencies:

```bash
npm i 
```

---

### 2. 🐘 Install PostgreSQL & pgAdmin

#### Windows / Linux / macOS:

- Download PostgreSQL from: https://www.postgresql.org/download/
- During installation:
  - Set the password
- pgAdmin (GUI for PostgreSQL) usually comes with the installer
> **Note:**  
> Don’t forget to change the password in the server.js
> ```javascript
> ...
>
> const saltRounds = 10
> const db = new pg.Client({
>     host:'localhost',
>     user:"postgres",
>     password:"your_password", // <= right here
>     port:5432, 
>     database:"sports_web"
> })
> 
> db.connect()
> 
> ...
> ```



---

### 3. 🗃️ Create the Database

1. Open pgAdmin or psql.

2. Create the database:
   1. Click on the query tool button in pg Admin
   
   1. Open the queries.sql

   2. Copy-paste all the code on to the query section

---

### 4. 🚀 Run the App

```bash
npm run dev
```

Open your browser and go to: [http://localhost:3000](http://localhost:3000)

### Voila! You have your website ready to go!
---
