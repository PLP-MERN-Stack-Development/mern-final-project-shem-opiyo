const Feedback = require('../models/Feedback');
const Chat = require('../models/Chat');
const Case = require('../models/Case');
const User = require('../models/User');

// Create or update feedback for a junior's interaction
const createOrUpdateFeedback = async (req, res) => {
  try {
    const { interactionId, juniorId, caseId, reactionType, comment, improvementAreas, recommendedReading } = req.body;
    const reviewerId = req.user.id;

    // Verify that the reviewer is an advocate
    const reviewer = await User.findById(reviewerId);
    if (!reviewer || reviewer.userType !== 'advocate') {
      return res.status(403).json({ message: 'Only advocates can provide feedback' });
    }

    // Verify that the junior is under this advocate's supervision
    const junior = await User.findById(juniorId);
    if (!junior || junior.userType !== 'junior' || junior.supervisor.toString() !== reviewerId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Verify the interaction exists
    const chat = await Chat.findById(interactionId);
    if (!chat) {
      return res.status(404).json({ message: 'Interaction not found' });
    }

    // Check if feedback already exists for this interaction and reviewer
    let feedback = await Feedback.findOne({ 
      interactionId: interactionId, 
      reviewer: reviewerId,
      junior: juniorId,
      caseId: caseId 
    });

    if (feedback) {
      // Update existing feedback
      if (reactionType) {
        if (feedback.reactions[reactionType]) {
          // If user already reacted with this type, remove the reaction
          const userIndex = feedback.reactions[reactionType].users.findIndex(user => user.toString() === reviewerId);
          if (userIndex > -1) {
            feedback.reactions[reactionType].users.splice(userIndex, 1);
            feedback.reactions[reactionType].count -= 1;
          } else {
            // Add the reaction
            feedback.reactions[reactionType].users.push(reviewerId);
            feedback.reactions[reactionType].count += 1;
          }
        }
      }
      
      if (comment) feedback.comment = comment;
      if (improvementAreas) feedback.improvementAreas = improvementAreas;
      if (recommendedReading) feedback.recommendedReading = recommendedReading;
      
      feedback.updatedAt = Date.now();
      await feedback.save();
    } else {
      // Create new feedback
      feedback = new Feedback({
        interactionId,
        reviewer: reviewerId,
        junior: juniorId,
        caseId,
        comment: comment || '',
        improvementAreas: improvementAreas || [],
        recommendedReading: recommendedReading || []
      });

      // Add reaction if provided
      if (reactionType && feedback.reactions[reactionType]) {
        feedback.reactions[reactionType].users.push(reviewerId);
        feedback.reactions[reactionType].count += 1;
      }

      await feedback.save();
    }

    res.json(feedback);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get feedback for a junior's interactions
const getFeedbackForJunior = async (req, res) => {
  try {
    const juniorId = req.params.juniorId;
    const reviewerId = req.user.id;

    // Verify that the reviewer is an advocate and supervises this junior
    const reviewer = await User.findById(reviewerId);
    if (!reviewer || reviewer.userType !== 'advocate') {
      return res.status(403).json({ message: 'Only advocates can view feedback' });
    }

    const junior = await User.findById(juniorId);
    if (!junior || junior.userType !== 'junior' || junior.supervisor.toString() !== reviewerId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const feedbackList = await Feedback.find({ junior: juniorId })
      .populate('reviewer', 'firstName lastName email')
      .populate('caseId', 'title description')
      .populate('interactionId', 'lastMessage lastMessageTime')
      .sort({ createdAt: -1 });

    res.json(feedbackList);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get feedback summary for a junior
const getFeedbackSummary = async (req, res) => {
  try {
    const juniorId = req.params.juniorId;

    // Verify access
    const reviewer = await User.findById(req.user.id);
    const junior = await User.findById(juniorId);
    
    if (!reviewer || !junior || 
        reviewer.userType !== 'advocate' || 
        junior.userType !== 'junior' || 
        junior.supervisor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Get all feedback for this junior
    const feedbackList = await Feedback.find({ junior: juniorId });

    // Calculate summary statistics
    const summary = {
      totalFeedback: feedbackList.length,
      thumbsUpCount: 0,
      heartCount: 0,
      bookCount: 0,
      averageReactions: 0,
      commonImprovementAreas: {},
      commonRecommendedReading: {}
    };

    feedbackList.forEach(feedback => {
      summary.thumbsUpCount += feedback.reactions.thumbsUp.count;
      summary.heartCount += feedback.reactions.heart.count;
      summary.bookCount += feedback.reactions.book.count;

      // Count improvement areas
      feedback.improvementAreas.forEach(area => {
        summary.commonImprovementAreas[area] = (summary.commonImprovementAreas[area] || 0) + 1;
      });

      // Count recommended readings
      feedback.recommendedReading.forEach(reading => {
        summary.commonRecommendedReading[reading] = (summary.commonRecommendedReading[reading] || 0) + 1;
      });
    });

    summary.averageReactions = (summary.thumbsUpCount + summary.heartCount + summary.bookCount) / (summary.totalFeedback || 1);

    res.json(summary);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get feedback for a specific interaction
const getFeedbackForInteraction = async (req, res) => {
  try {
    const interactionId = req.params.interactionId;

    // Verify the user has access to this interaction
    const chat = await Chat.findById(interactionId);
    if (!chat) {
      return res.status(404).json({ message: 'Interaction not found' });
    }

    // Check if the user is involved in this chat or supervises someone who is
    const userId = req.user.id;
    const userType = req.user.userType;

    let hasAccess = false;
    if (chat.participants.some(p => p.toString() === userId)) {
      hasAccess = true;
    } else if (userType === 'advocate') {
      // Check if any participant is supervised by this advocate
      for (const participantId of chat.participants) {
        const participant = await User.findById(participantId);
        if (participant && participant.supervisor && participant.supervisor.toString() === userId) {
          hasAccess = true;
          break;
        }
      }
    }

    if (!hasAccess) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const feedback = await Feedback.find({ interactionId: interactionId })
      .populate('reviewer', 'firstName lastName email')
      .populate('junior', 'firstName lastName email');

    res.json(feedback);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  createOrUpdateFeedback,
  getFeedbackForJunior,
  getFeedbackSummary,
  getFeedbackForInteraction
};