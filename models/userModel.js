const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  photo: {
    type: String,
    required: true,
    default: 'leo.jpg',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
