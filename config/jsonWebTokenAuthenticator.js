// Configure Json Web Token security for ng SPA

var secret = process.env.SECRET || require('../.credentials').secret
var jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
  var token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret, function(err,decoded){
      if(!decoded || err) {
        res.status(401);
        return res.json({
          success : false,
          message : 'Failed to authenticate token'
        });
      } else {
        req.payload = decoded;
        next();
      }
    })
  } else {
    res.status(401)
    res.json({
      success : false,
      message : 'No token provided'
    });
  }
};