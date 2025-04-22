// give the cartController that will handle the payment process and the cart management
import dotenv from "dotenv";
import Payment from "../models/payment.js";
import Razorpay from "razorpay";
import crypto from "crypto";
dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
  });

export const createOrder = async (req, res) => {
    const { amount } = req.body;
  
    const options = {
      amount: amount * 100, // amount in paise
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
    };
  
    try {
      const order = await razorpay.orders.create(options);
      res.status(200).json(order);
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      res.status(500).json({ error: 'Failed to create order', details: error });
    }
  };


  export const verifyPayment = async (req, res) => {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount
    } = req.body;
  
    const body = razorpay_order_id + "|" + razorpay_payment_id;
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");
  
    if (expectedSignature === razorpay_signature) {
      try {
        const payment = new Payment({
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
          amount: amount,
          currency: 'INR',
          status: 'success'
        });
  
        await payment.save(); // ✅ Fix is here
  
        res.status(200).json({ success: true, message: 'Payment verified and saved' });
      } catch (err) {
        console.error('Error saving payment:', err);
        res.status(500).json({ error: 'Payment verified but saving failed', details: err });
      }
    } else {
      res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  };




  
