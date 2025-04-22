import React from "react";
import { useCart } from "../context/CartContext";
import CheckoutButton from "../components/CheckoutButton";
import { useNavigate } from "react-router-dom";
import "./CartPage.css"; // 👈 Import the custom CSS

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const handleChange = (id, value) => {
    const quantity = parseInt(value);
    if (quantity >= 1) updateQuantity(id, quantity);
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="cart-title">🛒 Your Cart</h2>
        <button className="btn btn-outline-light go-home-btn" onClick={() => navigate("/restaurant")}>
          ⬅ Go to Restaurants
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart-message">Your cart is empty.</div>
      ) : (
        <>
          <div className="table-responsive glassy-table">
            <table className="table table-hover table-borderless text-white align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img src={item.image} alt={item.name} width="60" height="40" className="rounded" />
                    </td>
                    <td>{item.name}</td>
                    <td>
                      <input
                        type="number"
                        className="form-control quantity-input"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleChange(item._id, e.target.value)}
                      />
                    </td>
                    <td>₹{item.price}</td>
                    <td>₹{item.price * item.quantity}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeFromCart(item._id)}
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-end mt-4">
            <h4 className="text-light">Total: ₹{totalAmount}</h4>
            <CheckoutButton amount={totalAmount} onSuccess={clearCart} />
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
