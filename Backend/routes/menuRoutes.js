import express from 'express';
import { addMenuItem, getMenuByRestaurant  , bulkAddMenuItems} from '../controllers/menuController.js';

const menuRouter = express.Router();

menuRouter.post('/', addMenuItem);
menuRouter.get('/:restaurantId', getMenuByRestaurant);
menuRouter.post('/bulk/:restaurantId', bulkAddMenuItems);

export default menuRouter;