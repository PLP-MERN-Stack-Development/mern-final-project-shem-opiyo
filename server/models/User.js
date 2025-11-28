const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  userType: {
    type: String,
    enum: ['client', 'junior', 'advocate'],
    required: true
  },
  profilePicture: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  education: {
    institution: String,
    degree: String,
    year: Number
  },
  experience: {
    years: Number,
    description: String
  },
  specialization: [String], // For lawyers
  barNumber: {
    type: String,
    default: '' // For qualified advocates
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null // For junior legal assistants
  },
  supervisees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }], // For advocates
  isActive: {
    type: Boolean,
    default: true
  },
  gracePeriodExpiry: {
    type: Date,
    default: null // For junior legal assistants to join an advocate
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);