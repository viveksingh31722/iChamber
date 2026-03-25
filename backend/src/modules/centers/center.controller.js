const Center = require('./center.model');

// @desc    Get all centers
// @route   GET /api/centers
// @access  Public
exports.getCenters = async (req, res, next) => {
  try {
    const centers = await Center.find().sort({ country: 1 });
    
    res.status(200).json({
      success: true,
      count: centers.length,
      data: centers
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single center
// @route   GET /api/centers/:id
// @access  Public
exports.getCenter = async (req, res, next) => {
  try {
    const center = await Center.findById(req.params.id);
    
    if (!center) {
      const error = new Error('Center not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: center
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new center
// @route   POST /api/centers
// @access  Private/Admin
exports.createCenter = async (req, res, next) => {
  try {
    const center = await Center.create(req.body);

    res.status(201).json({
      success: true,
      data: center
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update center
// @route   PUT /api/centers/:id
// @access  Private/Admin
exports.updateCenter = async (req, res, next) => {
  try {
    let center = await Center.findById(req.params.id);

    if (!center) {
      const error = new Error('Center not found');
      error.statusCode = 404;
      return next(error);
    }

    center = await Center.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: center
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete center
// @route   DELETE /api/centers/:id
// @access  Private/Admin
exports.deleteCenter = async (req, res, next) => {
  try {
    const center = await Center.findById(req.params.id);

    if (!center) {
      const error = new Error('Center not found');
      error.statusCode = 404;
      return next(error);
    }

    await center.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
