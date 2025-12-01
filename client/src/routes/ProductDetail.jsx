import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../api/products.js";
import { useCart } from "../context/CartContext.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProduct(id);
        setProduct(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      <img
        src={product.image}
        alt={product.title}
        className="h-56 md:h-80 object-contain mx-auto w-full"
      />
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p className="text-gray-500 text-sm">{product.category}</p>
        <p className="text-lg font-bold">${product.price}</p>
        <p className="text-sm text-gray-700">{product.description}</p>
        <button
          onClick={() => addToCart(product)}
          className="px-4 py-2 rounded-full bg-black text-white"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}