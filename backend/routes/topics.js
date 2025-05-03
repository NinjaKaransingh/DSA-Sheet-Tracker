const express = require('express');
const Topic = require('../models/Topic');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all topics
router.get('/', auth, async (req, res) => {
  try {
    const topics = await Topic.find();
    res.status(200).json(topics);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Mark problem as completed
router.post('/complete', auth, async (req, res) => {
  const { problemId } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user.completedProblems.includes(problemId)) {
      user.completedProblems.push(problemId);
      await user.save();
    }
    res.status(200).json({ message: 'Problem marked as completed' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
