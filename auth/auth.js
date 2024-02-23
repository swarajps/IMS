

const checkAuth= function (req, res, next) {

    if (req.session.log_id && req.session.type=="admin") {
      next();

    }
    else if (req.session.log_id && req.session.type=="intern") {
      next();
    }
    else if (req.session.log_id && req.session.type=="mentor") {
      next();
    }
    else {
    req.session.destroy();
    return res.redirect('/');
  
  }
}



module.exports = checkAuth;
