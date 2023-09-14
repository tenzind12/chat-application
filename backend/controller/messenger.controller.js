const formidable = require('formidable');
const User = require('../models/auth.model');
const Message = require('../models/message.model');
const fs = require('fs');
const { sanitizeFileName } = require('../utils');

const getFriends = async (req, res) => {
  const currentUserId = req.myId;
  try {
    const friends = await User.find({ _id: { $ne: currentUserId } });

    // const filteredFriends = friends.filter((friend) => friend.id !== currentUserId);

    res.status(200).json({
      success: true,
      friends: friends,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};

const uploadMsgToDB = async (req, res) => {
  const senderId = req.myId;
  // console.log(req.body);
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

    // if (getAllMessages.length > 0)
    //   getAllMessages = getAllMessages.filter(
    //     (message) =>
    //       (message.senderId === myId && message.receiverId === currentFriendId) ||
    //       (message.receiverId === myId && message.senderId === currentFriendId)
    //   );

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
