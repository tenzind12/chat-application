const router = require('express').Router();

const { getFriends, uploadMsgToDB } = require('../controller/messenger.controller.js');
const { authMiddleware } = require('../middleware/auth.middleware.js');

router.get('/get-friends', authMiddleware, getFriends);
router.post('/send-message', authMiddleware, uploadMsgToDB);

module.exports = router;
