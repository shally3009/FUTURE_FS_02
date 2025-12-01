// src/routes/CartPage.jsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import CartSummary from "../components/CartSummary.jsx";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center space-y-4">
        <p>Your cart is empty.</p>
        <Link to="/" className="underline">
          Go shop now
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
      <div className="space-y-4">
        {items.map(item => (
          <div
            key={item._id}
            className="flex gap-4 items-center bg-white rounded-xl p-3 shadow-sm"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-12 w-12 sm:h-16 sm:w-16 object-contain"
            />
            <div className="flex-1">
              <p className="text-sm font-medium line-clamp-1">
                {item.title}
              </p>
              <p className="text-sm text-gray-500">${item.price}</p>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-xs text-red-500 mt-1"
              >
                Remove
              </button>
            </div>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={e =>
                updateQuantity(
                  item._id,
                  Math.max(1, Number(e.target.value))
                )
              }
              className="w-16 border rounded px-2 py-1 text-sm"
            />
            <p className="w-20 text-right text-sm font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* 👉 This is now the separate component */}
      <CartSummary />
    </div>
  );
}