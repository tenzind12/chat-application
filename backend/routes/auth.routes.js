const router = require('express').Router();

const { userRegister, userLogin } = require('../controller/auth.controller');

router.post('/user-register', userRegister);
router.post('/user-login', userLogin);

module.exports = router;
