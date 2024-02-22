// var express = require('express');

// var multer = require('multer');
// var database = require('../database');
// const db = require('../config/db');
// const Login = require('../models/login');
// const Course = require('../models/course');
// const Mentor = require('../models/mentor');
// const Allocation = require('../models/allocation');
// const Intern = require('../models/intern');
// const QueryandReply = require('../models/queryandreply');
// const WorkReport = require('../models/workreport');
// var url = 'mongodb://127.0.0.1:27017/sample';







// var dt=Date.now();
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads'); // Destination folder for uploaded files
//   },
//   filename: (req, file, cb) => {
//     cb(null, dt + '-' + file.originalname); // Unique file name
//   },
// });

// const upload = multer({ storage });


// // Define a route for uploading photos




// ////////////endmongo db part
// db()
// var router = express.Router();


// router.get('/', async function(req, res, next) {


//   res.render('login', { tt: 'IMS'});
// });

// router.post('/login_post', async function(request, response, next){
//   var username = request.body.textfield;
//   var password = request.body.textfield2;


//   if(username)
//   {

//   try {
//     const docs = await Login.find({ username : username, password: password  });



//     if(docs.length==0)
//     {
    
//     //  response.redirect("/");
//     //response.end();
//     response.send('<script>alert("Invalid credentials"); window.location.href = "/"; </script>');


//     }
//     else
//     {
//       request.session.log_id = docs[0]['_id'];
//       request.session.save();
//       console.log(request.session.log_id);
//       console.log(docs[0]['type']);

//       if(docs[0]['type']=="admin")
//       {
//         response.redirect("/adminHome");
//         response.end();

//       }
//       else if(docs[0]['type']=="mentor")
//       {
//         response.redirect("/Mentorhome");
//         response.end();
//       }
//       else if(docs[0]['type']=="intern")
//       {
//         response.redirect("/Internhome");
//         response.end();
//       }

//       else
//       {

//       response.redirect('/')
//       response.send('<script>alert("Something went wrong -_-"); window.location.href = "/"; </script>');
//       response.end();
//       }
//     }
    

    
//   } catch (error) {
//     // Handle any errors
    
//     console.error('Error:', error);
//     res.send('<script>alert("Something went wrong -_-"); window.location.href = "/"; </script>');


//     // response.send("nodata");
//     response.end();
//   }
// }
// else
// {
//   response.redirect("/");
//   response.end();

// }







  

// });



// router.get('/adminHome', function(req, res, next) {
//   res.render('admin/home', { title: 'Register'});
// });


// router.get('/addcoursealloc', function(req, res, next) {
//   res.render('admin/addcoursealloc', { title: 'Register'});
// });

// router.post('/addcourseallocation', async function(request, response, next){
//   var course_alloc = request.body.select;

//   response.redirect("/addcoursealloc");
// });

// router.get('/addcoursedetails', function(req, res, next) {
//   res.render('admin/addcoursedetails', { title: 'Register'});
// });


// router.post('/addcoursedetail', async function(request, response, next){
//   var Course_name = request.body.textfield;
//   var Duration = request.body.textfield2;
//   var Fees = request.body.textfield3;

//   var item = {
//     course_id: "1",
//     course_name: Course_name,
//     duration: Duration ,
//     fees: Fees,
//   }
//   const Cors = new Course(item);
//   const savedC = await Cors.save();
//   response.send(savedC);

//   // response.redirect("/addcoursedetails");
// });

// router.get('/addintern', function(req, res, next) {
//   res.render('admin/addintern', { title: 'Register'});
// });

// router.post('/addint', upload.single('fileField'), async function(request, response, next){

//   var photo = '/uploads/'+dt + '-' + request.file.originalname;
//   var intern_name = request.body.textfield;
//   var gender = request.body.textfield1;
//   var dob = request.body.textfield3;
//   var state = request.body.textfield2;
//   var city = request.body.textfield9;
//   var pin = request.body.textfield4;
//   var email = request.body.textfield5;
//   var j_date = request.body.textfield8;
//   var phone = request.body.textfield7;
//   var qualification = request.body.textfield6;
  
  
  

//   var logitem = {
//     username : email,
//     password : phone,
//     type : "intern",
//   }

//   const logint = new Login(logitem);
//   const lint = await logint.save();
  
//   var item = {
//     Inter_id: lint["_id"],
//     Name: intern_name,
//     Gender: gender,
//     Dob: dob,
//     Photo: photo,
//     Email: email,
//     Phone: phone,
//     State: state,
//     City: city,
//     Pin: pin,
//     Qualifications: qualification,
//     Join_date: j_date,
  
