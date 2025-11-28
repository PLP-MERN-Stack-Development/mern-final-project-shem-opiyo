const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Family Law', 'Criminal Law', 'Civil Rights', 'Immigration', 
      'Housing', 'Employment', 'Consumer Rights', 'Elder Law',
      'Disability Rights', 'Environmental Law', 'Other'
    ]
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'review', 'closed'],
    default: 'open'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedJunior: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  assignedAdvocate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  documents: [{
    name: String,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  deadline: Date,
  resolution: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Case', caseSchema);