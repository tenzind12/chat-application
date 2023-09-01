const userRegister = require('../controller/authController');

const router = require('express').Router();

router.post('/user-register', userRegister);

module.exports = router;
