import express from 'express';
import { createRestaurant, getRestaurants , bulkAddRestaurants } from '../controllers/restaurantController.js';

const restaurantRouter = express.Router();

restaurantRouter.post('/', createRestaurant);
restaurantRouter.get('/', getRestaurants);
restaurantRouter.post('/bulk', bulkAddRestaurants); // Bulk add restaurants

export default restaurantRouter;
