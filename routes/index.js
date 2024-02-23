var express = require('express');
var multer = require('multer');
var database = require('../database');
const db = require('../config/db');
const Login = require('../models/login');
const Intern = require('../models/intern');
const QueryandReply = require('../models/queryandreply');
var url = 'mongodb://127.0.0.1:27017/sample';
const checkAuth = require('../auth/auth');


var router = express.Router();
var usersRouter = require('./logini');
var adminRouter = require('./admin');
// var mentorRouter = require('./mentor');
router.use('/',usersRouter);
router.use('/',adminRouter);
// router.use('/',mentorRouter);


const stg = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/work'); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, dt + '-' + file.originalname); // Unique file name
  },
});

const work = multer({ stg });

//Intern
router.get('/Internhome',checkAuth, function(req, res, next) {
  res.render('intern/home', { title: 'Register'});
});

router.get('/assignmentsubmission',checkAuth, function(req, res, next) {
  res.render('intern/assignmentsubmission', { title: 'Register'});
});

router.post('/assign_sub',checkAuth, async function(request, response, next){
  var assignment_title = request.body.textfield2;
  var  assignment_file = request.body.filefield;
  console.log(assignment_title);
  response.redirect("/assignmentsubmission");
});


router.get('/internfeedback',checkAuth, function(req, res, next) {
  res.render('intern/internfeedback', { title: 'Register'});
});
router.post('/intfeed', async function(request, response, next){
  var Search = request.body.textfield;
  var Date = request.body.textfield;
  var Feedback = request.body.textfield;
  console.log(Search);
  response.redirect("/internfeedback");
});


router.get('/internprofileview',checkAuth,async function(req, res, next) {
    const docs = await Intern.find({ Inter_id :req.session.log_id, });
    res.render('intern/internprofileview', { title: 'Intern View', data: docs[0]});
  
 });


 router.get('/changepassword',async function(req, res, next) {
  i

  res.render('intern/changepassword', { title: 'Register'});
});

router.post('/changepassi',checkAuth, async function(request, response, next){
  const chngpass = await Login.find({_id:request.session.log_id,});
  var current_pass = request.body.textfield;
  var  new_pass = request.body.textfield2;
  var confrm = request.body.textfield3;
  if (new_pass==confrm)
{ var item = {
    password: new_pass,     
    }

  const changpass = await Login.find({_id:request.session.log_id}).findOneAndUpdate(item);
  const savedC = await changpass.save();
  response.send('<script>alert("Password changed sucessfully");window.location="/"</script>')
  // response.send('<script>alert("Invalid credentials"); window.location.href = "/"; </script>');

  //response.redirect("/changepassword");

  // response.redirect("/changepassword");
  }else{
    response.send('<script>alert("Password does not match");window.location="/changepassword"</script>')
  }

});

// router.post('/intprofview', async function(request, response, next){
//   var Name = request.body.textfield;
//   var Phone = request.body.textfield;
//   var Email = request.body.textfield;
//   var Address = request.body.textfield;
//   var Qualifications = request.body.textfield;

//   response.redirect("/internprofileview");
// });

router.get('/Internviewassignments', checkAuth, function(req, res, next) {
  res.render('intern/Internviewassignments', { title: 'Register'});
});

router.post('/intviewassign',checkAuth, async function(request, response, next){
  var Assignment_title = request.body.textfield;
  var Assigned_Date = request.body.textfield;
  var Sumbission_Date = request.body.textfield;

  response.redirect("/internviewassignments");
});
router.get('/queriesubmission', checkAuth, function(req, res, next) {
  res.render('intern/queriesubmission', { title: 'Register'});
});


router.post('/q_sub',checkAuth, async function(request, response, next){
  var queries = request.body.textfield;
  console.log(queries);

  var item = {
    allocation_id: String,
    query: queries,
  
   
  }
  
  const submitQ = new QueryandReply(item);
  const savedC = await submitQ.save();
  response.send(savedC);

  response.redirect("/queriesubmission");
});


router.get('/viewassignedcourses', checkAuth, function(req, res, next) {
  res.render('intern/viewassignedcourses', { title: 'Register'});
});

router.get('/viewassignedmentor', checkAuth, function(req, res, next) {
  res.render('intern/viewassignedmentor', { title: 'Register'});
});

module.exports = router;
