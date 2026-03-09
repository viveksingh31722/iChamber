const { sendResponse } = require('../../utils/apiResponse');
const Membership = require('./member.model');

exports.submitMembership = async (req, res, next) => {
  try {
    if (req.user) {
      req.body.user = req.user.id;
    }
    const membership = await Membership.create(req.body);
    sendResponse(res, 201, 'Membership application submitted successfully. We will notify you once it is approved.', membership);
  } catch (err) {
    next(err);
  }
};

exports.getMemberships = async (req, res, next) => {
  try {
    let query = {};
    if (req.user.role !== 'admin') {
      query.user = req.user.id;
    }
    const memberships = await Membership.find(query).sort('-createdAt');
    sendResponse(res, 200, 'Memberships retrieved', memberships);
  } catch (err) {
    next(err);
  }
};
