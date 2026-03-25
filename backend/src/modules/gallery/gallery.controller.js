const Gallery = require('./gallery.model');

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
exports.getGalleryItems = async (req, res, next) => {
  try {
    const items = await Gallery.find().populate('eventId', 'title date location').sort({ eventDate: -1, createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single gallery item
// @route   GET /api/gallery/:id
// @access  Public
exports.getGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.findById(req.params.id).populate('eventId', 'title date location');
    
    if (!item) {
      const error = new Error('Gallery item not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new gallery item
// @route   POST /api/gallery
// @access  Private/Admin
exports.createGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.create(req.body);

    res.status(201).json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update gallery item
// @route   PUT /api/gallery/:id
// @access  Private/Admin
exports.updateGalleryItem = async (req, res, next) => {
  try {
    let item = await Gallery.findById(req.params.id);

    if (!item) {
      const error = new Error('Gallery item not found');
      error.statusCode = 404;
      return next(error);
    }

    item = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
exports.deleteGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.findById(req.params.id);

    if (!item) {
      const error = new Error('Gallery item not found');
      error.statusCode = 404;
      return next(error);
    }

    await item.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
