import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-3 gap-3 sm:gap-0">
        <Link to="/" className="text-xl font-bold">
          EchoMart
        </Link>
        <nav className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm">
          <Link to="/" className="hover:underline">
            Products
          </Link>
            {/* Admin all orders link – only for admin */}
             {user?.role === "admin" && (
            <Link to="/orders" className="hover:underline">
            All Orders
            </Link>
        )}

        {/* My Orders – for any logged-in user */}
        {isAuthenticated && (
            <Link to="/my-orders" className="hover:underline">
            My Orders
            </Link>
        )} 
          <Link to="/admin" className="hover:underline">
            Admin
          </Link>
          <Link to="/orders" className="hover:underline">
            Orders
          </Link>

          {isAuthenticated ? (
            <>
              <span className="text-xs text-gray-600">
                Hi, {user.name}
              </span>
              <button
                onClick={logout}
                className="text-xs border rounded-full px-3 py-1 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}

          <Link to="/cart" className="relative hover:underline">
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 text-xs bg-black text-white rounded-full px-1.5">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}