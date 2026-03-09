const { sendResponse } = require('../../utils/apiResponse');
const User = require('../auth/auth.model');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    sendResponse(res, 200, 'Profile retrieved', user);
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    sendResponse(res, 200, 'Profile updated successfully', user);
  } catch (err) {
    next(err);
  }
};

exports.deleteAccount = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    // This triggers the pre('deleteOne') middleware for cascading deletes
    await user.deleteOne();

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    sendResponse(res, 200, 'Account and all associated data deleted successfully');
  } catch (err) {
    next(err);
  }
};
