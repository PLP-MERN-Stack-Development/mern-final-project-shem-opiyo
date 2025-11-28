const express = require('express');
const { body } = require('express-validator');
const { auth } = require('../utils/auth');
const {
  createOrUpdateFeedback,
  getFeedbackForJunior,
  getFeedbackSummary,
  getFeedbackForInteraction
} = require('../controllers/feedbackController');

const router = express.Router();

// @route   POST api/feedback
// @desc    Create or update feedback for a junior's interaction
// @access  Private (advocates only)
router.post('/', auth, (req, res, next) => {
  if (req.user.userType !== 'advocate') {
    return res.status(403).json({ message: 'Only advocates can provide feedback' });
  }
  createOrUpdateFeedback(req, res).catch(next);
});

// @route   GET api/feedback/junior/:juniorId
// @desc    Get feedback for a junior's interactions
// @access  Private (advocates only, for their supervised juniors)
router.get('/junior/:juniorId', auth, (req, res, next) => {
  if (req.user.userType !== 'advocate') {
    return res.status(403).json({ message: 'Only advocates can view feedback' });
  }
  getFeedbackForJunior(req, res).catch(next);
});

// @route   GET api/feedback/junior/:juniorId/summary
// @desc    Get feedback summary for a junior
// @access  Private (advocates only, for their supervised juniors)
router.get('/junior/:juniorId/summary', auth, (req, res, next) => {
  if (req.user.userType !== 'advocate') {
    return res.status(403).json({ message: 'Only advocates can view feedback summary' });
  }
  getFeedbackSummary(req, res).catch(next);
});

// @route   GET api/feedback/interaction/:interactionId
// @desc    Get feedback for a specific interaction
// @access  Private
router.get('/interaction/:interactionId', auth, getFeedbackForInteraction);

module.exports = router;