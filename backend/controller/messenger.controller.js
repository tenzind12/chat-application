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

const getMessage = async (req, res) => {
  const myId = req.myId;
  const currentFriendId = req.params.id;
  try {
    let getAllMessages = await Message.find({});
    if (getAllMessages.length > 0)
      getAllMessages = getAllMessages.filter(
        (message) =>
          (message.senderId === myId && message.receiverId === currentFriendId) ||
          (message.receiverId === myId && message.senderId === currentFriendId)
      );

    res.status(200).json({
      success: true,
      message: getAllMessages,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Internal server error',
        data: error,
      },
    });
  }
};

module.exports = { getFriends, uploadMsgToDB, getMessage };
