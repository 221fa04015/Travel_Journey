const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // To hash passwords

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensure unique email for both users and agents
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: [String], // Allow multiple phone numbers
    required: false // Not mandatory for agents
  },
  city: {
    type: String,
    required: function() {
      return this.role === 'user'; // City is required only for users
    }
  },
  role: {
    type: String,
    enum: ['user', 'agent'], // Only 'user' or 'agent' roles allowed
    required: true
  },
  agentId: {
    type: String,
    required: function() {
      return this.role === 'agent'; // Agent ID is required only for agents
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash the password before saving the user
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to match entered password with hashed password in the database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;


// const User = mongoose.model('User', UserSchema, 'users'); // 'users' collection for regular users
// const Agent = mongoose.model('Agent', UserSchema, 'agents'); // 'agents' collection for agents

// module.exports = { User, Agent };








// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   // role: {
//   //   type: String,
//   //   enum: ['admin', 'agent', 'customer'],  // Allowed values for role
//   //   required: true
//   // },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   phone: { type: Number }, // Only customers have phone numbers
//   city: { type: String },  // Only customers have cities
//   agentId: { type: String }, // Only agents have an agent ID
  
//   // Add role to differentiate between customers and agents
//   role: {
//     type: String,
//     enum: ['customers', 'agents','users'], // Ensure valid values for the role
//     required: true
//   }
// });

// // Hash password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Method to compare passwords
// userSchema.methods.comparePassword = async function (userPassword) {
//   return await bcrypt.compare(userPassword, this.password);
// };

// const User = mongoose.model('User', userSchema);
// module.exports = User;
