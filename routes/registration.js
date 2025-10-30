
/*
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Path to the user.json and agent.json files
const usersFilePath = path.join(__dirname, '../data/user.json');
const agentFilePath = path.join(__dirname, '../data/agent.json');

// Middleware - user registration form submission
router.post('/register/user', (req, res, next) => {
    // console.log("Customer registration route hit");
    const {username, email, password, phone, city } = req.body;
    const newUser = { 
        username, email, password, phone, city };

    fs.readFile(usersFilePath, 'utf-8', (err, data) => {
        if (err) {
            const error = new Error('Error reading user data');
            error.status = 500;
            return next(error);
        }

        let users = [];
        if (data) {
            users = JSON.parse(data);
        }

        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            const error = new Error('User with this email already exists');
            error.status = 400;
            return next(error);
        }

        users.push(newUser);
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (writeErr) => {
            if (writeErr) {
                const error = new Error('Error saving user data');
                error.status = 500;
                return next(error);
            }
            res.render('register_success', { username: username });
        });
    });
});

// Middleware - agent registration form submission
router.post('/register/agent', (req, res, next) => {
    const { agentname, agentemail, agentpassword, agentid } = req.body;
    const newAgent = { agentname, agentemail, agentpassword, agentid };

    fs.readFile(agentFilePath, 'utf-8', (err, data) => {
        if (err) {
            const error = new Error('Error reading agent data');
            error.status = 500;
            return next(error);
        }

        let agents = [];
        if (data) {
            agents = JSON.parse(data);
        }

        const existingAgent = agents.find(agent => agent.agentemail === agentemail);
        if (existingAgent) {
            const error = new Error('Agent with this email already exists');
            error.status = 400;
            return next(error);
        }

        agents.push(newAgent);
        fs.writeFile(agentFilePath, JSON.stringify(agents, null, 2), (writeErr) => {
            if (writeErr) {
                const error = new Error('Error saving agent data');
                error.status = 500;
                return next(error);
            }
            res.render('register_success', { agentname: agentname });
        });
    });
});

// Middleware - user login form submission
router.post('/user/login', (req, res, next) => {
    const { email, password } = req.body;

    // Check for user in user.json
    fs.readFile(usersFilePath, 'utf-8', (err, data) => {
        if (err) {
            const error = new Error('Error reading user data');
            error.status = 500;
            return next(error);
        }

        let users = [];
        if (data) {
            users = JSON.parse(data);
        }

        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            req.session.userId = user.username; // Store username in session
            return res.redirect('/dashboard/user'); // Redirect to user dashboard
        }

        // Check for agent in agent.json
        fs.readFile(agentFilePath, 'utf-8', (err, data) => {
            if (err) {
                const error = new Error('Error reading agent data');
                error.status = 500;
                return next(error);
            }

            let agents = [];
            if (data) {
                agents = JSON.parse(data);
            }

            const agent = agents.find(agent => agent.agentemail === email && agent.agentpassword === password);
            if (agent) {
                req.session.userId = agent.agentname; // Store agent name in session
                return res.redirect('/dashboard/agent'); // Redirect to agent dashboard
            }

            const error = new Error('Invalid email or password');
            error.status = 401; // Unauthorized
            return next(error);
        });
    });
});

module.exports = router;
*/
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Your User model
const { protect } = require('../middleware/auth'); // Your protect middleware
require('dotenv').config();  // Load environment variables

const router = express.Router();

// Registration for users
router.post('/register/user', async (req, res) => {
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

// Registration for agents
router.post('/register/agent', async (req, res) => {
    const { agentname, agentemail, agentpassword, agentid } = req.body;
  
    try {
        // Check if the agent already exists in the database (using email to check uniqueness)
        const existingAgent = await User.findOne({ email: agentemail });
        if (existingAgent) {
            return res.status(400).send('Agent with this email already exists');
        }
  
        // Create a new agent instance and save it to the database
        const newAgent = new User({
            username: agentname,
            email: agentemail,
            password: agentpassword,
            agentId: agentid,
            role: 'agent'
        });
  
        // Save the agent to the database
        await newAgent.save();
  
        // Sign the JWT token with the agent's ID
        const token = jwt.sign(
            { id: newAgent._id, role: newAgent.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
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
  

// Protected route for users (user dashboard)
router.get('/dashboard/user', protect, (req, res) => {
    // req.user is populated by the protect middleware
    res.render('user_dashboard', { user: req.user });
});

// Protected route for agents (agent dashboard)
router.get('/dashboard/agent', protect, (req, res) => {
    // req.user is populated by the protect middleware
    res.render('agent_dashboard', { agent: req.user });
});

// Login for both users and agents
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

// GET route to render the login page
router.get('/login', (req, res) => {
    res.render('login', { errorMessage: null });  // Render login page with no error initially
});

// POST route to handle login form submission
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user (or agent) exists in the database
        const user = await User.findOne({ email });

        // If user not found or invalid password, send error
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).render('login', { errorMessage: 'Invalid email or password' });
        }

        // Sign the JWT token with the user's ID and role
        const token = jwt.sign(
            { id: user._id, role: user.role }, // Include user ID and role in the token
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Set the token in an HTTP-only cookie
        res.cookie('token', token, { httpOnly: true });

        // Redirect to appropriate dashboard based on the role (user or agent)
        if (user.role === 'user') {
            return res.redirect('/user/dashboard');
        } else if (user.role === 'agent') {
            return res.redirect('/agent/dashboard');
        } else {
            return res.status(400).render('login', { errorMessage: 'Invalid user role' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).render('login', { errorMessage: 'Server error, please try again later' });
    }

const express = require('express');
const router = express.Router();
const fs = require('fs');

// GET route for user registration page
router.get('/user_register', (req, res) => {
    res.render('user_register');  // Render user registration page
});

// GET route for agent registration page
router.get('/agent_register', (req, res) => {
    res.render('agent_register');  // Render agent registration page
});

// POST route for handling user registration form
router.post('/register_user', (req, res) => {
    const userData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    };

    // Save user data to user.json
    fs.readFile('./data/user.json', (err, data) => {
        if (err) throw err;
        let users = JSON.parse(data);
        users.push(userData);
        fs.writeFile('./data/user.json', JSON.stringify(users, null, 2), err => {
            if (err) throw err;
            console.log('User data saved!');
        });
    });

    res.redirect('/user_register');  // Redirect after submission
});

// POST route for handling agent registration form
router.post('/register_agent', (req, res) => {
    const agentData = {
        name: req.body.name,
        agency: req.body.agency,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password
    };

    // Save agent data to agent.json
    fs.readFile('./data/agent.json', (err, data) => {
        if (err) throw err;
        let agents = JSON.parse(data);
        agents.push(agentData);
        fs.writeFile('./data/agent.json', JSON.stringify(agents, null, 2), err => {
            if (err) throw err;
            console.log('Agent data saved!');
        });
    });

    res.redirect('/agent_register');  // Redirect after submission

});

module.exports = router;
