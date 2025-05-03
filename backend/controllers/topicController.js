const Topic = require('../models/Topic');
const User = require('../models/User');

exports.getTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.status(200).json(topics);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching topics' });
  }
};

exports.completeProblem = async (req, res) => {
  const { problemId } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user.completedProblems.includes(problemId)) {
      user.completedProblems.push(problemId);
      await user.save();
    }
    res.status(200).json({ message: 'Problem marked as completed' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating problem status' });
  }
};
