const express = require('express');
const {
  getCenters,
  getCenter,
  createCenter,
  updateCenter,
  deleteCenter
} = require('./center.controller');

const { protect, authorize } = require('../../middlewares/auth.middleware');

const router = express.Router();

router
  .route('/')
  .get(getCenters)
  .post(protect, authorize('admin'), createCenter);

router
  .route('/:id')
  .get(getCenter)
  .put(protect, authorize('admin'), updateCenter)
  .delete(protect, authorize('admin'), deleteCenter);

module.exports = router;
