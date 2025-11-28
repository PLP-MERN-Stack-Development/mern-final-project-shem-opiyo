const Case = require('../models/Case');
const User = require('../models/User');
const Chat = require('../models/Chat');

// Create a new case
const createCase = async (req, res) => {
  try {
    const { title, description, category, priority, assignedJunior } = req.body;

    // Verify the client exists and is of correct type
    const client = await User.findById(req.user.id);
    if (!client || client.userType !== 'client') {
      return res.status(400).json({ message: 'Only clients can create cases' });
    }

    // Create new case
    const newCase = new Case({
      title,
      description,
      category,
      priority,
      client: req.user.id
    });

    // If a junior is assigned, update the case
    if (assignedJunior) {
      const junior = await User.findById(assignedJunior);
      if (junior && junior.userType === 'junior') {
        newCase.assignedJunior = junior._id;
        
        // If junior has a supervisor, assign the advocate too
        if (junior.supervisor) {
          newCase.assignedAdvocate = junior.supervisor;
        }
      }
    }

    await newCase.save();

    // Create a chat for this case with the client and assigned junior
    if (assignedJunior) {
      const chat = new Chat({
        participants: [req.user.id, assignedJunior],
        caseId: newCase._id,
        lastMessage: `Case "${title}" has been created and assigned to you.`
      });
      await chat.save();
    }

    res.status(201).json(newCase);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get all cases for a user (based on user type)
const getUserCases = async (req, res) => {
  try {
    const userId = req.user.id;
    const userType = req.user.userType;

    let cases;
    if (userType === 'client') {
      // Clients see their own cases
      cases = await Case.find({ client: userId })
        .populate('assignedJunior', 'firstName lastName email')
        .populate('assignedAdvocate', 'firstName lastName email')
        .sort({ createdAt: -1 });
    } else if (userType === 'junior') {
      // Juniors see cases assigned to them
      cases = await Case.find({ assignedJunior: userId })
        .populate('client', 'firstName lastName email')
        .populate('assignedAdvocate', 'firstName lastName email')
        .sort({ createdAt: -1 });
    } else if (userType === 'advocate') {
      // Advocates see cases assigned to their juniors
      cases = await Case.find({ assignedAdvocate: userId })
        .populate('client', 'firstName lastName email')
        .populate('assignedJunior', 'firstName lastName email')
        .sort({ createdAt: -1 });
    }

    res.json(cases);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get a specific case by ID
const getCaseById = async (req, res) => {
  try {
    const caseId = req.params.id;
    const userCase = await Case.findById(caseId)
      .populate('client', 'firstName lastName email')
      .populate('assignedJunior', 'firstName lastName email profilePicture')
      .populate('assignedAdvocate', 'firstName lastName email profilePicture');

    if (!userCase) {
      return res.status(404).json({ message: 'Case not found' });
    }

    // Check if user has permission to view this case
    const userId = req.user.id;
    const userType = req.user.userType;

    let hasPermission = false;
    if (userType === 'client' && userCase.client._id.toString() === userId) {
      hasPermission = true;
    } else if (userType === 'junior' && userCase.assignedJunior && userCase.assignedJunior._id.toString() === userId) {
      hasPermission = true;
    } else if (userType === 'advocate' && userCase.assignedAdvocate && userCase.assignedAdvocate._id.toString() === userId) {
      hasPermission = true;
    }

    if (!hasPermission) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(userCase);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Update a case
const updateCase = async (req, res) => {
  try {
    const caseId = req.params.id;
    const updates = req.body;

    const userCase = await Case.findById(caseId);
    if (!userCase) {
      return res.status(404).json({ message: 'Case not found' });
    }

    // Check permissions
    const userId = req.user.id;
    const userType = req.user.userType;

    // Only allow clients to update their own cases, and advocates to update any case in their supervision
    let canUpdate = false;
    if (userType === 'client' && userCase.client.toString() === userId) {
      canUpdate = true;
    } else if (userType === 'advocate' && userCase.assignedAdvocate && userCase.assignedAdvocate.toString() === userId) {
      canUpdate = true;
    }

    if (!canUpdate) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Update allowed fields based on user type
    if (userType === 'client') {
      // Clients can only update title, description, priority, and status (to certain values)
      if (updates.title) userCase.title = updates.title;
      if (updates.description) userCase.description = updates.description;
      if (updates.priority) userCase.priority = updates.priority;
      
      // Clients can only close their own cases
      if (updates.status && ['closed'].includes(updates.status) && userCase.client.toString() === userId) {
        userCase.status = updates.status;
      }
    } else if (userType === 'advocate') {
      // Advocates can update most fields
      if (updates.title) userCase.title = updates.title;
      if (updates.description) userCase.description = updates.description;
      if (updates.category) userCase.category = updates.category;
      if (updates.status) userCase.status = updates.status;
      if (updates.priority) userCase.priority = updates.priority;
      if (updates.assignedJunior) {
        // Verify the assigned junior is under this advocate's supervision
        const junior = await User.findById(updates.assignedJunior);
        if (junior && junior.supervisor && junior.supervisor.toString() === userId) {
          userCase.assignedJunior = updates.assignedJunior;
        }
      }
      if (updates.resolution) userCase.resolution = updates.resolution;
      if (updates.deadline) userCase.deadline = updates.deadline;
    }

    userCase.updatedAt = Date.now();
    await userCase.save();

    res.json(userCase);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Assign a junior to a case
const assignJuniorToCase = async (req, res) => {
  try {
    const { caseId, juniorId } = req.body;

    // Find the case
    const userCase = await Case.findById(caseId);
    if (!userCase) {
      return res.status(404).json({ message: 'Case not found' });
    }

    // Find the junior
    const junior = await User.findById(juniorId);
    if (!junior || junior.userType !== 'junior') {
      return res.status(404).json({ message: 'Junior legal assistant not found' });
    }

    // Check if the current user is an advocate supervising this junior
    if (req.user.userType !== 'advocate' || req.user.id !== junior.supervisor.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Assign the junior to the case
    userCase.assignedJunior = juniorId;
    userCase.assignedAdvocate = req.user.id; // Also assign the supervising advocate
    userCase.status = 'in-progress';
    userCase.updatedAt = Date.now();

    await userCase.save();

    // Update the chat to include the junior if not already included
    let chat = await Chat.findOne({ caseId: caseId });
    if (chat) {
      if (!chat.participants.includes(juniorId)) {
        chat.participants.push(juniorId);
        chat.lastMessage = `Junior legal assistant assigned to the case.`;
        chat.lastMessageTime = Date.now();
        await chat.save();
      }
    } else {
      // Create a new chat for this case
      chat = new Chat({
        participants: [userCase.client, juniorId],
        caseId: caseId,
        lastMessage: `Junior legal assistant assigned to the case.`,
        lastMessageTime: Date.now()
      });
      await chat.save();
    }

    res.json(userCase);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Close a case
const closeCase = async (req, res) => {
  try {
    const caseId = req.params.id;
    const { resolution } = req.body;

    const userCase = await Case.findById(caseId);
    if (!userCase) {
      return res.status(404).json({ message: 'Case not found' });
    }

    // Check permissions - only advocates and clients can close cases
    const userId = req.user.id;
    const userType = req.user.userType;

    if (userType === 'client' && userCase.client.toString() !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    } else if (userType === 'advocate' && userCase.assignedAdvocate.toString() !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Update case status and resolution
    userCase.status = 'closed';
    if (resolution) {
      userCase.resolution = resolution;
    }
    userCase.updatedAt = Date.now();

    await userCase.save();

    res.json(userCase);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  createCase,
  getUserCases,
  getCaseById,
  updateCase,
  assignJuniorToCase,
  closeCase
};