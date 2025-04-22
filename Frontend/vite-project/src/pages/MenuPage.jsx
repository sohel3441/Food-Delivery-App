import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MenuItemCard from '../components/MenuItemCard';

const MenuPage = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/menu/${id}`)
      .then(res => setMenu(res.data))
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">MeNus</h1>
        <button className="btn btn-outline-primary" onClick={() => navigate('/cart')}>
          🛒 Go to Cart
        </button>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {menu.map(item => (
          <div className="col" key={item._id}>
            <MenuItemCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