//   }

//   const intadd = new Intern(item);
//   const savedC = await intadd.save();
//   response.send(savedC);

//   // response.redirect("/addcoursedetails");
//  // response.redirect("/addintern");
// });


// router.get('/editintern/:meid',async function(req, res, next) {
//   const intedit = await Intern.find({_id:req.params.meid});
//   console.log(req);
//   res.render('admin/editintern', { title: 'Register',data:intedit[0]});
// });



// router.post('/editint',upload.single('fileField'), async function(request, response, next){
//   var id = request.body.id;
//   console.log(request.file);

//   var Name = request.body.textfield2;
//   var Gender = request.body.textfield4;
//   var Dob = request.body.textfield3;
//   var State = request.body.textfield10;
//   var City = request.body.textfield11;
//   var Pin = request.body.textfield6;
//   var Email = request.body.textfield7;
//   var Join_date = request.body.textfield9;
//   var Phone = request.body.textfield5;
//   var Qualifications = request.body.textfield8;

//   if(request.file){
//     var photo='/uploads/'+dt + '-' + request.file.originalname;
//     const intedit = await Intern.find({_id:id}).updateOne({Photo:photo});
//   } 


//   var item = {
//     Name: Name,
//     Gender: Gender,
//     Dob: Dob,
//     Email: Email,
//     Phone: Phone,
//     State: State,
//     City: City,
//     Pin: Pin,
//     Qualifications: Qualifications,
//     join_date: Join_date ,
//   }
  
//   const intedit = await Intern.find({_id:id}).findOneAndUpdate(item);
//   response.send(intedit);

//   //response.redirect("/addmentor");
// });

// router.get('/addmentor', function(req, res, next) {
//   res.render('admin/addmentor', { title: 'Register'});
// });


// router.get('/deleteintern/:meid',async function(req, res, next) {
//   const intdelete = await Intern.find({_id:req.params.meid}).findOneAndDelete();
//   console.log(req);
//   res.send('<script>alert("Intern Data Deleted Successesfully"); window.location.href = "/internmanagement"; </script>');
// });


// router.post('/addment',upload.single('fileField'), async function(request, response, next){
//   var empcode = request.body.textfield;
//   var name = request.body.textfield2;
//   var doB = request.body.textfield3;
//   var gender = request.body.textfield4;
//   var phone = request.body.textfield5;
//   var pin = request.body.textfield6;
//   var email = request.body.textfield7;
//   var qualification = request.body.textfield8;
//   var jn_date=request.body.textfield9;
//   var state=request.body.textfield10;
//   var city=request.body.textfield11;
//   var photo='/uploads/'+dt + '-' + request.file.originalname;
// console.log(request.body);

// var logitem = {
//   username : email,
//   password : phone,
//   type : "mentor",
// }

// const logint = new Login(logitem);
// const lint = await logint.save();

//   var item = {
//     Mentor_id: lint["_id"],
//     Name: name,
//     Gender: gender,
//     Dob: doB,
//     Email: email,
//     Phone: phone,
//     State: state,
//     City: city,
//     PIN: pin,
//     Employee_code: empcode,
//     Qualifications: qualification,
//     join_date: jn_date ,
//     photo: photo,
//   }
  
//   const mentadd = new Mentor(item);
//   const savedC = await mentadd.save();
//   response.send(savedC);

//   //response.redirect("/addmentor");
// });


// router.get('/editmentor/:meid',async function(req, res, next) {
//   const mentadd = await Mentor.find({_id:req.params.meid});
//   console.log(req);
//   res.render('admin/editmentor', { title: 'Register',data:mentadd[0]});
// });



// router.post('/editment',upload.single('fileField'), async function(request, response, next){
//   console.log(request.file);
//   var empcode = request.body.textfield;
//   var id = request.body.id;
//   var name = request.body.textfield2;
//   var doB = request.body.textfield3;
//   var gender = request.body.textfield4;
//   var phone = request.body.textfield5;
//   var pin = request.body.textfield6;
//   var email = request.body.textfield7;
//   var qualification = request.body.textfield8;
//   var jn_date=request.body.textfield9;
//   var state=request.body.textfield10;
//   var city=request.body.textfield11;

//   if(request.file){
//     var photo='/uploads/'+dt + '-' + request.file.originalname;
//     const mentedit = await Mentor.find({_id:id}).updateOne({photo:photo});
//   } 
// // console.log(request.body);


