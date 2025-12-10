const BASE_URL = `https://future-fs-02-5-e3n3.onrender.com/api/`;

export async function createOrder(orderData, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers,
    body: JSON.stringify(orderData),
  });

  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { message: text };
  }

  if (!res.ok) {
    console.error("Create order error:", res.status, data);
    throw new Error(data.message || "Failed to place order");
  }

  return data;
}

// admin – all orders
export async function fetchOrders(token) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/orders`, { headers });
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { message: text };
  }

  if (!res.ok) {
    console.error("Fetch orders error:", res.status, data);
    throw new Error(data.message || "Failed to fetch orders");
  }

  return data;
}

// 👇 NEW: user – only their orders
export async function fetchMyOrders(token) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/orders/my`, { headers });
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { message: text };
  }

  if (!res.ok) {
    console.error("Fetch my orders error:", res.status, data);
    throw new Error(data.message || "Failed to fetch your orders");
  }

  return data;
}
