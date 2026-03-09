const { sendResponse } = require('../../utils/apiResponse');
const authService = require('./auth.service');
const { COOKIE_EXPIRE, NODE_ENV, FRONTEND_URL } = require('../../config/env');

const setTokenCookies = (res, accessToken, refreshToken) => {
  const cookieOptions = {
    expires: new Date(Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: NODE_ENV === 'production',
    sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
  };

  res.cookie('accessToken', accessToken, {
    ...cookieOptions,
    expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes for access token cookie
  });

  res.cookie('refreshToken', refreshToken, cookieOptions);
};

exports.register = async (req, res, next) => {
  try {
    await authService.register(req.body);
    sendResponse(res, 201, 'Registration successful. Please check your email to verify your account.');
  } catch (err) {
    next(err);
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    await authService.verifyEmail(req.params.token);
    res.status(200).json({ success: true, message: 'Email verified successfully' });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.login(email, password);
    setTokenCookies(res, accessToken, refreshToken);
    sendResponse(res, 200, 'Login successful', { user, accessToken });
  } catch (err) {
    next(err);
  }
};

exports.refresh = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    const { accessToken, refreshToken: newRefreshToken } = await authService.refresh(token);
    setTokenCookies(res, accessToken, newRefreshToken);
    sendResponse(res, 200, 'Token refreshed successfully');
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    await authService.logout(token);

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    sendResponse(res, 200, 'Logged out successfully');
  } catch (err) {
    next(err);
  }
};
