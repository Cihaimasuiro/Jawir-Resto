const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  // Get the token from the "Authorization" header
  const authHeader = req.headers['authorization'];
  
  // The header should be in the format: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  // If no token is provided
  if (token == null) {
    return res.status(401).json({ message: 'No token provided, authorization denied.' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add the user's info (from the token) to the request object
    req.user = decoded.user;
    
    // Continue to the next function (the controller)
    next();
  } catch (err) {
    // If token is invalid (expired, wrong secret, etc.)
    res.status(401).json({ message: 'Token is not valid.' });
  }
};