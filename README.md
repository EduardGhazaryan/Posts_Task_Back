# API Backend

This is the **backend** for the Next.js client project, built with **Node.js, Express, and MySQL (Sequelize ORM)**. It provides a RESTful API for handling user authentication, blog posts, and other related features.

## Features

- **Node.js & Express** for building a fast and scalable backend
- **MySQL & Sequelize ORM** for database management
- **JWT Authentication** for secure user authentication
- **Joi** for request validation
- **Bcrypt.js** for password hashing
- **CORS** enabled for cross-origin requests
- **dotenv** for environment variable management

## Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=8008

DB_PORT=3306
DB_HOST='your_host'
DB_USER='your_user'
DB_PASSWORD='your_password'
DB_NAME='blogs'

ACCESS_TOKEN="7bb6e02b3f2aa244a69cf9afc3335bf6473e1f9263c8c8472e2cf3d55cfff947ee93a332b24c46476b586f785d1e17e727b812299528ab8e689cf2b8d7e73146"
