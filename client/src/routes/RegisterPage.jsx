import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form);
      navigate("/"); // logged in; go home
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-xl p-6 sm:p-8 shadow-sm space-y-4">
      <h1 className="text-xl font-semibold text-center">Create Account</h1>

      {error && (
        <p className="text-sm text-red-500 text-center">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm font-medium">Name</label>
          <input
            className="w-full border rounded px-3 py-2 text-sm"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2 text-sm"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2 text-sm"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 rounded-full bg-black text-white text-sm disabled:opacity-60"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-xs text-center text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="underline">
          Login
        </Link>
      </p>
    </div>
  );
}