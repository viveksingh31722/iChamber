const Platform = require('./platform.model');

// @desc    Get all platforms
// @route   GET /api/platforms
// @access  Public
exports.getPlatforms = async (req, res, next) => {
  try {
    const query = req.query.isActive ? { isActive: req.query.isActive === 'true' } : {};
    const platforms = await Platform.find(query).sort({ createdAt: 1 });
    
    res.status(200).json({
      success: true,
      count: platforms.length,
      data: platforms
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single platform
// @route   GET /api/platforms/:id
// @access  Public
exports.getPlatform = async (req, res, next) => {
  try {
    const platform = await Platform.findById(req.params.id);
    
    if (!platform) {
      const error = new Error('Platform not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: platform
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new platform
// @route   POST /api/platforms
// @access  Private/Admin
exports.createPlatform = async (req, res, next) => {
  try {
    const platform = await Platform.create(req.body);

    res.status(201).json({
      success: true,
      data: platform
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update platform
// @route   PUT /api/platforms/:id
// @access  Private/Admin
exports.updatePlatform = async (req, res, next) => {
  try {
    let platform = await Platform.findById(req.params.id);

    if (!platform) {
      const error = new Error('Platform not found');
      error.statusCode = 404;
      return next(error);
    }

    platform = await Platform.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: platform
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete platform
// @route   DELETE /api/platforms/:id
// @access  Private/Admin
exports.deletePlatform = async (req, res, next) => {
  try {
    const platform = await Platform.findById(req.params.id);

    if (!platform) {
      const error = new Error('Platform not found');
      error.statusCode = 404;
      return next(error);
    }

    await platform.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
