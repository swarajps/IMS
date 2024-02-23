var express = require('express');
var multer = require('multer');
var database = require('../database');
const db = require('../config/db');
var router = express.Router();


// const storages = function() {
  var dt=Date.now();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, dt + '-' + file.originalname); // Unique file name
  },
});



const upload = multer({ storage });


// Define a route for uploading photos




////////////endmongo db part
db()

// }
module.exports = upload;
