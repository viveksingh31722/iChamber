const Publication = require('./publication.model');

// @desc    Get all publications
// @route   GET /api/publications
// @access  Public
exports.getPublications = async (req, res, next) => {
  try {
    const publications = await Publication.find().sort({ publishDate: -1, createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: publications.length,
      data: publications
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single publication
// @route   GET /api/publications/:id
// @access  Public
exports.getPublication = async (req, res, next) => {
  try {
    const publication = await Publication.findById(req.params.id);
    
    if (!publication) {
      const error = new Error('Publication not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: publication
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new publication
// @route   POST /api/publications
// @access  Private/Admin
exports.createPublication = async (req, res, next) => {
  try {
    const publication = await Publication.create(req.body);

    res.status(201).json({
      success: true,
      data: publication
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update publication
// @route   PUT /api/publications/:id
// @access  Private/Admin
exports.updatePublication = async (req, res, next) => {
  try {
    let publication = await Publication.findById(req.params.id);

    if (!publication) {
      const error = new Error('Publication not found');
      error.statusCode = 404;
      return next(error);
    }

    publication = await Publication.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: publication
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete publication
// @route   DELETE /api/publications/:id
// @access  Private/Admin
exports.deletePublication = async (req, res, next) => {
  try {
    const publication = await Publication.findById(req.params.id);

    if (!publication) {
      const error = new Error('Publication not found');
      error.statusCode = 404;
      return next(error);
    }

    await publication.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
