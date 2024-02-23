var express = require('express');
var router = express.Router();
const checkAuth  = require('../auth/auth');
var multer = require('multer');
var database = require('../database');
const db = require('../config/db');
const Login = require('../models/login');
const Course = require('../models/course');
const Mentor = require('../models/mentor');
const Allocation = require('../models/allocation');
const CourseAlloc = require('../models/allocatedcourses');
const Intern = require('../models/intern');
const QueryandReply = require('../models/queryandreply');
const WorkReport = require('../models/workreport');
const AssignWork = require('../models/assignwork');
const Work = require('../models/work');

var dt=Date.now();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, dt + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });


router.get('/adminHome', checkAuth, function(req, res, next) {
  res.render('admin/home', { title: 'Register'});
});



router.get('/addcoursealloc',checkAuth, async function(req, res, next) {
  const Couradd = await Course.find({});
  const intadd = await Intern.find({});
  res.render('admin/addcoursealloc', { title: 'Mentor Management',mnn:intadd, cnn: Couradd });
});


router.post('/addcourseallocation',checkAuth, async function(request, response, next){
  var course_alloc = request.body.select;
  var intern_alloc = request.body.select2;
  var item = {
    course_id: course_alloc,
    intern_id: intern_alloc,
    status: "Allocated" ,
  }
  const Cors = new CourseAlloc(item);
  const savedC = await Cors.save();
  response.redirect("/addcoursealloc");
});



router.get('/addcoursedetails', checkAuth, function(req, res, next) {
  res.render('admin/addcoursedetails', { title: 'Register'});
});


router.post('/addcoursedetail', checkAuth,async function(request, response, next){
  var Course_name = request.body.textfield;
  var Duration = request.body.textfield2;
  var Fees = request.body.textfield3;

  var item = {
    course_id: "1",
    course_name: Course_name,
    duration: Duration ,
    fees: Fees,
  }
  const Cors = new Course(item);
  const savedC = await Cors.save();
  response.send(savedC);

  // response.redirect("/addcoursedetails");
});

router.get('/editcourse/:meid', checkAuth,async function(req, res, next) {
  const Courseedit = await Course.find({_id:req.params.meid});
  res.render('admin/editcourse', {data:Courseedit[0]});
});

router.post('/editcor', checkAuth,async function(request, response, next){
  var id = request.body.id;
  var Name = request.body.textfield;
  var Duration = request.body.textfield2;
  var Fees = request.body.textfield3;


  var item = {
    course_name: Name,
    duration:Duration,
    fees:Fees

  }
  const Coredit = await Course.find({_id:id}).findOneAndUpdate(item);
  // response.send(Coredit);
  response.redirect("/coursemanagement");
});

router.get('/deletecourse/:meid', checkAuth,async function(req, res, next) {
  const Cordelete = await Course.find({_id:req.params.meid}).findOneAndDelete();
  res.send('<script>alert("Course Details Deleted Successesfully"); window.location.href = "/coursemanagement"; </script>');
});


router.get('/addintern', function(req, res, next) {
  res.render('admin/addintern', { title: 'Register'});
});

router.post('/addint', upload.single('fileField'), async function(request, response, next){

  var photo = '/uploads/'+dt + '-' + request.file.originalname;
  var intern_name = request.body.textfield;
  var gender = request.body.textfield1;
  var dob = request.body.textfield3;
  var state = request.body.textfield2;
  var city = request.body.textfield9;
  var pin = request.body.textfield4;
  var email = request.body.textfield5;
  var j_date = request.body.textfield8;
  var phone = request.body.textfield7;
  var qualification = request.body.textfield6;
  
  
  

  var logitem = {
    username : email,
    password : phone,
    type : "intern",
  }

  const logint = new Login(logitem);
  const lint = await logint.save();
  
  var item = {
    Inter_id: lint["_id"],
    Name: intern_name,
    Gender: gender,
    Dob: dob,
    Photo: photo,
    Email: email,
    Phone: phone,
    State: state,
    City: city,
    Pin: pin,
    Qualifications: qualification,
    Join_date: j_date,
  
  }

  const intadd = new Intern(item);
  const savedC = await intadd.save();
  response.send(savedC);

  // response.redirect("/addcoursedetails");
 // response.redirect("/addintern");
});


router.get('/editintern/:meid', checkAuth,async function(req, res, next) {
  const intedit = await Intern.find({_id:req.params.meid});
  res.render('admin/editintern', { title: 'Register',data:intedit[0]});
});



router.post('/editint',upload.single('fileField'),checkAuth, async function(request, response, next){
  var id = request.body.id;

  var Name = request.body.textfield2;
  var Gender = request.body.textfield4;
  var Dob = request.body.textfield3;
  var State = request.body.textfield10;
  var City = request.body.textfield11;
  var Pin = request.body.textfield6;
  var Email = request.body.textfield7;
  var Join_date = request.body.textfield9;
  var Phone = request.body.textfield5;
  var Qualifications = request.body.textfield8;

  if(request.file){
    var photo='/uploads/'+dt + '-' + request.file.originalname;
    const intedit = await Intern.find({_id:id}).updateOne({Photo:photo});
  } 


  var item = {
    Name: Name,
    Gender: Gender,
    Dob: Dob,
    Email: Email,
    Phone: Phone,
    State: State,
    City: City,
    Pin: Pin,
    Qualifications: Qualifications,
    join_date: Join_date ,
  }
  
  const intedit = await Intern.find({_id:id}).findOneAndUpdate(item);
  response.send(intedit);

  //response.redirect("/addmentor");
});

