const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  interactionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat', // Reference to the chat interaction
    required: true
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // The advocate giving feedback
    required: true
  },
  junior: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // The junior legal assistant receiving feedback
    required: true
  },
  caseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Case',
    required: true
  },
  reactions: {
    thumbsUp: {
      count: {
        type: Number,
        default: 0
      },
      users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }]
    },
    heart: {
      count: {
        type: Number,
        default: 0
      },
      users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }]
    },
    book: {
      count: {
        type: Number,
        default: 0
      },
      users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }]
    }
  },
  comment: {
    type: String,
    default: ''
  },
  improvementAreas: [String], // Areas where the junior can improve
  recommendedReading: [String], // Legal resources recommended by the advocate
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Feedback', feedbackSchema);