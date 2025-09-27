const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import your user model
const User = require('../models/User'); // Update the path according to your project structure

// Middleware to check authentication
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login'); // Redirect to login page if not authenticated
}

// Route to render user profile
router.get('/profile', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user._id; // Assuming user ID is stored in req.user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Render the profile page with user details
        res.render('profile', { user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to update customer details
router.post('/update/customer', isAuthenticated, async (req, res) => {
    const { _id, username, email, phone, city } = req.body;

    try {
        await User.findByIdAndUpdate(_id, { username, email, phone, city });
        res.sendStatus(200); // Send back a success response
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to update agent details
router.post('/update/agent', isAuthenticated, async (req, res) => {
    const { _id, agentname, agentemail, agentpassword, agentid } = req.body;

    try {
        await User.findByIdAndUpdate(_id, { agentname, agentemail, agentpassword, agentid });
        res.sendStatus(200); // Send back a success response
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
