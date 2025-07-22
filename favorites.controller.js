const Favorites = require("./favorites.model");


const addFavorites = async (req, res) => {
  try {
        const profileId = req.params.profileId;

    const { favoriteFoodIds = [], favoriteDrinkIds = [] } = req.body;

    if (!profileId) {
      return res.status(400).json({ message: 'Profile ID is required' });
    }

    // Use $addToSet to add items without duplication
    const favorites = await Favorites.findOneAndUpdate(
      { profileId },  // Filter by profileId
      {
        $addToSet: {
          favoriteFoods: { $each: favoriteFoodIds },  // Add each food ID to the array without duplicates
          favoriteDrinks: { $each: favoriteDrinkIds } // Add each drink ID to the array without duplicates
        }
      },
      { new: true, upsert: true }  // Return updated doc and create if not exists
    );

    res.json({ message: 'Favorites updated successfully', favorites });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
const    removeFavorites = async (req, res) => {
          const profileId = req.params.profileId;

  try {
    const { favoriteFoodIds = [], favoriteDrinkIds = [] } = req.body;

    if (!profileId) {
      return res.status(400).json({ message: 'Profile ID is required' });
    }

    // Use $pull to remove items from the array
    const favorites = await Favorites.findOneAndUpdate(
      { profileId },  // Filter by profileId
      {
        $pull: {
          favoriteFoods: { $in: favoriteFoodIds },   // Remove the food IDs in the array
          favoriteDrinks: { $in: favoriteDrinkIds }  // Remove the drink IDs in the array
        }
      },
      { new: true }  // Return updated doc
    );

    res.json({ message: 'Favorites updated successfully', favorites });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getFavorites = async (req, res) => {
  try {
    const profileId = req.params.profileId;

    // Find the user's favorites by profileId
    const favorites = await Favorites.findOne({ profileId });

    // If no favorites document is found
    if (!favorites) {
      return res.status(404).json({ message: 'Favorites not found' });
    }

    // Return the favorite foods and drinks
    res.json({
      favoriteFoods: favorites.favoriteFoods,
      favoriteDrinks: favorites.favoriteDrinks
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}
module.exports = {
  getFavorites,removeFavorites,addFavorites
};
