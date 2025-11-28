const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const { checkGracePeriod } = require('./middleware/gracePeriod');

// Load environment variables
dotenv.config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const caseRoutes = require('./routes/caseRoutes');
const chatRoutes = require('./routes/chatRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// Apply grace period check to all routes that require authentication
app.use('/api/users/me', checkGracePeriod);
app.use('/api/users/profile', checkGracePeriod);
app.use('/api/cases', checkGracePeriod);
app.use('/api/chats', checkGracePeriod);
app.use('/api/feedback', checkGracePeriod);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/feedback', feedbackRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/probono-legal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((error) => {
  console.error('Database connection error:', error);
});