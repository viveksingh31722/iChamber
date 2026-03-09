const express = require('express');
const { submitApplication, getApplications } = require('./investor.controller');
const { protect, authorize } = require('../../middlewares/auth.middleware');
const router = express.Router();

router.post('/', protect, submitApplication);
router.get('/', protect, getApplications);

module.exports = router;
