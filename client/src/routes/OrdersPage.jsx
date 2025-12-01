// src/routes/OrdersPage.jsx
import { useEffect, useState } from "react";
import { fetchOrders } from "../api/orders.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function OrdersPage() {
  const { token, isAuthenticated, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadOrders() {
    if (!token) return; // nothing to do yet
    setLoading(true);
    setError("");
    try {
      const data = await fetchOrders(token);   // 👈 pass token
      setOrders(data);
    } catch (e) {
      console.error(e);
      setError(e.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, token]);

  if (!isAuthenticated) {
    return <p className="text-sm text-gray-600">Please login to view orders.</p>;
  }

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-sm text-red-500">{error}</p>;

  if (orders.length === 0) {
    return <p className="text-sm text-gray-500">No orders yet.</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">
        All Orders {user?.role === "admin" ? "(Admin)" : ""}
      </h1>
      <div className="space-y-3">
        {orders.map(order => (
          <div
            key={order._id}
            className="bg-white rounded-xl p-4 shadow-sm space-y-2"
          >
            {/* same UI as before */}
          </div>
        ))}
      </div>
    </div>
  );
}