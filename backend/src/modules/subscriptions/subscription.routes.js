const express = require('express');
const { subscribe, unsubscribe } = require('./subscription.controller');
const { softProtect } = require('../../middlewares/auth.middleware');
const router = express.Router();

router.post('/subscribe', softProtect, subscribe);
router.post('/unsubscribe', unsubscribe);

module.exports = router;
