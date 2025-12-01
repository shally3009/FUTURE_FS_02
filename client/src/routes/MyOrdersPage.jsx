import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { fetchMyOrders } from "../api/orders.js";

export default function MyOrdersPage() {
  const { token, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      if (!token) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError("");
      try {
        const data = await fetchMyOrders(token);
        setOrders(data);
      } catch (e) {
        console.error(e);
        setError(e.message || "Failed to load your orders");
      } finally {
        setLoading(false);
      }
    }
    if (isAuthenticated) {
      load();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, token]);

  if (!isAuthenticated) {
    return <p className="text-sm text-gray-600">Please login to view your orders.</p>;
  }

  if (loading) return <p>Loading your orders...</p>;
  if (error) return <p className="text-sm text-red-500">{error}</p>;

  if (orders.length === 0) {
    return <p className="text-sm text-gray-500">You have no orders yet.</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">My Orders</h1>
      <div className="space-y-3">
        {orders.map(order => (
          <div
            key={order._id}
            className="bg-white rounded-xl p-4 shadow-sm space-y-2"
          >
            <div className="flex flex-wrap justify-between gap-2 text-sm">
              <div>
                <p className="font-medium">{order.customerName}</p>
                <p className="text-gray-500 text-xs">{order.customerEmail}</p>
              </div>
              <div className="text-right text-sm">
                <p className="font-semibold">
                  ${order.totalPrice?.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-600">
              Address: {order.address}
            </p>

            <div className="border-t pt-2 space-y-1">
              {order.items.map(item => (
                <div
                  key={item._id}
                  className="flex justify-between text-xs text-gray-700"
                >
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
              {order.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
