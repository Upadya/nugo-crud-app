// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const User = require('./models/User');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/nugo-crud-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

// Validation middleware for creating a user
const createUserValidation = [
  check('name').isString().notEmpty(),
  check('email').isEmail(),
  check('address').isString().notEmpty(),
  check('city').isString().notEmpty(),
  check('country').isString().notEmpty(),
];

// Validation middleware for updating a user
const updateUserValidation = [
  check('name').isString(),
  check('email').isEmail(),
  check('address').isString(),
  check('city').isString(),
  check('country').isString(),
];

// Create a new user
app.post('/api/users', createUserValidation, async (req, res) => {
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
});

// Read user details by user ID
app.get('/api/users/:userId', async (req, res) => {
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
});

// Update user information by user ID
app.put('/api/users/:userId', updateUserValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
});

// Delete a user by user ID
app.delete('/api/users/:userId', async (req, res) => {
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
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
