const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please add a first name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please add a last name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  verificationTokenExpire: Date,
  refreshTokens: {
    type: [String],
    select: false, // Don't include in queries by default
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: {
    transform(doc, ret) {
      delete ret.password;
      delete ret.refreshTokens;
      delete ret.__v;
      return ret;
    }
  }
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash verification token
UserSchema.methods.getVerificationToken = function () {
  // Generate token
  const vToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to verificationToken field
  this.verificationToken = crypto
    .createHash('sha256')
    .update(vToken)
    .digest('hex');

  // Set expire (24 hours)
  this.verificationTokenExpire = Date.now() + 24 * 60 * 60 * 1000;

  return vToken;
};

// Cascade delete related data when user is deleted
UserSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  console.log(`Deleting data related to user ${this._id}`);
  await this.model('InvestorApplication').deleteMany({ user: this._id });
  await this.model('Membership').deleteMany({ user: this._id });
  await this.model('ContactQuery').deleteMany({ user: this._id });
  await this.model('Subscription').deleteMany({ user: this._id });
  next();
});

module.exports = mongoose.model('User', UserSchema);
