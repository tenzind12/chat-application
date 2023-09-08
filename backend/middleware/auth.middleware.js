const jwt = require('jsonwebtoken');

// to remove current user from the friends list
module.exports.authMiddleware = async (req, res, next) => {
  const { authToken } = req.cookies;
  if (authToken) {
    const decodeToken = await jwt.verify(authToken, process.env.SECRET);
    req.myId = decodeToken.id;
    next();
  } else {
    res.status(400).json({
      error: {
        message: ['Please login'],
      },
    });
  }
};
