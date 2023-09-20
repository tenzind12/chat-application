const router = require('express').Router();

const { userRegister, userLogin, userLogout } = require('../controller/auth.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.post('/user-register', userRegister);
router.post('/user-login', userLogin);
router.post('/user-logout', authMiddleware, userLogout);

module.exports = router;
