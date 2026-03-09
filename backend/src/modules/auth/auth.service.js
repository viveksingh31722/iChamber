const User = require('./auth.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../../utils/email');
const {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRE,
  JWT_REFRESH_EXPIRE
} = require('../../config/env');

const generateAccessToken = (id) => {
  return jwt.sign({ id }, JWT_ACCESS_SECRET, {
    expiresIn: JWT_ACCESS_EXPIRE,
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRE,
  });
};

exports.register = async (userData) => {
  const user = await User.create(userData);

  // Generate verification token
  const vToken = user.getVerificationToken();
  await user.save();

  // Create verification URL
  const verifyUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${vToken}`;

  console.log('--- DEVELOPMENT VERIFICATION LINK ---');
  console.log('Click here to verify:');
  console.log(verifyUrl);
  console.log('-------------------------------------');

  const message = `You are receiving this email because you have registered with IChamber. Please click the link below to verify your email: \n\n ${verifyUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Email Verification',
      message,
    });
  } catch (err) {
    console.error('Email could not be sent', err);
    // For manual testing, we keep the token even if email fails
    // In production with real SMTP, you might want to handle this differently
  }

  return user;
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email }).select('+password +refreshTokens');

  if (!user || !(await user.matchPassword(password))) {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  if (!user.isVerified) {
    const error = new Error('Please verify your email to login');
    error.statusCode = 401;
    throw error;
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshTokens.push(refreshToken);
  await user.save();

  return { user, accessToken, refreshToken };
};

exports.refresh = async (token) => {
  if (!token) {
    const error = new Error('No refresh token provided');
    error.statusCode = 401;
    throw error;
  }

  const user = await User.findOne({ refreshTokens: token }).select('+refreshTokens');
  if (!user) {
    const error = new Error('Invalid refresh token');
    error.statusCode = 403;
    throw error;
  }

  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    // Replace old refresh token with new one (Token Rotation)
    user.refreshTokens = user.refreshTokens.filter(rt => rt !== token);
    user.refreshTokens.push(newRefreshToken);
    await user.save();

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (err) {
    // If token is expired or invalid, remove it from user
    user.refreshTokens = user.refreshTokens.filter(rt => rt !== token);
    await user.save();
    const error = new Error('Refresh token expired or invalid');
    error.statusCode = 403;
    throw error;
  }
};

exports.verifyEmail = async (token) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await User.findOne({
    verificationToken: hashedToken,
    verificationTokenExpire: { $gt: Date.now() },
  });

  if (!user) {
    const error = new Error('Invalid or expired verification token');
    error.statusCode = 400;
    throw error;
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpire = undefined;
  await user.save();

  return user;
};

exports.logout = async (token) => {
  if (token) {
    const user = await User.findOne({ refreshTokens: token }).select('+refreshTokens');
    if (user) {
      user.refreshTokens = user.refreshTokens.filter(rt => rt !== token);
      // here rt is refresh token.
      await user.save();
    }
  }
};
