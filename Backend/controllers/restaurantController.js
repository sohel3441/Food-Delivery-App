import Restaurant from "../models/Restaurant.js";

export const createRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const bulkAddRestaurants = async (req, res) => {
  const restaurants = req.body;
  try {
    const createdRestaurants = await Restaurant.insertMany(restaurants);
    res.status(201).json(createdRestaurants);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
