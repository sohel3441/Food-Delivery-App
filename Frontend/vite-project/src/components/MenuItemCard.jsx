import React from 'react';
import { useCart } from '../context/CartContext';
import './MenuItemCard.css'; // 💡 Link to the CSS below

const MenuItemCard = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <div className="menu-card">
      <img src={item.image} alt={item.name} className="menu-card-img" />
      <div className="menu-card-body">
        <h5 className="menu-card-title">{item.name}</h5>
        <p className="menu-card-desc">{item.description}</p>
        <div className="menu-card-footer">
          <span className="menu-card-price">₹{item.price}</span>
          <button className="menu-add-btn" onClick={() => addToCart(item)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
