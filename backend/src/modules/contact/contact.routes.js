const express = require('express');
const { submitQuery, getQueries } = require('./contact.controller');
const { protect, authorize, softProtect } = require('../../middlewares/auth.middleware');
const router = express.Router();

router.post('/', softProtect, submitQuery);
router.get('/', protect, authorize('admin'), getQueries);

module.exports = router;
