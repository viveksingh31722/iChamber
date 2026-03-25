const express = require('express');
const {
  getMediaList,
  getMedia,
  createMedia,
  updateMedia,
  deleteMedia
} = require('./media.controller');

const { protect, authorize } = require('../../middlewares/auth.middleware');

const router = express.Router();

router
  .route('/')
  .get(getMediaList)
  .post(protect, authorize('admin'), createMedia);

router
  .route('/:id')
  .get(getMedia)
  .put(protect, authorize('admin'), updateMedia)
  .delete(protect, authorize('admin'), deleteMedia);

module.exports = router;
