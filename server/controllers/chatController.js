const Chat = require('../models/Chat');
const Case = require('../models/Case');
const User = require('../models/User');

// Get chat for a specific case
const getCaseChat = async (req, res) => {
  try {
    const caseId = req.params.caseId;

    // Verify the user has access to this case
    const userCase = await Case.findById(caseId);
    if (!userCase) {
      return res.status(404).json({ message: 'Case not found' });
    }

    const userId = req.user.id;
    const userType = req.user.userType;

    let hasAccess = false;
    if (userType === 'client' && userCase.client.toString() === userId) {
      hasAccess = true;
    } else if (userType === 'junior' && userCase.assignedJunior && userCase.assignedJunior.toString() === userId) {
      hasAccess = true;
    } else if (userType === 'advocate' && userCase.assignedAdvocate && userCase.assignedAdvocate.toString() === userId) {
      hasAccess = true;
    }

    if (!hasAccess) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Find the chat for this case
    const chat = await Chat.findOne({ caseId: caseId })
      .populate('participants', 'firstName lastName profilePicture userType')
      .populate('messages.sender', 'firstName lastName profilePicture userType');

    if (!chat) {
      // Create a new chat if it doesn't exist
      const newChat = new Chat({
        participants: [userCase.client],
        caseId: caseId,
        lastMessage: `Case discussion started.`
      });

      // Add junior if assigned
      if (userCase.assignedJunior) {
        newChat.participants.push(userCase.assignedJunior);
      }

      // Add advocate if assigned
      if (userCase.assignedAdvocate) {
        newChat.participants.push(userCase.assignedAdvocate);
      }

      await newChat.save();

      return res.json(newChat);
    }

    res.json(chat);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Send a message in a chat
const sendMessage = async (req, res) => {
  try {
    const { caseId, content } = req.body;
    const senderId = req.user.id;

    // Verify the user has access to this case
    const userCase = await Case.findById(caseId);
    if (!userCase) {
      return res.status(404).json({ message: 'Case not found' });
    }

    const userType = req.user.userType;

    let hasAccess = false;
    if (userType === 'client' && userCase.client.toString() === senderId) {
      hasAccess = true;
    } else if (userType === 'junior' && userCase.assignedJunior && userCase.assignedJunior.toString() === senderId) {
      hasAccess = true;
    } else if (userType === 'advocate' && userCase.assignedAdvocate && userCase.assignedAdvocate.toString() === senderId) {
      hasAccess = true;
    }

    if (!hasAccess) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Find or create the chat
    let chat = await Chat.findOne({ caseId: caseId });
    if (!chat) {
      chat = new Chat({
        participants: [userCase.client],
        caseId: caseId,
        lastMessage: content,
        lastMessageTime: Date.now()
      });

      // Add junior if assigned
      if (userCase.assignedJunior) {
        chat.participants.push(userCase.assignedJunior);
      }

      // Add advocate if assigned
      if (userCase.assignedAdvocate) {
        chat.participants.push(userCase.assignedAdvocate);
      }

      await chat.save();
    }

    // Create and add the new message
    const newMessage = {
      sender: senderId,
      content: content,
      timestamp: Date.now()
    };

    chat.messages.push(newMessage);
    chat.lastMessage = content;
    chat.lastMessageTime = Date.now();

    await chat.save();

    // Populate the message sender for response
    await chat.populate('messages.sender', 'firstName lastName profilePicture userType');

    res.status(201).json(chat);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get all chats for a user
const getUserChats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all chats that the user is a participant in
    const chats = await Chat.find({ participants: userId })
      .populate('caseId', 'title description status priority')
      .populate('participants', 'firstName lastName profilePicture userType')
      .sort({ lastMessageTime: -1 });

    res.json(chats);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Mark messages as read
const markMessagesAsRead = async (req, res) => {
  try {
    const { caseId } = req.body;
    const userId = req.user.id;

    // Find the chat
    const chat = await Chat.findOne({ caseId: caseId, participants: userId });
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Update read status for this user
    for (let message of chat.messages) {
      const readStatus = message.readBy.find(r => r.user.toString() === userId);
      if (!readStatus) {
        message.readBy.push({
          user: userId,
          readAt: Date.now()
        });
      }
    }

    await chat.save();

    res.json({ message: 'Messages marked as read' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getCaseChat,
  sendMessage,
  getUserChats,
  markMessagesAsRead
};