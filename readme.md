# 🔗 Snip.ly - URL Shortener with Authentication

A modern, full-stack URL shortening service with user authentication, real-time analytics, and a beautiful responsive UI.

![Snip.ly Banner](https://via.placeholder.com/1200x300/3B82F6/FFFFFF?text=Snip.ly+-+Shorten+Links+in+a+Snap)

## ✨ Features

### 🔐 Authentication & Security
- User registration with email validation
- Secure login with JWT authentication
- Password strength validation with real-time feedback
- Password requirements: 8+ chars, uppercase, lowercase, numbers, special characters
- bcrypt password hashing (10 rounds)
- Input sanitization to prevent XSS attacks
- Email normalization for consistent data

### 🔗 Link Management
- Create shortened URLs with collision-resistant 8-character IDs
- Auto URL normalization (adds http:// if missing)
- View all your created links in a dashboard
- Delete links with confirmation dialog
- Copy short URLs to clipboard with one click

### 📊 Analytics & Tracking
- Real-time click tracking
- Auto-refresh every 5 seconds when tab is visible
- Animated click counter with green pulse on updates
- Total links and total clicks displayed in navbar
- Timestamp showing when each link was created ("14h ago", etc.)

### 🎨 User Experience
- Beautiful, responsive UI with Tailwind CSS
- IST timezone-aware greetings (Good morning/afternoon/evening)
- Loading states and error handling
- Success toast notifications
- Empty state with friendly messaging
- Password strength indicator with visual feedback
- Mobile-responsive design

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Vite** - Build tool & dev server
- **Custom Hooks** - Reusable logic

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **validator.js** - Input validation
- **nanoid** - Short URL generation

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** v16 or higher
- **MongoDB** (local installation or Atlas account)
- **npm** or **yarn**

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/snip-ly.git
cd snip-ly
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in the backend folder:

```env
MONGO_URI=mongodb://localhost:27017/linkshortener
JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters_long
PORT=3000
SHORT_DOMAIN=http://localhost:3000
NODE_ENV=development
```

Start the backend server:

```bash
npm run dev
```

Backend runs on `http://localhost:3000` ✅

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file in the frontend folder (optional):

```env
VITE_SHORT_DOMAIN=http://localhost:3000
```

Start the frontend development server:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173` ✅

### 4️⃣ Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

---