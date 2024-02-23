var express = require('express');
var multer = require('multer');
var database = require('../database');
// const db = require('../config/db');
const Login = require('../models/login');
const Intern = require('../models/intern');
const QueryandReply = require('../models/queryandreply');
const checkAuth = require('../auth/auth');




var router = express.Router();
var usersRouter = require('./logini');
var adminRouter = require('./admin');
var mentorRouter = require('./mentor');
var internRouter = require('./intern');
router.use('/',usersRouter);
router.use('/',adminRouter);
router.use('/',mentorRouter);
router.use('/',internRouter);




module.exports = router;

