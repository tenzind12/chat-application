const User = require('../models/authModel');

const getFriends = async (req, res) => {
  try {
    const friends = await User.find({});
    res.status(200).json({
      success: true,
      friends,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};

module.exports = { getFriends };
