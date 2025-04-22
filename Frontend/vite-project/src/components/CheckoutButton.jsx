import React from 'react';
import axios from 'axios';

const CheckoutButton = ({ amount, onSuccess }) => {
  const loadRazorpay = async () => {
    try {
      const { data: order } = await axios.post(`${import.meta.env.VITE_APP_API_URL}/payment/create-order`, {  amount,});

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Food Ordering App",
        description: "Order Payment",
        order_id: order.id,
        handler: async function (response) {
          const verifyRes = await axios.post(`${import.meta.env.VITE_APP_API_URL}/payment/verify-payment`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            amount: order.amount / 100,
          });

          if (verifyRes.data.success) {
            alert('Payment Successful 🎉');
            if (onSuccess) onSuccess(); // ✅ Clear cart
          } else {
            alert('Payment Verification Failed ❌');
          }
        },
        theme: {
          color: "#1e40af",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <button className="btn btn-primary" onClick={loadRazorpay}>
      Pay ₹{amount}
    </button>
  );
};

export default CheckoutButton;