//   var item = {
//     Name: name,
//     Gender: gender,
//     Dob: doB,
//     Email: email,
//     Phone: phone,
//     State: state,
//     City: city,
//     PIN: pin,
//     Employee_code: empcode,
//     Qualifications: qualification,
//     join_date: jn_date ,
//   }
  
//   const mentedit = await Mentor.find({_id:id}).findOneAndUpdate(item);
//   response.send(mentedit);

//   //response.redirect("/addmentor");
// });


// router.get('/allocatementor', function(req, res, next) {
//   res.render('admin/allocatementor', { title: 'Register'});
// });





// router.post('/allocatement', async function(request, response, next){
//   var alloc_ment = request.body.select1;
//   var Inter_id = request.body.select1;
//   var Date = request.body.select1;
  
//   var item = {
//     allocation_id: String,
//     mentor_id: String,
//     intern_id: Intern_id,
//     data: Date,
  
   
//   }
  
//   const mentalloc = new Allocation(item);
//   const savedC = await mentalloc.save();
//   response.send(savedC);

//   //response.redirect("/addmentor");
//   response.redirect("/allocatementor");
// });


// router.get('/changepassword', function(req, res, next) {
//   res.render('admin/changepassword', { title: 'Register'});
// });

// router.post('/changepass', async function(request, response, next){
//   var current_pass = request.body.textfield;
//   var  new_pass = request.body.textfield2;
//   var confrm = request.body.textfield3;
//   var item = {
//     allocation_id: String,
//     mentor_id: String,
//     intern_id: Intern_id,
//     data: Date,
  
   
//   }
  
//   const mentalloc = new Allocation(item);
//   const savedC = await mentalloc.save();
//   response.send(savedC);

//   //response.redirect("/changepassword");

//   response.redirect("/changepassword");
// });


// router.get('/coursemanagement', async function(req, res, next) {
//   const Cors = await Course.find({});
//   res.render('admin/coursemanagement', { title: 'Courses', course: Cors });
// });


// router.get('/internmanagement', async function(req, res, next) {
//   const intadd = await Intern.find({});
//   res.render('admin/internmanagement', { title: 'Intern Management', inn: intadd });
// });


// router.get('/mentormanagement', async function(req, res, next) {
//   const mentadd = await Mentor.find({});
//   res.render('admin/mentormanagement', { title: 'Mentor Management', mnn: mentadd });
// });




// router.get('/viewallocatedmentors', async function(req, res, next) {
//   const mentalloc = await Allocation.find({});

//   res.render('admin/viewallocatedmentors', { title: 'View allocated Mentor ', mnn: mentalloc });
// });





// //Intern
// router.get('/Internhome', function(req, res, next) {
//   res.render('intern/home', { title: 'Register'});
// });

// router.get('/assignmentsubmission', function(req, res, next) {
//   res.render('intern/assignmentsubmission', { title: 'Register'});
// });

// router.post('/assign_sub', async function(request, response, next){
//   var assignment_title = request.body.textfield2;
//   var  assignment_file = request.body.filefield;
//   console.log(assignment_title);
//   response.redirect("/assignmentsubmission");
// });


// router.get('/internfeedback', function(req, res, next) {
//   res.render('intern/internfeedback', { title: 'Register'});
// });
// router.post('/intfeed', async function(request, response, next){
//   var Search = request.body.textfield;
//   var Date = request.body.textfield;
//   var Feedback = request.body.textfield;
//   console.log(Search);
//   response.redirect("/internfeedback");
// });


// router.get('/internprofileview',async function(req, res, next) {
//     const docs = await Intern.find({ Inter_id :req.session.log_id, });
//     res.render('intern/internprofileview', { title: 'Intern View', data: docs[0]});
  
//  });

// // router.post('/intprofview', async function(request, response, next){
// //   var Name = request.body.textfield;
// //   var Phone = request.body.textfield;
// //   var Email = request.body.textfield;
// //   var Address = request.body.textfield;
// //   var Qualifications = request.body.textfield;

// //   response.redirect("/internprofileview");
// // });

// router.get('/Internviewassignments', function(req, res, next) {
//   res.render('intern/Internviewassignments', { title: 'Register'});
// });

// router.post('/intviewassign', async function(request, response, next){
//   var Assignment_title = request.body.textfield;
//   var Assigned_Date = request.body.textfield;
//   var Sumbission_Date = request.body.textfield;

//   response.redirect("/internviewassignments");
// });
// router.get('/queriesubmission', function(req, res, next) {
//   res.render('intern/queriesubmission', { title: 'Register'});
// });


// router.post('/q_sub', async function(request, response, next){
//   var queries = request.body.textfield;
//   console.log(queries);

