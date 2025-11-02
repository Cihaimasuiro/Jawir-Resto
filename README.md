# 🍜 Jawir Resto (Full-Stack Edition)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

"Jawir Resto" is a full-stack restaurant website developed as a college project. What started as a static front-end has been refactored into a complete client-server application.

It features a responsive front-end built with vanilla JavaScript and a custom-built, secure REST API backend powered by Node.js, Express, and MongoDB. The backend handles user registration, login (with JWT authentication), and a live, persistent comment section.

---

## 🏗️ Project Architecture

This project is a **monorepo**, meaning both the front-end (`client`) and back-end (`server`) code live in the same repository, but are run as separate applications.

* **`client/`**: A static website (HTML, CSS, JS) that runs in the browser. It makes API requests to the server.
* **`server/`**: A Node.js & Express API that connects to a MongoDB database. It handles all logic and data.



---

## ✨ Key Features

* **Full User Authentication:** Custom-built signup and signin logic.
* **Password Hashing:** Uses `bcryptjs` to securely hash and salt user passwords.
* **JSON Web Token (JWT) Security:** Protected API routes using JWTs, which are generated on login and sent with requests.
* **Full-Stack Commenting:** Logged-in users can post comments, which are saved to the database and fetched in real-time.
* **Database Integration:** Uses **Mongoose** for elegant, schema-based modeling of `User` and `Comment` data in MongoDB.
* **Responsive Design:** The client-side is fully responsive for mobile, tablet, and desktop.
* **Professional Code Structure:**
    * **Backend:** Follows an MVC-style pattern (Models, Routes, Controllers, Middleware).
    * **Frontend:** Clean separation of HTML, CSS, and JavaScript files.

---

## 💻 Tech Stack

### 🚀 Backend (Server)

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (with Mongoose)
* **Authentication:** `jsonwebtoken` (JWT) for tokens, `bcryptjs` for password hashing.
* **Utilities:** `cors` (for cross-origin requests), `dotenv` (for secret management), `nodemon` (for auto-restarting the server).

### 🎨 Frontend (Client)

* **Core:** HTML5, CSS3
* **Logic:** Vanilla JavaScript (ES6+)
* **API Calls:** `Fetch API` with `async/await`
* **Icons:** FontAwesome
* **Fonts:** Google Fonts (Poppins)

---

## ⚙️ How to Run Locally

### Prerequisites

1.  **Node.js:** Download and install from [nodejs.org](https://nodejs.org/).
2.  **MongoDB:** You need a database.
    * **Recommended:** A free cluster from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) (Cloud).
    * **Alternatively:** Install [MongoDB Community Server](https://www.mongodb.com/try/download/community) (Local).
3.  **VS Code Live Server:** (Or any local server for the client).
4.  **Laragon** (optional, as you have it) can be used to manage your terminal and environment.

### Step 1: Clone the Repository

```bash
git clone [https://github.com/Cihaimasuiro/Jawir-Resto.git](https://github.com/Cihaimasuiro/Jawir-Resto.git)
cd Jawir-Resto
````

### Step 2: Set Up the Backend (Server)

1.  Navigate to the server directory:

    ```bash
    cd server
    ```

2.  Install all required npm packages:

    ```bash
    npm install
    ```

3.  Create a secret `.env` file in the `server/` folder. (This file is ignored by Git).

    ```.env
    # Server Port
    PORT=3000

    # MongoDB Connection String (Paste your Atlas string here)
    MONGODB_URI=mongodb+srv://<username>:<password>@your-cluster.mongodb.net/jawir-resto?appName=your-app

    # JSON Web Token Secret (Change this to a long random string)
    JWT_SECRET=mySuperSecretKey123!
    ```

4.  Start the backend server:

    ```bash
    npm run dev
    ```

    The server is now running at `http://localhost:3000`.

### Step 3: Set Up the Frontend (Client)

1.  Open a **new, separate terminal**.

2.  Navigate to the client directory:

    ```bash
    cd client
    ```

3.  **Crucial Step:** Open `client/js/config.js` and make sure it points to your local server:

    ```javascript
    const API_BASE_URL = "http://localhost:3000/api";
    ```

4.  Start your front-end. The easiest way is using the **VS Code Live Server** extension (right-click `index.html` and "Open with Live Server").

Your site is now running (e.g., at `http://127.0.0.1:5500`), and it is fully connected to your local backend.

-----

## 🔌 API Endpoints

The server provides the following REST API endpoints:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/users/signup` | Registers a new user. |
| `POST` | `/api/users/signin` | Logs in an existing user and returns a JWT. |
| `POST` | `/api/comments` | **(Protected)** Adds a new comment to the database. |
| `GET` | `/api/website_comments/:id` | **(Protected)** Fetches all comments for a website. |

-----

## 🙏 Credits & Acknowledgements

  * **Original Project:** Forked from the original work by **[Kezume](https://github.com/Kezume/Jawir-Resto)**.
  * **Refactored by:** **[Cihaimasuiro](https://github.com/Cihaimasuiro)**.

<!-- end list -->

```
```
