const express = require('express');
const {
  getPartners,
  getPartner,
  createPartner,
  updatePartner,
  deletePartner
} = require('./partner.controller');

const { protect, authorize } = require('../../middlewares/auth.middleware');

const router = express.Router();

router
  .route('/')
  .get(getPartners)
  .post(protect, authorize('admin'), createPartner);

router
  .route('/:id')
  .get(getPartner)
  .put(protect, authorize('admin'), updatePartner)
  .delete(protect, authorize('admin'), deletePartner);

module.exports = router;
