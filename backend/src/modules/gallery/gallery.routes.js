const express = require('express');
const {
  getGalleryItems,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} = require('./gallery.controller');

const { protect, authorize } = require('../../middlewares/auth.middleware');

const router = express.Router();

router
  .route('/')
  .get(getGalleryItems)
  .post(protect, authorize('admin'), createGalleryItem);

router
  .route('/:id')
  .get(getGalleryItem)
  .put(protect, authorize('admin'), updateGalleryItem)
  .delete(protect, authorize('admin'), deleteGalleryItem);

module.exports = router;
