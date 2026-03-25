const Governance = require('./governance.model');

// @desc    Get all governance members
// @route   GET /api/governance
// @access  Public
exports.getGovernanceMembers = async (req, res, next) => {
  try {
    const members = await Governance.find().sort({ order: 1, createdAt: 1 });
    
    res.status(200).json({
      success: true,
      count: members.length,
      data: members
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single governance member
// @route   GET /api/governance/:id
// @access  Public
exports.getGovernanceMember = async (req, res, next) => {
  try {
    const member = await Governance.findById(req.params.id);
    
    if (!member) {
      const error = new Error('Governance member not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: member
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new governance member
// @route   POST /api/governance
// @access  Private/Admin
exports.createGovernanceMember = async (req, res, next) => {
  try {
    const member = await Governance.create(req.body);

    res.status(201).json({
      success: true,
      data: member
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update governance member
// @route   PUT /api/governance/:id
// @access  Private/Admin
exports.updateGovernanceMember = async (req, res, next) => {
  try {
    let member = await Governance.findById(req.params.id);

    if (!member) {
      const error = new Error('Governance member not found');
      error.statusCode = 404;
      return next(error);
    }

    member = await Governance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: member
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete governance member
// @route   DELETE /api/governance/:id
// @access  Private/Admin
exports.deleteGovernanceMember = async (req, res, next) => {
  try {
    const member = await Governance.findById(req.params.id);

    if (!member) {
      const error = new Error('Governance member not found');
      error.statusCode = 404;
      return next(error);
    }

    await member.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