//   var item = {
//     allocation_id: String,
//     query: queries,
  
   
//   }
  
//   const submitQ = new QueryandReply(item);
//   const savedC = await submitQ.save();
//   response.send(savedC);

//   response.redirect("/queriesubmission");
// });


// router.get('/viewassignedcourses', function(req, res, next) {
//   res.render('intern/viewassignedcourses', { title: 'Register'});
// });

// router.get('/viewassignedmentor', function(req, res, next) {
//   res.render('intern/viewassignedmentor', { title: 'Register'});
// });


// //mentor
// router.get('/Mentorhome', function(req, res, next) {
//   res.render('mentor/home', { title: 'Register'});
// });


// router.get('/Assignwork', function(req, res, next) {
//   res.render('mentor/assignwork', { title: 'Register'});
// });

// router.post('/Assignwk_', async function(request, response, next){
//   var work_title = request.body.textfield;
//   var work = request.body.textarea;
//   var attach_file= request.body.fileField;
//   var sub_date = request.body.textfield3;
//   console.log(work_title);
//   console.log(work);
//   console.log(attach_file);
//   console.log(sub_date);
//   response.redirect("/Assignwork");
// });

// router.get('/evaluationandfeedback', function(req, res, next) {
//   res.render('mentor/evalandfeedback', { title: 'Register'});
// });
// router.post('/evalandfback', async function(request, response, next){
//   var score = request.body.textfield;
//   var feedback = request.body.textarea;
//   console.log(score);
//   console.log(feedback);

//   var item = {
    
//   evaluation_score: score,
//   feedback: feedback,
   
//   }
  
//   const evalfeed = new WorkReport(item);
//   const savedC = await evalfeed.save();
//   response.send(savedC);
//   response.redirect("/evaluationandfeedback");
// });


// router.get('/internmonitoring', function(req, res, next) {
//   res.render('mentor/internmonitoring', { title: 'Register'});
// });
// router.post('/intermon', async function(request, response, next){
//   var search = request.body.textfield;
//   var interns = request.body.textfield;
//   var work_assigned = request.body.textarea;  
//   var status = request.body.textarea;
//   var work_report = request.body.textarea;
//   console.log(search);

//   response.redirect("/internmonitoring");
// });


// router.get('/MentorProfile',async function(req, res, next) {

//   const docs = await Mentor.find({ Mentor_id :req.session.log_id, });
//   console.log(docs);

//   res.render('mentor/mentorprofileview', { title: 'Ment_Prof',data:docs[0]});
// });





// router.post('/mentorpro', async function(request, response, next){
//   var search = request.body.textfield;
//   var name = request.body.textfield;
//   var emp_id = request.body.textarea;  
//   var dob = request.body.textarea;
//   var address = request.body.textarea;
//   var phone_no = request.body.textarea;
//   var email = request.body.textarea;
//   var qualifications = request.body.textarea;
//   response.redirect("/MentorProfile");


// });


// router.get('/viewcoursealloc', function(req, res, next) {
//   res.render('mentor/viewcoursealloc', { title: 'Register'});
// });
// router.post('/viewcorsalloc', async function(request, response, next){
//   var interns = request.body.textfield;
//   var course_allocated = request.body.textfield;
//   var mentor_assigned = request.body.textarea; 

//   response.redirect("/viewcoursealloc");
// });



// router.get('/Mentorhome', function(req, res, next) {
//   res.render('mentor/home', { title: 'Register'});
// });



// module.exports = router;

var express = require('express');

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
const AssignWork = require('../models/assignwork')
const Work = require('../models/work');
var url = 'mongodb://127.0.0.1:27017/sample';






var dt=Date.now();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, dt + '-' + file.originalname); // Unique file name
  },
});

const stg = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/work'); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, dt + '-' + file.originalname); // Unique file name
  },
});

const upload = multer({ storage });
const work = multer({ stg });


// Define a route for uploading photos




////////////endmongo db part
db()
var router = express.Router();


router.get('/', async function(req, res, next) {
  req.session.destroy();
  res.render('login', { tt: 'IMS'});
});

