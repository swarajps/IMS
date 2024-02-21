const mongoose = require('mongoose');

// Define a schema for your data
const userSchema = new mongoose.Schema({
  intern_id: String,
  course_id: String,
  status: String,

});





// Create a model from the schema
const User = mongoose.model('userdata', userSchema);

module.exports = User;