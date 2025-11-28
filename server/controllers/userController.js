const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Register a new user
const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password, userType, specialization, barNumber } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      firstName,
      lastName,
      email,
      password,
      userType,
      specialization: userType === 'advocate' ? specialization : undefined,
      barNumber: userType === 'advocate' ? barNumber : undefined
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Set grace period for junior legal assistants
    if (userType === 'junior') {
      user.gracePeriodExpiry = new Date();
      user.gracePeriodExpiry.setDate(user.gracePeriodExpiry.getDate() + 30); // 30 days from now
    }

    await user.save();

    // Create JWT token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'default_secret', { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
        profilePicture: user.profilePicture,
        specialization: user.specialization,
        barNumber: user.barNumber
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'default_secret', { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
        profilePicture: user.profilePicture,
        specialization: user.specialization,
        barNumber: user.barNumber,
        supervisor: user.supervisor,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get current user profile
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, bio, location, education, experience, specialization } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (bio) user.bio = bio;
    if (location) user.location = location;
    if (education) user.education = education;
    if (experience) user.experience = experience;
    if (specialization && user.userType === 'advocate') user.specialization = specialization;

    await user.save();

    res.json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userType: user.userType,
      profilePicture: user.profilePicture,
      bio: user.bio,
      location: user.location,
      education: user.education,
      experience: user.experience,
      specialization: user.specialization
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get all junior legal assistants without supervisors
const getUnsupervisedJuniors = async (req, res) => {
  try {
    const juniors = await User.find({
      userType: 'junior',
      supervisor: null
    }).select('-password');

    res.json(juniors);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Accept or reject a junior legal assistant into community
const manageJuniorRequest = async (req, res) => {
  try {
    const { juniorId, action } = req.body; // action: 'accept' or 'reject'
    const advocateId = req.user.id;

    const junior = await User.findById(juniorId);
    const advocate = await User.findById(advocateId);

    if (!junior || !advocate) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (junior.userType !== 'junior' || advocate.userType !== 'advocate') {
      return res.status(400).json({ message: 'Invalid user types' });
    }

    if (action === 'accept') {
      junior.supervisor = advocateId;
      junior.gracePeriodExpiry = null; // Clear grace period
      await junior.save();

      // Add junior to advocate's supervisees
      if (!advocate.supervisees.includes(juniorId)) {
        advocate.supervisees.push(juniorId);
        await advocate.save();
      }

      res.json({ message: 'Junior accepted successfully', junior });
    } else if (action === 'reject') {
      // Don't remove junior, just leave them without supervisor
      // They will be removed after grace period if they don't find a supervisor
      res.json({ message: 'Junior request rejected' });
    } else {
      res.status(400).json({ message: 'Invalid action' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get junior legal assistants supervised by current advocate
const getSupervisedJuniors = async (req, res) => {
  try {
    const juniors = await User.find({
      supervisor: req.user.id
    }).select('-password');

    res.json(juniors);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get advocate's profile (for juniors to view)
const getAdvocateProfile = async (req, res) => {
  try {
    const advocate = await User.findById(req.params.id)
      .select('-password')
      .populate('supervisees', 'firstName lastName email specialization');

    if (!advocate || advocate.userType !== 'advocate') {
      return res.status(404).json({ message: 'Advocate not found' });
    }

    res.json(advocate);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  getUserById,
  updateUserProfile,
  getUnsupervisedJuniors,
  manageJuniorRequest,
  getSupervisedJuniors,
  getAdvocateProfile
};