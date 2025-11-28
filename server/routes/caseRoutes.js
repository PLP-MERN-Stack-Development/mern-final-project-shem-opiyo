const express = require('express');
const { body } = require('express-validator');
const { auth } = require('../utils/auth');
const {
  createCase,
  getUserCases,
  getCaseById,
  updateCase,
  assignJuniorToCase,
  closeCase
} = require('../controllers/caseController');

const router = express.Router();

// @route   POST api/cases
// @desc    Create a new case
// @access  Private (clients only)
router.post('/', auth, (req, res, next) => {
  if (req.user.userType !== 'client') {
    return res.status(403).json({ message: 'Access denied' });
  }
  createCase(req, res).catch(next);
});

// @route   GET api/cases
// @desc    Get all cases for current user
// @access  Private
router.get('/', auth, getUserCases);

// @route   GET api/cases/:id
// @desc    Get a specific case by ID
// @access  Private
router.get('/:id', auth, getCaseById);

// @route   PUT api/cases/:id
// @desc    Update a case
// @access  Private
router.put('/:id', auth, updateCase);

// @route   POST api/cases/assign-junior
// @desc    Assign a junior to a case
// @access  Private (advocates only)
router.post('/assign-junior', auth, (req, res, next) => {
  if (req.user.userType !== 'advocate') {
    return res.status(403).json({ message: 'Access denied' });
  }
  assignJuniorToCase(req, res).catch(next);
});

// @route   PUT api/cases/:id/close
// @desc    Close a case
// @access  Private (clients or advocates only)
router.put('/:id/close', auth, closeCase);

module.exports = router;