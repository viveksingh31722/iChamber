const { sendResponse } = require('../../utils/apiResponse');
const Subscription = require('./subscription.model');

exports.subscribe = async (req, res, next) => {
  try {
    if (req.user) {
      req.body.user = req.user.id;
    }
    const subscription = await Subscription.create(req.body);
    sendResponse(res, 201, 'Subscribed to newsletter successfully', subscription);
  } catch (err) {
    if (err.code === 11000) {
      return sendResponse(res, 400, 'This email is already subscribed');
    }
    next(err);
  }
};

exports.unsubscribe = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOneAndUpdate(
      { email: req.body.email },
      { active: false },
      { new: true }
    );
    if (!subscription) {
      return sendResponse(res, 404, 'Subscription not found');
    }
    sendResponse(res, 200, 'Unsubscribed successfully');
  } catch (err) {
    next(err);
  }
};
