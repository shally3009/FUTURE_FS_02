// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./routes/Home.jsx";
import ProductDetail from "./routes/ProductDetail.jsx";
import CartPage from "./routes/CartPage.jsx";
import CheckoutPage from "./routes/CheckoutPage.jsx";
import AdminPage from "./routes/AdminPage.jsx";
import OrdersPage from "./routes/OrdersPage.jsx";
import LoginPage from "./routes/LoginPage.jsx";
import RegisterPage from "./routes/RegisterPage.jsx";
import MyOrdersPage from "./routes/MyOrdersPage.jsx"; 

export default function App() {
  return (
   <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/orders" element={<OrdersPage />} />      {/* admin */}
        <Route path="/my-orders" element={<MyOrdersPage />} /> {/* user */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Layout>
  );
}
