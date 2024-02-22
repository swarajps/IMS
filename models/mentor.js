const mongoose = require('mongoose');

// Define a schema for your data
const mentorSchema = new mongoose.Schema({
  Mentor_id: String,
  Name: String,
  Gender: String,
  Dob: String,
  Email: String,
  Phone: String,
  State: String,
  City: String,
  PIN: String,
  Employee_code: String,
  Qualifications: String,
  join_date: String,
  photo: String
});





// Create a model from the schema
const Mentor = mongoose.model('mentordata', mentorSchema);

module.exports = Mentor;