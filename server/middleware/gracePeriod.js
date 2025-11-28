const User = require('../models/User');

// Middleware to check and handle grace periods for junior legal assistants
const checkGracePeriod = async (req, res, next) => {
  try {
    if (req.user && req.user.userType === 'junior') {
      const user = await User.findById(req.user.id);
      
      // Check if the user is past their grace period and still doesn't have a supervisor
      if (!user.supervisor && user.gracePeriodExpiry && new Date() > user.gracePeriodExpiry) {
        // Deactivate the user account
        user.isActive = false;
        await user.save();
        
        return res.status(403).json({ 
          message: 'Your account has been deactivated due to not joining an advocate community within the grace period.' 
        });
      }
    }
    
    next();
  } catch (error) {
    console.error('Error in grace period check:', error);
    res.status(500).send('Server error');
  }
};

module.exports = { checkGracePeriod };