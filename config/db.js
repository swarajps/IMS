const mongoose = require('mongoose');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


const MONGO_URI = process.env.MONGODB_URL;
console.log(MONGO_URI);
const db = mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Error connecting to MongoDB:', error));


module.exports=db
