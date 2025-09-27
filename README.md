# Blog App  

A simple and responsive **React-based Blog Application** where users can view and manage blog posts. Built with **React, Vite, Node.js, and MongoDB**.  

---

## Features
- View all blog posts with pagination  
- Create, edit, and delete blog posts  
- Responsive UI for mobile & desktop  
- REST API integration with backend  
- Fast development powered by Vite  

---

## Tech Stack
- **Frontend:** React, Vite, TailwindCSS  
- **Backend:** Node.js + Express + firebase
- **Database:** MongoDB (Mongoose)  
- **Version Control:** Git & GitHub  

---

## Installation & Setup

### 1️Clone the repository
```bash
git clone https://github.com/harsh4514a/Blog_App.git
cd Blog_App
```

### 2️ Install dependencies
```bash
npm install
```

### 3️ Start development server
```bash
npm run dev
```
Your app will run at: **http://localhost:5173/**  

---

## API Endpoints (Backend Integration)
- `GET /api/blog/get-all-blogs?limit=9` → Fetch all blogs (paginated)  
- `POST /api/blog/create` → Create new blog post  
- `PUT /api/blog/update/:id` → Update blog post  
- `DELETE /api/blog/delete/:id` → Delete blog post  

---

## Project Structure
```
Blog_App/
 ┣ src/
 ┃ ┣ components/      # Reusable UI components
 ┃ ┣ pages/           # Page-level components
 ┃ ┣ App.jsx          # Root component
 ┃ ┣ main.jsx         # Entry point
 ┣ public/            # Static assets
 ┣ package.json
 ┣ vite.config.js
 ┣ README.md
```
