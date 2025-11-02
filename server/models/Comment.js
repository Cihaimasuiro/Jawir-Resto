const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true
  },
  // The "website" this comment belongs to (links to User.website_id)
  website_id: {
    type: String,
    required: true,
    index: true // Adds an index for faster searching
  },
  // The user who wrote the comment (links to the User model)
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // This "ref" tells Mongoose it links to the 'User' model
    required: true
  }
}, {
  // Adds createdAt and updatedAt timestamps
  timestamps: true
});

module.exports = mongoose.model('Comment', CommentSchema);