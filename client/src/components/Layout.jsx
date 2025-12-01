import Navbar from "./Navbar.jsx";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6">
        {children}
      </main>
      <footer className="border-t py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} EchoMart
      </footer>
    </div>
  );
}