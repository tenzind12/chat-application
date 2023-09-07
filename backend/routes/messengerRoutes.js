const router = require('express').Router();

const { getFriends } = require('../controller/messengerController.js');
const { authMiddleware } = require('../middleware/auth.middleware.js');

router.get('/get-friends', authMiddleware, getFriends);

module.exports = router;