router.get('/deleteintern/:meid', checkAuth,async function(req, res, next) {
  const intedit = await Intern.find({_id:req.params.meid});
  const intlogdel = await Login.find({_id:intedit[0]['Inter_id']}).findOneAndDelete();
  const intdelete = await Intern.find({_id:req.params.meid}).findOneAndDelete();
  res.send('<script>alert("Intern Data Deleted Successesfully"); window.location.href = "/internmanagement"; </script>');
});

router.get('/addmentor', checkAuth, function(req, res, next) {
  res.render('admin/addmentor', { title: 'Register'});
});



router.post('/addment',upload.single('fileField'), async function(request, response, next){
  var empcode = request.body.textfield;
  var name = request.body.textfield2;
  var doB = request.body.textfield3;
  var gender = request.body.textfield4;
  var phone = request.body.textfield5;
  var pin = request.body.textfield6;
  var email = request.body.textfield7;
  var qualification = request.body.textfield8;
  var jn_date=request.body.textfield9;
  var state=request.body.textfield10;
  var city=request.body.textfield11;
  var photo='/uploads/'+dt + '-' + request.file.originalname;

var logitem = {
  username : email,
  password : phone,
  type : "mentor",
}

const logint = new Login(logitem);
const lint = await logint.save();

  var item = {
    Mentor_id: lint["_id"],
    Name: name,
    Gender: gender,
    Dob: doB,
    Email: email,
    Phone: phone,
    State: state,
    City: city,
    PIN: pin,
    Employee_code: empcode,
    Qualifications: qualification,
    join_date: jn_date ,
    photo: photo,
  }
  
  const mentadd = new Mentor(item);
  const savedC = await mentadd.save();
  response.send(savedC);

  //response.redirect("/addmentor");
});


router.get('/editmentor/:meid', checkAuth,async function(req, res, next) {
  const mentadd = await Mentor.find({_id:req.params.meid});
  res.render('admin/editmentor', { title: 'Register',data:mentadd[0]});
});



router.post('/editment',upload.single('fileField'), async function(request, response, next){
  var empcode = request.body.textfield;
  var id = request.body.id;
  var name = request.body.textfield2;
  var doB = request.body.textfield3;
  var gender = request.body.textfield4;
  var phone = request.body.textfield5;
  var pin = request.body.textfield6;
  var email = request.body.textfield7;
  var qualification = request.body.textfield8;
  var jn_date=request.body.textfield9;
  var state=request.body.textfield10;
  var city=request.body.textfield11;

  if(request.file){
    var photo='/uploads/'+dt + '-' + request.file.originalname;
    const mentedit = await Mentor.find({_id:id}).updateOne({photo:photo});
  } 


  var item = {
    Name: name,
    Gender: gender,
    Dob: doB,
    Email: email,
    Phone: phone,
    State: state,
    City: city,
    PIN: pin,
    Employee_code: empcode,
    Qualifications: qualification,
    join_date: jn_date ,
  }
  
  const mentedit = await Mentor.find({_id:id}).findOneAndUpdate(item);
  response.send(mentedit);

  //response.redirect("/addmentor");
});

router.get('/deletementor/:meid', checkAuth,async function(req, res, next) {
  const Mentedit = await Mentor.find({_id:req.params.meid});
  const Mentlogdel = await Login.find({_id:Mentedit[0]['Mentor_id']}).findOneAndDelete();
  const Mentdelete = await Mentor.find({_id:req.params.meid}).findOneAndDelete();
  res.send('<script>alert("Mentor Data Deleted Successesfully"); window.location.href = "/mentormanagement"; </script>');
});

router.get('/allocatementor',checkAuth, async function(req, res, next) {
  const Ment = await Mentor.find({});
  const Int = await Intern.find({});
  res.render('admin/allocatementor', { title: 'Register', mnn:Ment,inn:Int});
});





router.post('/allocatement',checkAuth, async function(request, response, next){
  var Ment_id = request.body.select1;
  var Inter_id = request.body.select2;
  var item = {
    allocation_id: "Allocated",
    mentor_id: Ment_id,
    intern_id: Inter_id,  
    date: new Date().toISOString().split('T')[0],
  }
  
  const mentalloc = new Allocation(item);
  const savedC = await mentalloc.save();
  // response.send(savedC);

  //response.redirect("/addmentor");
  response.redirect("/allocatementor");
});


router.get('/changepassword', checkAuth,async function(req, res, next) {
  

  res.render('admin/changepassword', { title: 'Register'});
});

router.post('/changepass', async function(request, response, next){
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


router.get('/coursemanagement', checkAuth, async function(req, res, next) {
  const Cors = await Course.find({});
  res.render('admin/coursemanagement', { title: 'Courses', course: Cors });
});


router.get('/internmanagement', checkAuth, async function(req, res, next) {
  const intadd = await Intern.find({});
  res.render('admin/internmanagement', { title: 'Intern Management', inn: intadd });
});


router.get('/mentormanagement', checkAuth, async function(req, res, next) {
  const mentadd = await Mentor.find({});
  res.render('admin/mentormanagement', { title: 'Mentor Management', mnn: mentadd });
});




router.get('/viewallocatedmentors',checkAuth, async function(req, res, next) {
  const mentalloc = await Allocation.find({});
  var alloc = [];
  // mentalloc.forEach(async i=>{
  //   me = await Mentor.find({_id:i.mentor_id});
  //   alloc.push(me);

  // });
  for (const i of mentalloc) {
    try {

      const intern = await Intern.find({ _id: i.intern_id });
      const me = await Mentor.find({ _id: i.mentor_id });
      alloc.push({'Name':me[0].Name,'Intern_Name':intern[0].Name, 'date': i.date});
    } catch (error) {
      console.error('Error fetching mentor:', error);
    }
  }
  
  console.log(alloc);

  res.render('admin/viewallocatedmentors', { title: 'View allocated Mentor ', mnn: alloc });
});


module.exports = router;
