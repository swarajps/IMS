const Login = require('../models/login');
var express = require('express');
var router = express.Router();

/* GET users listing. */
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
    response.send('<script>alert("Something went wrong -_-"); window.location.href = "/"; </script>');


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

module.exports = router;
