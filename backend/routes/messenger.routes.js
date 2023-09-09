const router = require('express').Router();

const {
  getFriends,
  uploadMsgToDB,
  getMessage,
  sendImage,
} = require('../controller/messenger.controller.js');
const { authMiddleware } = require('../middleware/auth.middleware.js');

// user routes
router.get('/get-friends', authMiddleware, getFriends);

// messenger routes
router.post('/send-message', authMiddleware, uploadMsgToDB);
router.post('/send-image', authMiddleware, sendImage);
router.get('/get-message/:id', authMiddleware, getMessage);

module.exports = router;
