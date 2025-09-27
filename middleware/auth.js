const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();  // Load environment variables

// Protect middleware to check if user or agent is authenticated
exports.protect = async (req, res, next) => {
  // Get token from cookies
  const token = req.cookies.token;

  // If token is not present, redirect to the login page
  if (!token) {
    return res.redirect('/login');
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user/agent from the database using decoded token ID
    req.user = await User.findById(decoded.id);
    
    // If user/agent does not exist, send unauthorized response
    if (!req.user) {
      return res.status(401).send('Not authorized');
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If token is invalid or expired, return unauthorized status
    return res.status(401).send('Not authorized');
  }
};



/*
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();  // Load environment variables

// Protect middleware to check if user or agent is authenticated
exports.protect = async (req, res, next) => {
  // Get token from cookies
  const token = req.cookies.token;

  // If token is not present, redirect to the login page
  if (!token) {
    return res.redirect('/login');
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user/agent from the database using decoded token ID
    req.user = await User.findById(decoded.id);

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If token is invalid or expired, return unauthorized status
    return res.status(401).send('Not authorized');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find user or agent based on the decoded ID
    req.user = await User.findById(decoded.id);  // Assuming users and agents are in the same model
    if (!req.user) {
      return res.status(401).send('Not authorized');
    }
    next();
  } catch (err) {
    return res.status(401).send('Not authorized');
  }
};
*/