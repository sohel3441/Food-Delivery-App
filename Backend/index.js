import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import DBconnection from './config/db.js';
import router from './routes/authRoutes.js';
import restaurantRouter from './routes/restaurantRoutes.js';
import menuRouter from './routes/menuRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api/auth',router)
app.use('/api/restaurants', restaurantRouter);
app.use('/api/menu', menuRouter);
app.use('/api/payment', paymentRouter);

DBconnection();

console.log(process.env.JWT_SECRET);

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
})