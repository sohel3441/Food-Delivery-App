import MenuItem from '../models/MenuItem.js';

export const addMenuItem = async (req, res) => {
  const { restaurant, name,description, price , image } = req.body;
  try {
    const menuItem = await MenuItem.create({ restaurant, name,description , price , image });
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
// export const addMenuItem = async (req, res) => {
//     const { restaurant, name, price } = req.body;
//   try {
//     const menuItem = await MenuItem.create(req.body);
//     res.status(201).json(menuItem);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

export const getMenuByRestaurant = async (req, res) => {
  try {    
    const menuItems = await MenuItem.find({ restaurant: req.params.restaurantId });
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const bulkAddMenuItems = async (req, res) => {
    const { restaurantId } = req.params;
    const menuItems = req.body.map(item => ({
      ...item,
      restaurant: restaurantId
    }));
  
    try {
      const createdItems = await MenuItem.insertMany(menuItems);
      res.status(201).json(createdItems);
    } catch (err) {
      res.status(500).json({ error: 'Failed to add menu items', details: err.message });
    }
  };