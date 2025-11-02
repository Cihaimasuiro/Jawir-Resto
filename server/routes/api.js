const express = require('express');
const router = express.Router();

// Import controllers
const authController = require('../controllers/authController');
const commentController = require('../controllers/commentController');

// Import middleware
const authMiddleware = require('../middleware/authMiddleware');

// --- Auth Routes ---
// POST /api/users/signup
router.post('/users/signup', authController.signup);

// POST /api/users/signin
router.post('/users/signin', authController.signin);


// --- Comment Routes ---
// POST /api/comments (Protected: user must be logged in)
router.post('/comments', authMiddleware.verifyToken, commentController.postComment);

// GET /api/website_comments/:id (Protected: user must be logged in)
router.get('/website_comments/:id', authMiddleware.verifyToken, commentController.getComments);


module.exports = router;