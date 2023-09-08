const User = require('../models/auth.model');
const Message = require('../models/message.model');

const getFriends = async (req, res) => {
  const currentUserId = req.myId;
  try {
    const friends = await User.find({});
    const filteredFriends = friends.filter((friend) => friend.id !== currentUserId);
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

const uploadMsgToDB = async (req, res) => {
  const senderId = req.myId;
  console.log(req.body);
  const { senderName, receiverId, message } = req.body;

  try {
    const uploadMessage = await Message.create({
      senderId: senderId,
      senderName: senderName,
      receiverId: receiverId,
      message: {
        text: message,
        image: '',
      },
    });

    res.status(201).json({
      success: true,
      message: uploadMessage,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Internal server error',
        error: error,
      },
    });
  }
};

module.exports = { getFriends, uploadMsgToDB };
('Message validation failed: recieverId: Path `recieverId` is required.');
