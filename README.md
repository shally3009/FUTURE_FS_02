# FUTURE_FS_02
### 🛒 Mini E‑Commerce Storefront — Early Build (Before Role Separation)

Full‑stack mini e‑commerce web app built using MERN stack for Future Interns Full Stack Web Development Internship – Task 2.This README covers the version before roles (user/admin) were separated, meaning all authenticated users could access product management and orders.

### 🌟 Features (Before Role Separation)
🏬 Storefront & UI

Product listing page

Product details page

Responsive layout with TailwindCSS

Search products

Category filtering

Fast UI with React + Vite

🛒 Cart System

Add to cart

Remove from cart

Update quantity

Cart total auto‑updates

Cart stored via Context API

🔐 Authentication (No role separation yet)

Register & Login using JWT

Login persisted using localStorage

Users could access admin/product/order pages without restriction

### 📦 Orders (Initial Version)
Checkout form submission

Orders stored in MongoDB

Orders page visible for all logged users (no admin filter)

Anyone could view all orders

### 🛠 Tech Stack
LayerToolsFrontendReact + ViteStylingTailwind CSS v4.1StateContext APIRoutingReact 
RouterBackendNode.js + ExpressDatabaseMongoDB + MongooseAuthJWT + bcrypt

## 📁 Project Structure (Before Role Split)
FUTURE_FS_02/ │ ├── client/ │ ├── src/ │ │ ├── api/ │ │ │ ├── products.js │ │ │ ├── orders.js │ │ │ └── auth.js │ │ ├── components/ │ │ │ ├── Navbar.jsx │ │ │ ├── ProductCard.jsx │ │ │ └── Layout.jsx │ │ ├── context/ │ │ │ ├── AuthContext.jsx │ │ │ └── CartContext.jsx │ │ ├── routes/ │ │ │ ├── Home.jsx │ │ │ ├── ProductDetail.jsx │ │ │ ├── CartPage.jsx │ │ │ ├── CheckoutPage.jsx │ │ │ ├── OrdersPage.jsx ← All users could access │ │ │ ├── AdminPage.jsx ← No admin restriction │ │ │ ├── LoginPage.jsx │ │ │ └── RegisterPage.jsx │ │ ├── App.jsx │ │ └── main.jsx │ └── index.css │ └── server/ ├── models/ │ ├── Product.js │ ├── Order.js │ └── User.js ├── routes/ │ ├── auth.js ← Register / Login only │ ├── products.js ← CRUD accessible to all logged users │ └── orders.js ← All orders visible to any user ├── middleware/ │ └── auth.js ← No admin logic yet ├── server.js └── .env

### 🔧 Setup Guide
Backend
cd server npm install npm run dev

server/.env (initial version)

PORT = 3050
MONGO_URI = mongodb+srv://Shally:Shally@miniecommerce.iifk2cp.mongodb.net/ecommerce_db?appName=Miniecommerce
JWT_SECRET = JWT_SECRET

Frontend
cd client npm install npm run dev

