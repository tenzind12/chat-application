const formidable = require('formidable');
const User = require('../models/auth.model');
const Message = require('../models/message.model');
const fs = require('fs');
const { sanitizeFileName } = require('../utils');

// get last message of each user
const getLastMessage = async (myId, friendId) => {
  const message = await Message.findOne({
    $or: [
      { senderId: myId, receiverId: friendId },
      { senderId: friendId, receiverId: myId },
    ],
  }).sort({ updatedAt: -1 });

  return message;
};

const getFriends = async (req, res) => {
  const myId = req.myId;
  let friendsMessage = [];
  try {
    const friends = await User.find({ _id: { $ne: myId } });

    for (let i = 0; i < friends.length; i++) {
      let lastMessage = await getLastMessage(myId, friends[i].id);
      friendsMessage = [...friendsMessage, { friendInfo: friends[i], messageInfo: lastMessage }];
    }

    // const filteredFriends = friends.filter((friend) => friend.id !== myId);

    res.status(200).json({
      success: true,
      friends: friendsMessage,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      data: error,
    });
  }
};

const uploadMsgToDB = async (req, res) => {
  const senderId = req.myId;
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

const sendImage = async (req, res) => {
  const senderId = req.myId;
  const form = formidable.formidable();

  form.parse(req, (err, fields, files) => {
    // since value are in an array ex: ['Tenzin'], i m getting the first element
    const {
      senderName: [senderName],
      receiverId: [receiverId],
      imageName: [imageName],
    } = fields;

    const newImageName = sanitizeFileName(imageName);

    const {
      image: [image],
    } = files;

    const newImagePath = __dirname + `../../../chatapp-client/public/images/chat/${newImageName}`;
    image.originalFilename = newImageName;
    try {
      // prettier-ignore
      fs.copyFile(image.filepath, newImagePath, async (err) => {
        if (err) {
          res.status(500).json({
            error: {
              message: 'Image upload failed',
              data: err,
            },
          });
        } else {
          const insertImage = await Message.create({
            senderId: senderId,
            senderName: senderName,
            receiverId: receiverId,
            message: {
              text: '',
              image: image.originalFilename
            }
          });

          res.status(201).json({
            success: true,
            message: insertImage,
          })
        }
      });
    } catch (error) {
      res.status(500).json({
        error: {
          message: 'Internal server error',
          data: error,
        },
      });
    }
  });
};

const getMessage = async (req, res) => {
  const myId = req.myId;
  const currentFriendId = req.params.id;

  try {
    const getAllMessages = await Message.find({
      $or: [
        { senderId: myId, receiverId: currentFriendId },
        { senderId: currentFriendId, receiverId: myId },
      ],
    });

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

module.exports = { getFriends, uploadMsgToDB, getMessage, sendImage };
