const router = require('express').Router();

const {
  getFriends,
  uploadMsgToDB,
  getMessage,
  sendImage,
  seenMessage,
  deliveredMessage,
} = require('../controller/messenger.controller.js');
const { authMiddleware } = require('../middleware/auth.middleware.js');

// user routes
router.get('/get-friends', authMiddleware, getFriends);

// messenger routes
router.post('/send-message', authMiddleware, uploadMsgToDB);
router.post('/send-image', authMiddleware, sendImage);
router.get('/get-message/:id', authMiddleware, getMessage);
router.post('/seen-message', authMiddleware, seenMessage);
router.post('/delivered-message', authMiddleware, deliveredMessage);

module.exports = router;
