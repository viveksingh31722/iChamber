const express = require('express');
const {
  getPublications,
  getPublication,
  createPublication,
  updatePublication,
  deletePublication
} = require('./publication.controller');

const { protect, authorize } = require('../../middlewares/auth.middleware');

const router = express.Router();

router
  .route('/')
  .get(getPublications)
  .post(protect, authorize('admin'), createPublication);

router
  .route('/:id')
  .get(getPublication)
  .put(protect, authorize('admin'), updatePublication)
  .delete(protect, authorize('admin'), deletePublication);

module.exports = router;
