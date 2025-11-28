const express = require('express');
const { body } = require('express-validator');
const { auth } = require('../utils/auth');
const {
  getCaseChat,
  sendMessage,
  getUserChats,
  markMessagesAsRead
} = require('../controllers/chatController');

const router = express.Router();

// @route   GET api/chats/case/:caseId
// @desc    Get chat for a specific case
// @access  Private
router.get('/case/:caseId', auth, getCaseChat);

// @route   POST api/chats/message
// @desc    Send a message in a chat
// @access  Private
router.post('/message', auth, [
  body('caseId', 'Case ID is required').not().isEmpty(),
  body('content', 'Message content is required').not().isEmpty()
], sendMessage);

// @route   GET api/chats
// @desc    Get all chats for current user
// @access  Private
router.get('/', auth, getUserChats);

// @route   PUT api/chats/read
// @desc    Mark messages as read
// @access  Private
router.put('/read', auth, [
  body('caseId', 'Case ID is required').not().isEmpty()
], markMessagesAsRead);

module.exports = router;