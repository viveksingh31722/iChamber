const express = require('express');
const { getProfile, updateProfile, deleteAccount } = require('./users.controller');
const { protect } = require('../../middlewares/auth.middleware');
const router = express.Router();

router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.delete('/profile', deleteAccount);

module.exports = router;
