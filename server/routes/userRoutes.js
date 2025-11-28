const express = require('express');
const { body } = require('express-validator');
const { auth } = require('../utils/auth');
const {
  registerUser,
  loginUser,
  getCurrentUser,
  getUserById,
  updateUserProfile,
  getUnsupervisedJuniors,
  manageJuniorRequest,
  getSupervisedJuniors,
  getAdvocateProfile
} = require('../controllers/userController');

const router = express.Router();

// @route   POST api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', [
  body('firstName', 'First name is required').not().isEmpty(),
  body('lastName', 'Last name is required').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  body('userType', 'User type is required').isIn(['client', 'junior', 'advocate'])
], registerUser);

// @route   POST api/users/login
// @desc    Authenticate user and get token
// @access  Public
router.post('/login', [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists()
], loginUser);

// @route   GET api/users/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, getCurrentUser);

// @route   GET api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', auth, getUserById);

// @route   PUT api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, updateUserProfile);

// @route   GET api/users/juniors/unsupervised
// @desc    Get all junior legal assistants without supervisors
// @access  Private (advocates only)
router.get('/juniors/unsupervised', auth, (req, res, next) => {
  if (req.user.userType !== 'advocate') {
    return res.status(403).json({ message: 'Access denied' });
  }
  getUnsupervisedJuniors(req, res).catch(next);
});

// @route   POST api/users/juniors/manage
// @desc    Accept or reject a junior legal assistant into community
// @access  Private (advocates only)
router.post('/juniors/manage', auth, (req, res, next) => {
  if (req.user.userType !== 'advocate') {
    return res.status(403).json({ message: 'Access denied' });
  }
  manageJuniorRequest(req, res).catch(next);
});

// @route   GET api/users/juniors/supervised
// @desc    Get junior legal assistants supervised by current advocate
// @access  Private (advocates only)
router.get('/juniors/supervised', auth, (req, res, next) => {
  if (req.user.userType !== 'advocate') {
    return res.status(403).json({ message: 'Access denied' });
  }
  getSupervisedJuniors(req, res).catch(next);
});

// @route   GET api/users/advocates/:id
// @desc    Get advocate's profile (for juniors to view)
// @access  Private
router.get('/advocates/:id', auth, getAdvocateProfile);

module.exports = router;