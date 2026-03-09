const jwt = require('jsonwebtoken');
const User = require('../modules/auth/auth.model');
const { JWT_ACCESS_SECRET } = require('../config/env');

const protect = async (req, res, next) => {
  let token;

  // Check for token in cookies
  if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    const error = new Error('Not authorized to access this route');
    error.statusCode = 401;
    return next(error);
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET);

    req.user = await User.findById(decoded.id);

    if (!req.user) {
      const error = new Error('No user found with this id');
      error.statusCode = 404;
      return next(error);
    }

    next();
  } catch (err) {
    const error = new Error('Not authorized to access this route');
    error.statusCode = 401;
    return next(error);
  }
};

// Optional protection: Populates req.user if token is present, but doesn't fail if not
const softProtect = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    // If token is invalid, we just treat them as a guest
    next();
  }
};

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const error = new Error(`User role ${req.user.role} is not authorized to access this route`);
      error.statusCode = 403;
      return next(error);
    }
    next();
  };
};

module.exports = { protect, authorize, softProtect };
