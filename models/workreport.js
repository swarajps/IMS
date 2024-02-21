const mongoose = require('mongoose');

// Define a schema for your data
const WorkreportSchema = new mongoose.Schema({
  workreport_id: String,
  work_id: String,

  work_content: String,
  evaluation_score: String,
  feedback: String,

});





// Create a model from the schema
const WorkReport = mongoose.model('workreportdata', WorkreportSchema);

module.exports = WorkReport;