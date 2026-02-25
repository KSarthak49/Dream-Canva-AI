# DreamCanvas

DreamCanvas is an AI-powered image generation application. It consists of a React (Vite) frontend and a Node.js (Express) backend that integrates with the Google Gemini API to generate images.

## Features

- **Frontend**: Built with React, Vite, and Tailwind CSS.
- **Backend**: Built with Node.js, Express, and MongoDB.
- **AI Image Generation**: Uses Google's Gemini API for prompt-based image creation.
- **User Authentication**: Secure login and signup with JWT (JSON Web Tokens).

## Prerequisites

Before running the project, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local or MongoDB Atlas)
- A Google Gemini API Key

---

## 🚀 Setting Up the Backend

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file inside the `backend` directory with the following variables:
   ```env
   PORT=4000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Start the backend development server:**
   ```bash
   npm run dev
   ```
   The backend server will start on `http://localhost:4000`.

---

## 🎨 Setting Up the Frontend

1. **Navigate to the frontend (root) directory:**
   Open a new terminal window/tab and ensure you are in the project's root folder (`DreamCanvas-main`).

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory (using `.env.example` as a reference):
   ```env
   VITE_BACKEND_URL="http://localhost:4000"
   VITE_RAZORPAY_KEY_ID="your_razorpay_key_if_applicable"
   ```

4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   The frontend will be accessible at `http://localhost:5173` (or the port Vite provides in your terminal).

---

## Usage

1. Open your browser and navigate to the Vite frontend URL.
2. Sign up for a new account or log in with existing credentials.
3. Access the Image Generation page to create AI artwork using text prompts!
