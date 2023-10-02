const User = require('../models/User');
const { validationResult } = require('express-validator');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read user details by user ID
exports.readUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update user information by user ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a user by user ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
