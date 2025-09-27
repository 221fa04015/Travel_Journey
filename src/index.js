const express = require("express")
const app = express()
const path = require("path")
const pug = require("pug")
const customerCollection = require("./mongodb")  // MongoDB collection for customers
const agentCollection = require("./mongodb")  // MongoDB collection for agents

const templatePath = path.join(__dirname, '../templates')

app.use(express.json())
app.set("view engine", "pug")
app.set("views", templatePath)
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
  res.render("login")
})

app.get("/register", (req, res) => {
  res.render("register")
})

// POST route for handling registration
app.post("/register", async (req, res) => {
  try {
    const role = req.body.role;  // Role: either 'customer' or 'agent'
    
    const data = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      city: req.body.city,
    };

    // If the role is 'customer', insert data into the user collection
    if (role === 'customer') {
      await customerCollection.insertMany([data]);
      res.render("login");  // Redirect to login after registration
    } 
    // If the role is 'agent', insert data into the agent collection
    else if (role === 'agent') {
      await agentCollection.insertMany([data]);
      res.render("login");  // Redirect to login after registration
    } else {
      res.send("Invalid role selected.");
    }
  } catch (error) {
    res.send("An error occurred during registration. Please try again.");
  }
})

// POST route for handling login
app.post("/login", async (req, res) => {
  try {
    const check = await customerCollection.findOne({ email: req.body.email });

    if (check && check.password === req.body.password) {
      res.render("dashboard");  // Redirect to dashboard after successful login
    } else {
      res.send("Wrong password or email");
    }
  } catch (error) {
    res.send("An error occurred during login. Please try again.");
  }
})

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
})

app.listen(4050, () => {
  console.log("Port connected");
})
