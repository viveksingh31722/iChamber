const express = require('express');
const {
  getGovernanceMembers,
  getGovernanceMember,
  createGovernanceMember,
  updateGovernanceMember,
  deleteGovernanceMember
} = require('./governance.controller');

const { protect, authorize } = require('../../middlewares/auth.middleware');

const router = express.Router();

router
  .route('/')
  .get(getGovernanceMembers)
  .post(protect, authorize('admin'), createGovernanceMember);

router
  .route('/:id')
  .get(getGovernanceMember)
  .put(protect, authorize('admin'), updateGovernanceMember)
  .delete(protect, authorize('admin'), deleteGovernanceMember);

module.exports = router;
