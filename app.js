/*
// app.js
const express = require('express');
const app = express();
const path = require('path');
const url = require('url');
const session = require('express-session');

// Import routers
const registerRoute = require('./routes/registration');
const userRoute = require('./routes/user');

// Set template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session management
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Change to true if using HTTPS
}));

// Routing
app.use('/', registerRoute);
app.use('/', userRoute);  // Use user routes for login and dashboard

// Middleware - Static pages (should handle only GET requests for static pages)
app.get('*', (req, res, next) => {
    try {
        res.render(url.parse(req.url, true).pathname.substring(1), { userId: req.session.userId });
    } catch (error) {
        const err = new Error('Error rendering the page');
        err.status = 500;
        return next(err);
    }
});

// Error-handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).render('error', {
        title: `Error ${statusCode}`,
        statusCode: statusCode,
        message: err.message || 'Something went wrong. Please try again later.'
    });
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running @ http://localhost:${port}`);
});
*/
const express = require('express');
const cookieParser = require('cookie-parser');
const url = require('url');
const connectDB = require('./config/db');
const { protect } = require('./middleware/auth'); // Import the protect middleware

require('dotenv').config();  // Load environment variables

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'pug');

// Home page
app.get('/', (req, res) => {
    res.render('index');
});

// Routes
const profileRouter = require('./routes/profile');
const userRouter = require('./routes/user');
const searchWeatherRoute = require('./routes/searchWeather');
app.use('/', searchWeatherRoute);
app.use('/user', userRouter);
app.use('/profile', profileRouter); 
const agentRouter = require('./routes/agent');
app.use('/agent', agentRouter);

// Protected route example (for user dashboard)
app.get('/user/dashboard', protect, (req, res) => {
    res.render('user_dashboard', { user: req.user });
});
app.get('/agent/dashboard', protect, (req, res) => {
    res.render('agent_dashboard', { agent: req.agent });
});
// General Middleware
app.use((req, res, next) => {
    try {
        // Render the requested page by extracting the pathname from the URL
        res.render(url.parse(req.url, true).pathname.substring(1));
    } catch (error) {
        // Create a new error and pass it to the next middleware
        const err = new Error('Error rendering the page');
        err.status = 500;
        return next(err); // Forward to error-handling middleware
    }
});

// Error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500).render('error', { error: err });
});



// Use environment variable for port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

