const express = require('express');
const {
  getPlatforms,
  getPlatform,
  createPlatform,
  updatePlatform,
  deletePlatform
} = require('./platform.controller');

const { protect, authorize } = require('../../middlewares/auth.middleware');

const router = express.Router();

router
  .route('/')
  .get(getPlatforms)
  .post(protect, authorize('admin'), createPlatform);

router
  .route('/:id')
  .get(getPlatform)
  .put(protect, authorize('admin'), updatePlatform)
  .delete(protect, authorize('admin'), deletePlatform);

module.exports = router;
