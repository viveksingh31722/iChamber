const { sendResponse } = require('../../utils/apiResponse');
const ContactQuery = require('./contact.model');

exports.submitQuery = async (req, res, next) => {
  try {
    if (req.user) {
      req.body.user = req.user.id;
    }
    const query = await ContactQuery.create(req.body);
    sendResponse(res, 201, 'Your inquiry has been submitted. We will get back to you soon.', query);
  } catch (err) {
    next(err);
  }
};

exports.getQueries = async (req, res, next) => {
  try {
    const queries = await ContactQuery.find().sort('-createdAt');
    sendResponse(res, 200, 'Queries retrieved', queries);
  } catch (err) {
    next(err);
  }
};
