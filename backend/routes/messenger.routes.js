const router = require('express').Router();

const { getFriends, uploadMsgToDB, getMessage } = require('../controller/messenger.controller.js');
const { authMiddleware } = require('../middleware/auth.middleware.js');

router.get('/get-friends', authMiddleware, getFriends);

router.post('/send-message', authMiddleware, uploadMsgToDB);
router.get('/get-message/:id', authMiddleware, getMessage);

module.exports = router;
