# Conversational News Bot – Fullstack POC

A small full-stack prototype of a **conversational news assistant**.

The goal of this project is to demonstrate:

- a simple **Python backend** that exposes a `/chat` API endpoint,
- a **React SPA frontend** with a chat-like UI,
- a mocked AI/RAG service with a **1 second delay** and hard-coded news articles.

## Features

- **Chat-style interface** similar to modern AI chats
  - User messages on the **right**
  - Assistant messages on the **left**
  - Role labels: **YOU / ASSISTANT**

- **“AI is thinking…” loading state**
  - After sending a message, the user sees a small bubble with a spinner
  - Once the backend responds, the message appears and the loading bubble disappears

-  **Mocked news sources**
  - Backend responds with a short answer and two CNN links:
    - Black hole flare article
    - Asteroid / Moon impact article

- **Simple mocked AI logic**
  - `hello`, `hi`, `ahoj` → friendly greeting from the assistant  
  - `latest news` / `news` → assistant explains it will show mocked news  
  - anything else → generic “mocked answer for your question”


## Tech Stack

**Backend**

- Python
- Flask
- Flask-CORS

**Frontend**

- React (Vite)
- Material UI (MUI)
- Plain fetch API for HTTP calls

# Backend Setup (Flask)

From the project root:

cd backend  

# Install dependencies:

pip install flask flask-cors

# Run the backend:

python app.py

The API is now available at: http://localhost:5000/chat.

# Frontend Setup (React + Vite + MUI)

From the project root:

cd frontend

Install dependencies:

npm install
if not yet installed in this project:
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material

Run the dev server:

npm run dev

Open the URL printed in the terminal (usually http://localhost:5173).
