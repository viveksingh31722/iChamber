const express = require('express');
const { submitMembership, getMemberships } = require('./member.controller');
const { protect, authorize } = require('../../middlewares/auth.middleware');
const router = express.Router();

router.post('/', protect, submitMembership);
router.get('/', protect, getMemberships);

module.exports = router;
