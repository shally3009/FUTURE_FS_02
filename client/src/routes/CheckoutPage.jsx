import { useCart } from "../context/CartContext.jsx";
import CheckoutForm from "../components/CheckoutForm.jsx";

export default function CheckoutPage() {
  const { items } = useCart();

  if (items.length === 0) {
    return <p>Your cart is empty. Add items before checkout.</p>;
  }

  return (
    <div className="max-w-xl mx-auto">
      <CheckoutForm />
    </div>
  );
}