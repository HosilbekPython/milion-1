import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  ShoppingBagIcon,
  ClockIcon,
  ShoppingCartIcon,
  UserIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  XMarkIcon, // ❌ Close icon
} from "@heroicons/react/24/solid";
import logo from "../assets/logo.svg";

function Layout({ children }) {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white p-2 md:p-4 flex flex-col md:flex-row justify-between items-center shadow-lg relative">
        {/* Logo + Navigatsiya */}
        <div className="flex w-full justify-between items-center">
          <img src={logo} alt="Logo" className="h-10 md:h-12" />

          {/* Katta ekranlar uchun Navbar */}
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="hover:text-gray-400 transition">Home</Link>
            <Link to="/browse" className="hover:text-gray-400 transition">Browse</Link>
            <Link to="/store" className="hover:text-gray-400 transition">Store</Link>
            <Link to="/order" className="hover:text-gray-400 transition">Orders</Link>
            <Link to="/profile" className="hover:text-gray-400 transition">Profile</Link>
          </nav>

          {/* Katta ekranlar uchun qidiruv va tugmalar */}
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/likes">
              <HeartIcon className="h-6 w-6 text-red-500 hover:text-red-700 transition" />
            </Link>
            <Link to="/cart">
              <ShoppingCartIcon className="h-6 w-6 text-white hover:text-gray-400 transition" />
            </Link>
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-300 text-gray-900 px-3 py-2 rounded-full shadow-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 w-60"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Mobil uchun tugmalar */}
          <div className="flex gap-4 md:hidden items-center">
            <Link to="/likes">
              <HeartIcon className="h-6 w-6 text-red-500 hover:text-red-700 transition" />
            </Link>
            <Link to="/cart">
              <ShoppingCartIcon className="h-6 w-6 text-white hover:text-gray-400 transition" />
            </Link>
            <MagnifyingGlassIcon
              className="h-6 w-6 text-white cursor-pointer hover:text-gray-400 transition"
              onClick={() => setSearchVisible(true)}
            />
          </div>
        </div>

        {/* Mobil ekranda qidiruv inputi */}
        {searchVisible && (
          <div className="absolute top-full left-0 w-full bg-white p-3 flex items-center gap-2 shadow-md md:hidden">
            <input
              type="text"
              placeholder="Mahsulot qidirish..."
              className="w-full p-2 border rounded-md focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <XMarkIcon
              className="h-6 w-6 text-gray-700 cursor-pointer"
              onClick={() => setSearchVisible(false)}
            />
          </div>
        )}
      </header>

      {/* Kontent */}
      <main className="flex-grow p-4">{children}</main>

      {/* Mobil uchun pastki navbar */}
      <nav className="fixed bottom-0 w-full bg-gray-800 text-white flex justify-around items-center p-2 shadow-lg border-t border-gray-700 md:hidden">
        <Link to="/" className="flex flex-col items-center hover:text-gray-400 transition">
          <HomeIcon className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </Link>
        <Link to="/browse" className="flex flex-col items-center hover:text-gray-400 transition">
          <ShoppingBagIcon className="h-6 w-6" />
          <span className="text-xs">Browse</span>
        </Link>
        <Link to="/store" className="flex flex-col items-center hover:text-gray-400 transition">
          <ShoppingCartIcon className="h-6 w-6" />
          <span className="text-xs">Store</span>
        </Link>
        <Link to="/order" className="flex flex-col items-center hover:text-gray-400 transition">
          <ClockIcon className="h-6 w-6" />
          <span className="text-xs">Orders</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center hover:text-gray-400 transition">
          <UserIcon className="h-6 w-6" />
          <span className="text-xs">Profile</span>
        </Link>
      </nav>
    </div>
  );
}

export default Layout;
