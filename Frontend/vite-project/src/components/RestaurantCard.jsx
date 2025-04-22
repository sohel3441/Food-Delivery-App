import React from "react";
import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant._id}`} className="text-decoration-none">
      <div className="card h-100 shadow-sm border-0 bg-transparent">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="card-img-top"
          style={{ height: "160px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title text-truncate">{restaurant.name}</h5>



          <p className="card-text fw-semibold cuisine-text">
            {restaurant.cuisine}
          </p>

          <p className="card-text text-warning small">
            <i className="bi bi-star-fill"></i> {restaurant.rating}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;





