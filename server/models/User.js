const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      trim: true,
      unique: true,
      minlength: [4, 'Username should be at least 4 characters long'],
      maxlength: [18, 'Username must be at most, 18 characters long'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      validate: [validator.isEmail, 'Not a valid email address'],
    },
    // User Roles
    role: {
      type: String,
      enum: ['user', 'admin'],
      // Set default so that specifying what type of user isn't always required
      default: 'user',
    },
    password: {
      type: String,
      select: false,
      required: [true, 'Please provide a password'],
      minlength: [4, 'Password must be at least 4 characters long'],
      maxlength: [12, 'Password must be at most 12 characters long'],
    },
  },
  {
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true },
    // Set id to false because this is a virtual that Mongoose returns, and it isn't needed
    id: false,
  }
);

// hash password before user account is created
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// verify password instance method
userSchema.methods.isPasswordCorrect = async function (password) {
  // will return true or false
  return bcrypt.compare(password, this.password);
};

const User = new mongoose.model('User', userSchema);

module.exports = User;
