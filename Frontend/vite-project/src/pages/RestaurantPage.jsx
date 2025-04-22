import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard';
import './RestaurantPage.css';

const RestaurantPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false); // Add dark mode state

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/restaurants`)
      .then(res => {
        setRestaurants(res.data);
        setFilteredRestaurants(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const filtered = restaurants.filter(r =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  }, [searchTerm, restaurants]);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  // const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
  
    if (newDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <div className={`restaurant-page container my-5 ${isDarkMode ? 'dark' : ''}`}>
      <h1 className={`page-title text-center mb-4 ${isDarkMode ? 'text-white' : ''}`}>
        🍽️ Explore Restaurants
      </h1>

      {/* 🔍 Search Input */}
      <div className="search-container mb-4 text-center">
        <input
          type="text"
          placeholder="Search restaurants..."
          className="search-input"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {filteredRestaurants.map(r => (
          <div className="col" key={r._id}>
            <RestaurantCard restaurant={r} />
          </div>
        ))}
      </div>

      {/* Dark Mode Toggle Button */}
      {/* <button
        className="btn btn-dark"
        onClick={toggleDarkMode}
        style={{ position: 'fixed', top: '10px', right: '10px' }}
      >
        Toggle Dark Mode
      </button> */}
    </div>
  );
};

export default RestaurantPage;



