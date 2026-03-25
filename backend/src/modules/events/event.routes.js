const express = require('express');
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
} = require('./event.controller');

const { protect, authorize } = require('../../middlewares/auth.middleware');

const router = express.Router();

router
  .route('/')
  .get(getEvents)
  .post(protect, authorize('admin'), createEvent);

router
  .route('/:id')
  .get(getEvent)
  .put(protect, authorize('admin'), updateEvent)
  .delete(protect, authorize('admin'), deleteEvent);

module.exports = router;
