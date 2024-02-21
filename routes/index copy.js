var express = require('express');

var multer = require('multer');
var database = require('../database');
const db = require('../config/db');
const User = require('../models/user');

var url = 'mongodb://127.0.0.1:27017/sample';








const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  },
});

const upload = multer({ storage });


// Define a route for uploading photos




////////////endmongo db part
db()
var router = express.Router();

router.post('/upload', upload.single('photo'), (req, res) => {
  res.status(200).json({ message: 'Photo uploaded successfully' });
});



////////mongo insertionsample





router.get('/insert', async function(req, res, next) {
  var item = {
    name: 'rissa',
    email:'technologya',
    
  };

  const newUser = new User(item);

  // Save the user to the database
  const savedUser = await newUser.save();
  res.send(savedUser);
  });

/* GET home page. */
router.get('/showalldata', async function(req, res, next) {
  try {
    const docs = await User.find({ /* your query criteria */ });
    // Handle the found documents here
    console.log('Found documents:', docs);

    res.render('employee', { employees: docs });
    res.end();
  } catch (error) {
    // Handle any errors
    res.send(error);
    console.error('Error:', error);
  }

});

router.post('/showalldatasearch', async function(request, response, next){

  var name1 = request.body.search;

  if(name1)
  {

  try {
    const docs = await User.find({ name : { $regex: name1, $options: 'i' } });
    // Handle the found documents here
    console.log('Found documents:', docs);

    response.render('employee', { employees: docs });
    response.end();
  } catch (error) {
    // Handle any errors
    
    console.error('Error:', error);
    throw error;
  }
}


else{
  response.redirect("/showalldata");
}

});








router.get('/', async function(req, res, next) {
  res.render('index', { title: 'Express'});

});

router.post('/login', async function(request, response, next){

    var user_email_address = request.body.user_email_address;

    var user_password = request.body.user_password;

    if(user_email_address )
    {
  
    try {
      const docs = await User.find({ email : user_email_address, password: user_password  });

      console.log("aaa", docs.length);

      

      if(docs.length==0)
      {


        console.log("Nikhitha", docs[0]);

      

        response.redirect("/");
        response.end();

      }
      else
      {
        request.session.user = docs[0];
        request.session.save();


        if(user_email_address=="admin@gmail.com")
        {
          response.redirect("/showalldata");
          response.end();

        }
        else
        {

        response.redirect('/viewprofile')
        response.end();
        }
      }
      

      
    } catch (error) {
      // Handle any errors
      
      console.error('Error:', error);
      response.send("nodata");
      response.end();
    }
  }
  else
  {
    response.redirect("/");
    response.end();

  }
  
  
  




    

});




router.get('/uploads', function(req, res, next) {
  res.render('upload', { title: 'Express'});
});


router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express'});
});


router.post('/registerpost', async function(request, response, next){


  console.log("aaaa",request.body);

  var name1 = request.body.name;

  var email1 = request.body.email;
  var gender1 = request.body.gender;
  var dob1 = request.body.dob;

  var phone1 = request.body.phone;
  var password1 = request.body.password;




  var item = {
    name: name1,
    email:email1,
    gender:gender1,
    dob:dob1,
    phone:phone1,
    password:password1,
    
  };

  const newUser = new User(item);

  // Save the user to the database
  const savedUser = await newUser.save();
 





  res.redirect("/showalldata");
  res.end();
  

});


router.get('/viewprofile', function(req, res, next) {

  const sessionuser = req.session.user;
    // res.send(sessionuser);

    console.log("aaaa",sessionuser);


  res.render('viewprofile', { data:sessionuser });
});




router.get('/editprofile', async function(req, res, next) {

  const id = req.query.email;

  const docs = await User.find({ email : id });

  

  res.render('editprofile', { employees:docs[0] });
});


router.post('/editpost', async function(request, res, next){


  console.log("aaaa",request.body);

  var name1 = request.body.name;

  var email1 = request.body.email;
  var gender1 = request.body.gender;
  var dob1 = request.body.dob;

  var phone1 = request.body.phone;




  var item = {
    name: "likhil",
    
    gender:gender1,
    dob:dob1,
    phone:phone1,

    
  };

 

  try {
    // Find the document by ID and update it
    const updatedDocument = await User.findOneAndUpdate(
      { email : email1},
      { $set: { name: name1, gender:gender1,
        dob:dob1,
        phone:phone1,  } }, // Define the fields you want to update
      { new: true } // Return the updated document
    );

 
    console.log("aaaa","updated");

  res.redirect("/showalldata");
  res.end();
  } catch (error) {
    res.redirect("/showalldata");
  res.end();
  }

  

});

router.get('/delete-by-email', async (req, res,next) => {
  const email1 = req.query.email;

  try {
    // Find the document by email and delete it
    const deletedDocument = await User.findOneAndRemove({ email : email1 });

    res.redirect("/showalldata");
    res.end();

    
  } catch (error) {
    res.redirect("/showalldata");
    res.end();
  }
});



module.exports = router;
