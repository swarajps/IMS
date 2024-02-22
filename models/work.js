const mongoose = require('mongoose');

// Define a schema for your data
const WorkSchema = new mongoose.Schema({
  mentor_id: String,
  workk_name: String,
  work: String,
  attach_file: String,
  assign_date: String,
  submission_date: String,


});





// Create a model from the schema
const Work = mongoose.model('workdata', WorkSchema);

module.exports = Work;