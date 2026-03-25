const express = require('express');
const { subscribe, unsubscribe } = require('./subscription.controller');
const { protect } = require('../../middlewares/auth.middleware');
const router = express.Router();

router.post('/subscribe', protect, subscribe);
router.post('/unsubscribe', protect, unsubscribe);

module.exports = router;
