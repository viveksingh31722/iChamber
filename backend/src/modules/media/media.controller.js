const Media = require('./media.model');

// @desc    Get all media/press releases
// @route   GET /api/media
// @access  Public
exports.getMediaList = async (req, res, next) => {
  try {
    const mediaList = await Media.find().sort({ publishedDate: -1 });
    
    res.status(200).json({
      success: true,
      count: mediaList.length,
      data: mediaList
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single media release
// @route   GET /api/media/:id
// @access  Public
exports.getMedia = async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id);
    
    if (!media) {
      const error = new Error('Media release not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: media
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new media release
// @route   POST /api/media
// @access  Private/Admin
exports.createMedia = async (req, res, next) => {
  try {
    const media = await Media.create(req.body);

    res.status(201).json({
      success: true,
      data: media
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update media release
// @route   PUT /api/media/:id
// @access  Private/Admin
exports.updateMedia = async (req, res, next) => {
  try {
    let media = await Media.findById(req.params.id);

    if (!media) {
      const error = new Error('Media release not found');
      error.statusCode = 404;
      return next(error);
    }

    media = await Media.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: media
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete media release
// @route   DELETE /api/media/:id
// @access  Private/Admin
exports.deleteMedia = async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      const error = new Error('Media release not found');
      error.statusCode = 404;
      return next(error);
    }

    await media.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
