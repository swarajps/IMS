const mongoose = require('mongoose');

// Define a schema for your data
const AllocationSchema = new mongoose.Schema({
  allocation_id: String,
  mentor_id: String,
  intern_id: String,
  date: String,

});





// Create a model from the schema
const Allocation = mongoose.model('allocationdata', AllocationSchema);

module.exports = Allocation;