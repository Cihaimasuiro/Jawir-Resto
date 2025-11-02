const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// --- User Registration (Signup) ---
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    // Generate a unique website_id for the user
    const website_id = new mongoose.Types.ObjectId().toString();

    // Create a new user instance
    // The password will be hashed by the pre-save hook in User.js
    user = new User({
      username,
      email,
      password,
      website_id
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User registered successfully!' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// --- User Login (Signin) ---
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Create the JWT payload
    const payload = {
      user: {
        id: user.id,
        website_id: user.website_id,
        username: user.username
      }
    };

    // Sign the token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        // Send the token and user info back to the front-end
        res.json({
          token,
          user: {
            username: user.username,
            email: user.email,
            website_id: user.website_id
          }
        });
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};