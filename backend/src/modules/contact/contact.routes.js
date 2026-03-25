const express = require('express');
const { submitQuery, getQueries } = require('./contact.controller');
const { protect, authorize } = require('../../middlewares/auth.middleware');
const router = express.Router();

router.post('/', submitQuery);
router.get('/', protect, authorize('admin'), getQueries);

module.exports = router;
