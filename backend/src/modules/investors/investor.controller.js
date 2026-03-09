const { sendResponse } = require('../../utils/apiResponse');
const InvestorApplication = require('./investor.model');

exports.submitApplication = async (req, res, next) => {
  try {
    if (req.user) {
      req.body.user = req.user.id;
    }
    const application = await InvestorApplication.create(req.body);
    sendResponse(res, 201, 'Your application has been received successfully. Our team will review it and get back to you.', application);
  } catch (err) {
    next(err);
  }
};

exports.getApplications = async (req, res, next) => {
  try {
    let query = {};
    if (req.user.role !== 'admin') {
      query.user = req.user.id;
    }
    const applications = await InvestorApplication.find(query).sort('-createdAt');
    sendResponse(res, 200, 'Applications retrieved successfully', applications);
  } catch (err) {
    next(err);
  }
};
