const router = require('express').Router();

const { getFriends } = require('../controller/messengerController.js');

router.get('/get-friends', getFriends);

module.exports = router;
