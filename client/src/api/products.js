const BASE_URL = " https://future-fs-02-4-js4y.onrender.com/api";

export async function fetchProducts({ search = "", category = "all" } = {}) {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (category && category !== "all") params.append("category", category);

  const res = await fetch(`${BASE_URL}/products?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProduct(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function createProduct(product) {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Create product error:", res.status, errorText);
    throw new Error("Failed to create product");
  }
  return res.json();
}

// 👇 NEW: update product
export async function updateProduct(id, product) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Update product error:", res.status, errorText);
    throw new Error("Failed to update product");
  }
  return res.json();
}

// 👇 NEW: delete product
export async function deleteProduct(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Delete product error:", res.status, errorText);
    throw new Error("Failed to delete product");
  }
  return res.json();
}
