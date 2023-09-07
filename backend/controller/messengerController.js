const User = require('../models/authModel');

const getFriends = async (req, res) => {
  try {
    const friends = await User.find({});
    const filteredFriends = friends.filter((friend) => friend.id !== req.myId);
    res.status(200).json({
      success: true,
      friends: filteredFriends,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};

module.exports = { getFriends };
