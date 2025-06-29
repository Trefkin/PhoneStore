"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; 

export default function Header() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const userData = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (token && userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <header className="bg-white shadow mb-6">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-700">
          Medyanes360
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/" className="hover:text-blue-600 font-medium">
            Mağaza
          </Link>
          {user ? (
            <>
              <Link href="/create" className="hover:text-blue-600 font-medium">
                Telefon əlavə et
              </Link>
              <span className="text-gray-600 text-sm mr-2">{user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Çıxış
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-600 font-medium">
                Daxil ol
              </Link>
              <Link href="/register" className="hover:text-blue-600 font-medium">
                Qeydiyyat
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <nav className="flex flex-col gap-3">
            <Link href="/" className="hover:text-blue-600 font-medium">
              Mağaza
            </Link>
            {user ? (
              <>
                <Link href="/create" className="hover:text-blue-600 font-medium">
                  Telefon əlavə et
                </Link>
                <span className="text-gray-600 text-sm">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Çıxış
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-blue-600 font-medium">
                  Daxil ol
                </Link>
                <Link href="/register" className="hover:text-blue-600 font-medium">
                  Qeydiyyat
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
