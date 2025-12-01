// src/routes/AdminPage.jsx
import { useState, useEffect } from "react";
import {
  createProduct,
  fetchProducts,
  updateProduct,
  deleteProduct,
} from "../api/products.js";

export default function AdminPage() {
  const emptyForm = {
    title: "",
    description: "",
    price: "",
    image: "",
    category: "",
    inStock: true,
  };

  const [form, setForm] = useState(emptyForm);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null); // null = create mode

  async function loadProducts() {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (e) {
      console.error(e);
      alert("Failed to load products");
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleEditClick(product) {
    setEditingId(product._id);
    setForm({
      title: product.title || "",
      description: product.description || "",
      price: product.price?.toString() ?? "",
      image: product.image || "",
      category: product.category || "",
      inStock: product.inStock ?? true,
    });
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
      };

      if (editingId) {
        await updateProduct(editingId, payload);
        alert("Product updated!");
      } else {
        await createProduct(payload);
        alert("Product added!");
      }

      resetForm();
      loadProducts();
    } catch (e) {
      console.error(e);
      alert(editingId ? "Failed to update product" : "Failed to add product");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const ok = window.confirm("Are you sure you want to delete this product?");
    if (!ok) return;
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p._id !== id)); // quick update
    } catch (e) {
      console.error(e);
      alert("Failed to delete product");
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-[1.2fr,1.8fr]">
      {/* ➕ Add / ✏ Edit Product Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-4 shadow-sm space-y-4"
      >
        <h1 className="text-lg font-semibold">
          {editingId ? "Edit Product" : "Add Product"}
        </h1>

        <div className="space-y-1">
          <label className="text-sm font-medium">Title</label>
          <input
            className="w-full border rounded px-3 py-2 text-sm"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2 text-sm"
            rows={3}
            value={form.description}
            onChange={e =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Price</label>
          <input
            type="number"
            step="0.01"
            className="w-full border rounded px-3 py-2 text-sm"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Image URL</label>
          <input
            className="w-full border rounded px-3 py-2 text-sm"
            value={form.image}
            onChange={e => setForm({ ...form, image: e.target.value })}
            placeholder="https://..."
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Category</label>
          <input
            className="w-full border rounded px-3 py-2 text-sm"
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="inStock"
            type="checkbox"
            checked={form.inStock}
            onChange={e =>
              setForm({ ...form, inStock: e.target.checked })
            }
          />
          <label htmlFor="inStock" className="text-sm">
            In stock
          </label>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2 rounded-full bg-black text-white text-sm disabled:opacity-60"
          >
            {loading
              ? editingId
                ? "Updating..."
                : "Saving..."
              : editingId
              ? "Update Product"
              : "Add Product"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 rounded-full border text-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* 📋 Product List with Edit/Delete */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Existing Products</h2>
        {products.length === 0 ? (
          <p className="text-sm text-gray-500">No products yet.</p>
        ) : (
          <div className="space-y-2 max-h-[450px] overflow-y-auto">
            {products.map(p => (
              <div
                key={p._id}
                className="flex items-center gap-3 bg-white rounded-lg p-2 shadow-sm"
              >
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-12 w-12 object-contain"
                  />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium">{p.title}</p>
                  <p className="text-xs text-gray-500">
                    {p.category || "No category"} · ${p.price}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    p.inStock
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {p.inStock ? "In stock" : "Out of stock"}
                </span>
                <div className="flex flex-col gap-1 ml-2">
                  <button
                    onClick={() => handleEditClick(p)}
                    className="text-xs px-2 py-1 rounded-full border hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-xs px-2 py-1 rounded-full border border-red-300 text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}