const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authMiddleware = async (req, res, next) => {
  let token;

  // TO CHECK THERE IS A TOKEN OR NOT IN THE HEADER
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      res.status(401).json({
        status: 401,
        message: 'Invalid token, please login first',
      })
    );
  }

  let decoded;

  // TO DECODE VERIFICATION TOKEN
  try {
    decoded = await jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(
      res.status(401).json({
        error: err,
        message: 'Invalid token',
      })
    );
  }

  // GET USER DATA BY DECODED CONDITION
  const currentUser = await User.findByPk(decoded.id);
  if (!currentUser) {
    return next(
      res.status(401).json({
        status: 401,
        message: 'User does not exist, the token is invalid',
      })
    );
  }

  req.user;

  next();
};

module.exports = authMiddleware;
