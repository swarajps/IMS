var express = require('express');
var router = express.Router();
const checkAuth  = require('../auth/auth');
var multer = require('multer');
var database = require('../database');
const db = require('../config/db');
const Login = require('../models/login');
const Mentor = require('../models/mentor');
const Allocation = require('../models/allocation');
const Intern = require('../models/intern');
const WorkReport = require('../models/workreport');
const AssignWork = require('../models/assignwork');
const Work = require('../models/work');

var dt=Date.now();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/work');
  },
  filename: (req, file, cb) => {
    cb(null, dt + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });
//mentor
router.get('/Mentorhome',checkAuth, function(req, res, next) {
    res.render('mentor/home', { title: 'Register'});
  });
  
  
  router.get('/Assignwork',checkAuth, async function(req, res, next) {
    const docs = await Mentor.find({ Mentor_id :req.session.log_id, });
    const allocint = await Allocation.find({mentor_id: docs[0]["_id"]});
  
    var alloc=[];
    for (const i of allocint) {
      try {
  
        const intern = await Intern.find({ _id: i.intern_id });
        const me = await Mentor.find({ _id: i.mentor_id });
        alloc.push({'intern_id':intern[0]._id,'Intern_Name':intern[0].Name,'Photo': intern[0].Photo});
      } catch (error) {
        console.error('Error fetching mentor:', error);
      }
    }
    
    res.render('mentor/assignwork', { title: 'Register', inn: alloc});
  });
  
  router.post('/Assignwk_',upload.single('fileField'),checkAuth, async function(request, response, next){
    var work_title = request.body.textfield;
    var work1 = request.body.textarea;
    var attach_file= request.file.fileField;
    var file = '/uploads/work'+dt + '-' +request.file.originalname ;
    var sub_date = request.body.textfield3;
    var intern_data =  request.body.Interns;
    var i;
    var Assign_date= new Date().toISOString().split('T')[0];
    var item = {
      mentor_id: request.session.log_id ,
      workk_name: work_title,
      attach_file : file,
      work:work1,
      assign_date: Assign_date,
      submission_date: sub_date ,
    }
    const Cors = new Work(item);
    const savedW = await Cors.save();
    if (Array.isArray(intern_data)) {
      intern_data =intern_data;
      for ( i of intern_data) {
      try {
        console.log(i);
        var assgnwk = {
          work_id: savedW._id ,
          intern_id: i,
          assign_date: Assign_date,
        }
        const AW = new AssignWork(assgnwk);
        const savedAW = await AW.save();
        // const intern = await Intern.find({ _id: i.intern_id });
        // const me = await Mentor.find({ _id: i.mentor_id });
      } catch (error) {
        console.log('Error fetching mentor:', error);
        
      }
    }
  
  } else if (typeof(intern_data) === "string") {
    // intern_data = [intern_data];
    try {
      console.log(i);
      var assgnwk = {
        work_id: savedW._id ,
        intern_id: i,
        assign_date: Assign_date,
      }
      const AW = new AssignWork(assgnwk);
      const savedAW = await AW.save();
      // const intern = await Intern.find({ _id: i.intern_id });
      // const me = await Mentor.find({ _id: i.mentor_id });
    } catch (error) {
      console.log('Error fetching mentor:', error);
      
    }
  }
    // console.log(intern_data);
  
    response.redirect("/Assignwork");
    
    });
  
  
  
  router.get('/evaluationandfeedback',checkAuth, function(req, res, next) {
    res.render('mentor/evalandfeedback', { title: 'Register'});
  });
  router.post('/evalandfback',checkAuth, async function(request, response, next){
    var score = request.body.textfield;
    var feedback = request.body.textarea;
    console.log(score);
    console.log(feedback);
  
    var item = {
      
    evaluation_score: score,
    feedback: feedback,
     
    }
    
    const evalfeed = new WorkReport(item);
    const savedC = await evalfeed.save();
    response.send(savedC);
    response.redirect("/evaluationandfeedback");
  });
  
  
  router.get('/changepassword',checkAuth,async function(req, res, next) {
    
  
    res.render('mentor/changepassword', { title: 'Register'});
  });
  
  router.post('/changepassm',checkAuth, async function(request, response, next){
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
  
  
  router.get('/internmonitoring',checkAuth, function(req, res, next) {
    res.render('mentor/internmonitoring', { title: 'Register'});
  });
  router.post('/intermon', async function(request, response, next){
    var search = request.body.textfield;
    var interns = request.body.textfield;
    var work_assigned = request.body.textarea;  
    var status = request.body.textarea;
    var work_report = request.body.textarea;
    console.log(search);
  
    response.redirect("/internmonitoring");
  });
  
  
  router.get('/MentorProfile',checkAuth,async function(req, res, next) {
  
    const docs = await Mentor.find({ Mentor_id :req.session.log_id, });
  
    res.render('mentor/mentorprofileview', { title: 'Ment_Prof',data:docs[0]});
  });
  
  
  
  
  
  router.post('/mentorpro', checkAuth,async function(request, response, next){
    var search = request.body.textfield;
    var name = request.body.textfield;
    var emp_id = request.body.textarea;  
    var dob = request.body.textarea;
    var address = request.body.textarea;
    var phone_no = request.body.textarea;
    var email = request.body.textarea;
    var qualifications = request.body.textarea;
    response.redirect("/MentorProfile");
  
  
  });
  
  
  router.get('/viewcoursealloc', checkAuth, function(req, res, next) {
    res.render('mentor/viewcoursealloc', { title: 'Register'});
  });
  router.post('/viewcorsalloc', async function(request, response, next){
    var interns = request.body.textfield;
    var course_allocated = request.body.textfield;
    var mentor_assigned = request.body.textarea; 
  
    response.redirect("/viewcoursealloc");
  });
  
  
  
  router.get('/Mentorhome', checkAuth, function(req, res, next) {
    res.render('mentor/home', { title: 'Register'});
  });
  
  
  
module.exports = router;
