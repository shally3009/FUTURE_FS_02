// src/components/CartSummary.jsx
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function CartSummary() {
  const { totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm h-fit space-y-3 w-full sm:max-w-sm">
      <h2 className="font-semibold text-lg">Order Summary</h2>

      <div className="flex justify-between text-sm sm:text-base">
        <span>Subtotal</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm sm:text-base">
        <span>Shipping</span>
        <span>Free</span>
      </div>

      <hr />

      <div className="flex justify-between font-semibold text-sm sm:text-base">
        <span>Total</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>

      <button
        onClick={() => navigate("/checkout")}
        className="w-full mt-2 px-4 py-2 rounded-full bg-black text-white text-sm sm:text-base"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}