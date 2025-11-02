const Comment = require('../models/comment');

// --- Post a New Comment ---
exports.postComment = async (req, res) => {
  const { comment, websiteId } = req.body;
  // Get the user ID from the token (added by authMiddleware)
  const userId = req.user.id; 

  try {
    // Create new comment
    const newComment = new Comment({
      comment,
      website_id: websiteId,
      user: userId
    });

    // Save comment to database
    const savedComment = await newComment.save();

    res.status(201).json(savedComment);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// --- Get All Comments for a Website ---
exports.getComments = async (req, res) => {
  const websiteId = req.params.id;

  try {
    // Find all comments matching the website_id
    // Sort by createdAt descending (newest first)
    // Populate the 'user' field, but only select the 'username'
    const comments = await Comment.find({ website_id: websiteId })
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    // Send the comments back in the same format as the old API
    res.json({ data: comments });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};