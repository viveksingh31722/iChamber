const express = require('express');
const { register, login, logout, refresh, verifyEmail } = require('./auth.controller');
const router = express.Router();

router.post('/register', register);
router.get('/verify-email/:token', verifyEmail);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refresh);

module.exports = router;