router.post('/login_post', async function(request, response, next){
  var username = request.body.textfield;
  var password = request.body.textfield2;


  if(username)
  {

  try {
    const docs = await Login.find({ username : username, password: password  });



    if(docs.length==0)
    {
    
    //  response.redirect("/");
    //response.end();
    response.send('<script>alert("Invalid credentials"); window.location.href = "/"; </script>');


    }
    else
    {
      request.session.type = docs[0]['type']
      request.session.log_id = docs[0]['_id'];
      request.session.save();
      console.log(request.session);
      if(docs[0]['type']=="admin")
      {
        response.redirect("/adminHome");
        response.end();

      }
      else if(docs[0]['type']=="mentor")
      {
        response.redirect("/Mentorhome");
        response.end();
      }
      else if(docs[0]['type']=="intern")
      {
        response.redirect("/Internhome");
        response.end();
      }

      else
      {

      response.redirect('/')
      response.send('<script>alert("Something went wrong -_-"); window.location.href = "/"; </script>');
      response.end();
      }
    }
    

    
  } catch (error) {
    // Handle any errors
    
    console.error('Error:', error);
    res.send('<script>alert("Something went wrong -_-"); window.location.href = "/"; </script>');


    // response.send("nodata");
    response.end();
  }
}
else
{
  response.redirect("/");
  response.end();

}


});

function checkAuth1(req, res, next) {
  if (req.session.log_id && req.session.type=="intern") {
    next();
  }
else {
  req.session.destroy();
  return res.redirect('/');

}
 }

 function checkAuth(req, res, next) {
  if (req.session.log_id && req.session.type=="admin") {
    next();
  }
else {
  req.session.destroy();
  return res.redirect('/');

}
 }
router.get('/adminHome', checkAuth, function(req, res, next) {
  res.render('admin/home', { title: 'Register'});
});



router.get('/addcoursealloc',checkAuth, async function(req, res, next) {
  const Couradd = await Course.find({});
  const intadd = await Intern.find({});
  res.render('admin/addcoursealloc', { title: 'Mentor Management',mnn:intadd, cnn: Couradd });
});


router.post('/addcourseallocation', async function(request, response, next){
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


router.post('/addcoursedetail', async function(request, response, next){
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

router.post('/editcor', async function(request, response, next){
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


router.get('/addintern', checkAuth, function(req, res, next) {
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



router.post('/editint',upload.single('fileField'), async function(request, response, next){
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





router.post('/allocatement', async function(request, response, next){
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





//Intern
router.get('/Internhome', function(req, res, next) {
  res.render('intern/home', { title: 'Register'});
});

router.get('/assignmentsubmission', function(req, res, next) {
  res.render('intern/assignmentsubmission', { title: 'Register'});
});

router.post('/assign_sub', async function(request, response, next){
  var assignment_title = request.body.textfield2;
  var  assignment_file = request.body.filefield;
  console.log(assignment_title);
  response.redirect("/assignmentsubmission");
});


router.get('/internfeedback', function(req, res, next) {
  res.render('intern/internfeedback', { title: 'Register'});
});
router.post('/intfeed', async function(request, response, next){
  var Search = request.body.textfield;
  var Date = request.body.textfield;
  var Feedback = request.body.textfield;
  console.log(Search);
  response.redirect("/internfeedback");
});


router.get('/internprofileview',async function(req, res, next) {
    const docs = await Intern.find({ Inter_id :req.session.log_id, });
    res.render('intern/internprofileview', { title: 'Intern View', data: docs[0]});
  
 });


 router.get('/changepassword',async function(req, res, next) {
  i

  res.render('intern/changepassword', { title: 'Register'});
});

router.post('/changepassi', async function(request, response, next){
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

router.post('/intviewassign', async function(request, response, next){
  var Assignment_title = request.body.textfield;
  var Assigned_Date = request.body.textfield;
  var Sumbission_Date = request.body.textfield;

  response.redirect("/internviewassignments");
});
router.get('/queriesubmission', checkAuth, function(req, res, next) {
  res.render('intern/queriesubmission', { title: 'Register'});
});


router.post('/q_sub', async function(request, response, next){
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


//mentor
router.get('/Mentorhome', function(req, res, next) {
  res.render('mentor/home', { title: 'Register'});
});


router.get('/Assignwork', async function(req, res, next) {
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

router.post('/Assignwk_',work.single('fileField'), async function(request, response, next){
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



router.get('/evaluationandfeedback', function(req, res, next) {
  res.render('mentor/evalandfeedback', { title: 'Register'});
});
router.post('/evalandfback', async function(request, response, next){
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


router.get('/changepassword',async function(req, res, next) {
  

  res.render('mentor/changepassword', { title: 'Register'});
});

router.post('/changepassm', async function(request, response, next){
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


router.get('/internmonitoring', function(req, res, next) {
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


router.get('/MentorProfile',async function(req, res, next) {

  const docs = await Mentor.find({ Mentor_id :req.session.log_id, });

  res.render('mentor/mentorprofileview', { title: 'Ment_Prof',data:docs[0]});
});





router.post('/mentorpro', async function(request, response, next){
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