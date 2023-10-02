const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/userController');

// Create a new user
router.post(
  '/users',
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('address').notEmpty(),
    body('city').notEmpty(),
    body('country').notEmpty(),
  ],
  userController.createUser
);

// Read user details by user ID
router.get('/users/:userId', userController.readUser);

// Update user information by user ID
router.put(
  '/users/:userId',
  [
    body('name').optional().notEmpty(),
    body('email').optional().isEmail(),
    body('address').optional().notEmpty(),
    body('city').optional().notEmpty(),
    body('country').optional().notEmpty(),
  ],
  userController.updateUser
);

// Delete a user by user ID
router.delete('/users/:userId', userController.deleteUser);

module.exports = router;
