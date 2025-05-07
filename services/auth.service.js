const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.register = async ({ email, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const err = new Error('User already exists');
    err.statusCode = 400;
    throw err;
  }

  const user = new User({ email, password, role: role || 'user' });
  await user.save();
  return 'User registered successfully';
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const err = new Error('Invalid credentials');
    err.statusCode = 400;
    throw err;
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { message: 'Login successful', token };
};
