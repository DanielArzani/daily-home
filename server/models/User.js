const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      trim: true,
      unique: [
        true,
        'This username has already been taken, please choose another one',
      ],
      minlength: [4, 'Username should be at least 4 characters long'],
      maxlength: [18, 'Username must be at most, 18 characters long'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: [true, 'This email is already in use'],
      validate: [validator.isEmail, 'Not a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      min: [4, 'Password must be at least 4 characters long'],
      max: [12, 'Password must be at most 12 characters long'],
    },
  },
  {
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true },
    // We set id to false because this is a virtual that Mongoose returns, and we don’t need it
    // id: false,
  }
);

const User = new mongoose.model('User', userSchema);

module.exports = User;
