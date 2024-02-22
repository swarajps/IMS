module.exports= function checkAuth1(req, res, next) {
    if (req.session.log_id && req.session.type=="intern") {
      next();
    }
  else {
    req.session.destroy();
    return res.redirect('/');
  
  }
}

module.exports= function checkAuth2(req, res, next) {
    if (req.session.log_id && req.session.type=="mentor") {
      next();
    }
  else {
    req.session.destroy();
    return res.redirect('/');
  
  }
}
module.exports= function checkAuth(req, res, next) {
    if (req.session.log_id && req.session.type=="admin") {
      next();
    }
  else {
    req.session.destroy();
    return res.redirect('/');
  
  }
}