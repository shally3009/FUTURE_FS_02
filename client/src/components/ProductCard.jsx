import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col h-full">
      <Link to={`/product/${product._id}`} className="flex-1 flex flex-col">
        <img
          src={product.image}
          alt={product.title}
          className="h-36 sm:h-40 md:h-48 object-contain mb-3 w-full"
        />
        <h3 className="font-medium text-sm sm:text-base line-clamp-2 mb-2">
          {product.title}
        </h3>
      </Link>
      <div className="flex items-center justify-between mt-auto">
        <span className="font-semibold text-sm sm:text-base">${product.price}</span>
        <button
          onClick={() => addToCart(product)}
          className="text-sm sm:text-sm px-2 sm:px-3 py-1 rounded-full border hover:bg-gray-100"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}