const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // User model used for both users and agents
const { protect } = require('../middleware/auth');
require('dotenv').config();  // Load environment variables

const router = express.Router();

router.post('/register', async (req, res) => {
  const { agentname, agentemail, agentpassword, agentid } = req.body;

  try {
      // Check if the agent already exists in the database (use email to check uniqueness)
      const existingUser = await User.findOne({ email: agentemail });
      if (existingUser) {
          return res.status(400).send('Agent with this email already exists');
      }

      // Create a new agent instance and save it to the database
      const newUser = new User({
          username: agentname,  // Use 'username' field from the model
          email: agentemail,    // Use 'email' field from the model
          password: agentpassword,  // Use 'password' field from the model
          agentId: agentid,     // Use 'agentId' field from the model
          role: 'agent'         // Set role as 'agent'
      });

      // Save the agent to the database
      await newUser.save();

      // Sign the JWT token with the agent's ID
      const token = jwt.sign(
          { id: newUser._id, role: newUser.role }, // Include agent ID and role in the token
          process.env.JWT_SECRET,
          { expiresIn: '1h' } // Token expires in 1 hour
      );

      // Set the token in an HTTP-only cookie
      res.cookie('token', token, { httpOnly: true });

      // Redirect to agent dashboard after successful registration
      res.redirect('/agent/dashboard');
  } catch (err) {
      console.error(err);
      res.status(500).send('Error registering agent');
  }
});

module.exports = router;
