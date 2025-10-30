/*
// user.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Paths to the user and agent JSON files
const usersFilePath = path.join(__dirname, '../data/user.json');
const agentsFilePath = path.join(__dirname, '../data/agent.json');

// Login route
router.post('/login', (req, res, next) => {
    const { email, password } = req.body;

    // Read users.json
    fs.readFile(usersFilePath, 'utf-8', (err, usersData) => {
        if (err) {
            const error = new Error('Error reading user data');
            error.status = 500;
            return next(error);
        }

        let users = [];
        if (usersData) {
            users = JSON.parse(usersData);
        }

        // Check if the user exists in users.json
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            // If user is found, store user in session and redirect to user dashboard
            req.session.userId = user.email;
            req.session.user = user;
            return res.redirect('/dashboard/user');
        }

        // If user not found, check in agents.json
        fs.readFile(agentsFilePath, 'utf-8', (err, agentsData) => {
            if (err) {
                const error = new Error('Error reading agent data');
                error.status = 500;
                return next(error);
            }

            let agents = [];
            if (agentsData) {
                agents = JSON.parse(agentsData);
            }

            // Check if the agent exists in agents.json
            const agent = agents.find(agent => agent.agentemail === email && agent.agentpassword === password);

            if (agent) {
                // If agent is found, store agent in session and redirect to agent dashboard
                req.session.userId = agent.agentemail;
                req.session.agent = agent;
                return res.redirect('/dashboard/agent');
            }

            // If no user or agent is found, return an error
            return res.status(401).render('login', { errorMessage: 'Invalid email or password' });
        });
    });
});

// Dashboard route for users
router.get('/dashboard/user', (req, res) => {
    if (!req.session.userId || !req.session.user) {
        return res.redirect('/login'); // Redirect to login if not authenticated
    }
    res.render('user_dashboard', { user: req.session.user });
});

// Dashboard route for agents
router.get('/dashboard/agent', (req, res) => {
    if (!req.session.userId || !req.session.agent) {
        return res.redirect('/login'); // Redirect to login if not authenticated
    }
    res.render('agent_dashboard', { agentname: req.session.userId }); // Use agentname in the dashboard
});


// Logout route
router.get('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Could not log out. Please try again.");
        }

        // Redirect to login page after logout
        res.redirect('/login');
    });
});


module.exports = router;
*/

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Assuming the Agent is part of this model or a separate model
const bcrypt = require('bcryptjs');
const { protect } = require('../middleware/auth');
require('dotenv').config();  // Load environment variables

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password, phone, city } = req.body;

  try {
      // Check if the user already exists in the database
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).send('User with this email already exists');
      }

      // Create a new user instance and save to the database
      const newUser = new User({ username, email, password, phone, city, role: 'user' });
      await newUser.save();

      // Sign the JWT token with the user's ID
      const token = jwt.sign(
          { id: newUser._id, role: newUser.role }, // Include user ID and role in the token
          process.env.JWT_SECRET,
          { expiresIn: '1h' } // Token expires in 1 hour
      );

      // Set the token in an HTTP-only cookie
      res.cookie('token', token, { httpOnly: true });

      // Redirect to user dashboard after successful registration
      res.redirect('/user/dashboard');
  } catch (err) {
      console.error(err);
      res.status(500).send('Error registering user');
  }
});

// Login route for users and agents
router.post('/login', async (req, res) => {
  const { email, password } = req.body;  // role is inferred from the user record, not the form

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send('Invalid credentials');
    }

    // Generate JWT token with user ID and role
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Store the token in an HTTP-only cookie
    res.cookie('token', token, { httpOnly: true });

    // Redirect based on user role
    if (user.role === 'agent') {
      return res.redirect('/agent/dashboard');
    } else {
      return res.redirect('/user/dashboard');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
});


// Protected Dashboard route for users
router.get('/dashboard/user', protect, (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).send('Forbidden');
  }
  res.render('user_dashboard', { user: req.user });
});

// Protected Dashboard route for agents
router.get('/dashboard/agent', protect, (req, res) => {
  if (req.user.role !== 'agent') {
    return res.status(403).send('Forbidden');
  }
  res.render('agent_dashboard', { agentname: req.user.name });
});


// Protected routes for user pages
router.get('/my-bookings', protect, (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).send('Forbidden');
  }
  res.render('user/my-bookings', { user: req.user });
});

router.get('/spots', protect, (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).send('Forbidden');
  }
  res.render('user/spots', { user: req.user });
});

router.get('/book-flight', protect, (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).send('Forbidden');
  }
  res.render('user/book-flight', { user: req.user });
});

router.get('/agency', protect, (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).send('Forbidden');
  }
  res.render('user/agency', { user: req.user });
});

router.get('/flight-status', protect, (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).send('Forbidden');
  }
  res.render('user/flight-status', { user: req.user });
});

router.get('/manage-preferences', protect, (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).send('Forbidden');
  }
  res.render('user/manage-preferences', { user: req.user });
});

router.get('/payment-methods', protect, (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).send('Forbidden');
  }
  res.render('user/payment-methods', { user: req.user });
});

router.get('/travel-alerts', protect, (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).send('Forbidden');
  }
  res.render('user/travel-alerts', { user: req.user });
});

router.get('/suggestions', protect, (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).send('Forbidden');
  }
  res.render('user/suggestions', { user: req.user });
});

router.get('/profile', protect, (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).send('Forbidden');
  }
  res.render('user/profile', { user: req.user });
});

router.get('/history', protect, (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).send('Forbidden');
  }
  res.render('user/history', { user: req.user });
});

// POST route to update user profile
router.post('/profile', protect, async (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).send('Forbidden');
  }

  const { username, email, phone, city, bio } = req.body;

  try {
    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { username, email, phone, city, bio },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    // Update the session with new user data
    req.user = updatedUser;

    // Redirect back to profile page with success message or just render
    res.render('user/profile', { user: updatedUser, successMessage: 'Profile updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating profile');
  }
});

// POST route to change user password
router.post('/change-password', protect, async (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).send('Forbidden');
  }

  const { currentPassword, newPassword } = req.body;

  try {
    // Check if current password is correct
    const isMatch = await req.user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.render('user/profile', { user: req.user, errorMessage: 'Current password is incorrect' });
    }

    // Update password
    req.user.password = newPassword;
    await req.user.save();

    res.render('user/profile', { user: req.user, successMessage: 'Password changed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error changing password');
  }
});

// GET route for manage privacy
router.get('/privacy', protect, (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).send('Forbidden');
  }
  res.render('user/privacy', { user: req.user });
});

// POST route to delete user account
router.post('/delete-account', protect, async (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).send('Forbidden');
  }

  try {
    await User.findByIdAndDelete(req.user._id);
    res.clearCookie('token');
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting account');
  }
});

// Logout route
router.get('/logout', (req, res) => {
  // Clear the JWT cookie by setting it with an empty value and immediate expiration
  res.cookie('token', '', {
    httpOnly: true, // Ensure it matches the attributes used when setting the cookie
    expires: new Date(0)  // Expire the cookie immediately
  });

  // Redirect to the login page or homepage after successful logout
  res.redirect('/login');
});


module.exports = router;
