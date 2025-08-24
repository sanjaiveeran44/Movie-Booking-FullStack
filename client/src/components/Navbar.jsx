import React from "react";
import "./Navbar.css";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo">
        Night<span> Show</span>
      </div>

      {/* 🔹 Nav Links */}
      <nav className="nav-links">
        <button>Home</button>
        <button>Favourites</button>
        <button>My Booking</button>
      </nav>

      {/* 🔹 Search + Login */}
      <div className="right-section">
        <FiSearch className="search-icon" />
        <button className="login-btn">Login</button>
      </div>
    </header>
  );
};

export default Navbar;
