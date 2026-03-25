const Partner = require('./partner.model');

// @desc    Get all partners
// @route   GET /api/partners
// @access  Public
exports.getPartners = async (req, res, next) => {
  try {
    const partners = await Partner.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: partners.length,
      data: partners
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single partner
// @route   GET /api/partners/:id
// @access  Public
exports.getPartner = async (req, res, next) => {
  try {
    const partner = await Partner.findById(req.params.id);
    
    if (!partner) {
      const error = new Error('Partner not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: partner
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new partner
// @route   POST /api/partners
// @access  Private/Admin
exports.createPartner = async (req, res, next) => {
  try {
    const partner = await Partner.create(req.body);

    res.status(201).json({
      success: true,
      data: partner
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update partner
// @route   PUT /api/partners/:id
// @access  Private/Admin
exports.updatePartner = async (req, res, next) => {
  try {
    let partner = await Partner.findById(req.params.id);

    if (!partner) {
      const error = new Error('Partner not found');
      error.statusCode = 404;
      return next(error);
    }

    partner = await Partner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: partner
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete partner
// @route   DELETE /api/partners/:id
// @access  Private/Admin
exports.deletePartner = async (req, res, next) => {
  try {
    const partner = await Partner.findById(req.params.id);

    if (!partner) {
      const error = new Error('Partner not found');
      error.statusCode = 404;
      return next(error);
    }

    await partner.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
