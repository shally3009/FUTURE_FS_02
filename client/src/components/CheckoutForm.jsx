import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../api/orders.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function CheckoutForm() {
  const { items, totalPrice, clearCart } = useCart();
  const { token, isAuthenticated } = useAuth();          // 👈 get auth
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    cardNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const errs = {};
    if (!form.name) errs.name = "Name is required";
    if (!form.email || !form.email.includes("@"))
      errs.email = "Valid email is required";
    if (!form.address) errs.address = "Address is required";
    if (!form.cardNumber || form.cardNumber.length < 12)
      errs.cardNumber = "Card number must be at least 12 digits";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    if (!isAuthenticated) {
      alert("Please login before placing an order.");
      navigate("/login");
      return;
    }

    setSubmitting(true);
    try {
      await createOrder(
        {
          customerName: form.name,
          customerEmail: form.email,
          address: form.address,
          items: items.map(i => ({
            productId: i._id,
            title: i.title,
            price: i.price,
            quantity: i.quantity,
            image: i.image,
          })),
          totalPrice,
        },
        token // 👈 pass JWT token
      );

      clearCart();
      navigate("/?order=success");
    } catch (err) {
      console.error(err);
      alert(err.message || "Error placing order");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white rounded-xl p-4 shadow-sm"
    >
      <h2 className="font-semibold text-lg mb-2">Checkout</h2>
      <p className="text-sm text-gray-600 mb-4">
        You will pay{" "}
        <span className="font-semibold">${totalPrice.toFixed(2)}</span> on
        delivery.
      </p>

      {["name", "email", "address", "cardNumber"].map(field => (
        <div key={field} className="space-y-1">
          <label className="text-sm font-medium capitalize">
            {field === "cardNumber" ? "Card Number" : field}
          </label>
          <input
            type={field === "email" ? "email" : "text"}
            value={form[field]}
            onChange={e => setForm({ ...form, [field]: e.target.value })}
            className="w-full border rounded px-3 py-2 text-sm"
          />
          {errors[field] && (
            <p className="text-xs text-red-500">{errors[field]}</p>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={submitting}
        className="w-full px-4 py-2 rounded-full bg-black text-white text-sm disabled:opacity-60"
      >
        {submitting ? "Placing order..." : "Place Order"}
      </button>
    </form>
  );
}