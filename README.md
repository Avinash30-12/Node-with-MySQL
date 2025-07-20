# Node-with-MySQL
CRUD operations using DATABASE MySQL.

# MySQL Node.js Mini Project

This is a mini Node.js application that integrates with a MySQL database. The project showcases how to use Express, MySQL, EJS templating, and basic CRUD operations.

---

## 🚀 Features

- Express.js server
- EJS templating engine
- MySQL database integration
- Basic CRUD functionality
- RESTful routing
- Middleware usage (e.g., `method-override`, `body-parser`)

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MySQL
- EJS
- Method-Override
- Body-Parser

---

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate into the project directory
cd Mysql

# Install dependencies
npm install
```

---

## ⚙️ Configuration

Update your MySQL connection details in your configuration file (e.g., `db.js` or wherever the connection is created):

```js
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'your-username',
  password : 'your-password',
  database : 'your-database'
});
```

---

## ▶️ Running the App

```bash
node app.js
```

Or if you use nodemon:

```bash
npx nodemon app.js
```

Once the server is running, visit:

```
http://localhost:3000
```

---

## 📁 Folder Structure

```
Mysql/
├── app.js                # Main entry point
├── views/                # EJS templates
├── routes/               # Express routes
├── public/               # Static assets (if any)
├── models/               # DB models
├── node_modules/         # Installed packages
└── package.json          # Project metadata and dependencies
```

---

## 📄 License

This project is licensed under the MIT License.

