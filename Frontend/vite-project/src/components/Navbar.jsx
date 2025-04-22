import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className={`glassy-navbar ${darkMode ? 'dark' : ''}`}>
      <div className="navbar-container">
        {/* Left: Brand */}
        <div className="brand-left">
          <Link className="brand" to="/">🍔 China-Town</Link> 
        </div>

        {/* Right: Links */}
        <div className="navbar-links">
          <Link to="/cart" className="nav-btn">🛒 Cart</Link>
          {isLoggedIn ? (
            <button className="nav-btn" onClick={handleLogout}>🚪 Logout</button>
          ) : (
            <Link to="/login" className="nav-btn">🔐 Login</Link>
          )}
          <button className="theme-toggle" onClick={toggleTheme}>
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
