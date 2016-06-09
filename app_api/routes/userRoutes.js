var express = require('express');
var router = express.Router();
var userRoutes = require('../controllers/userCtrl');
// Configure JWT Security for API
var secret = process.env.SECRET || require('../../.credentials').secret
var jwt = require('jsonwebtoken');
// var ejwt = require('express-jwt');
// var auth = ejwt({
//  secret : process.env.SECRET || require('../../.credentials').secret,
//  userProperty : 'payload'
// });

router.use(function(req,res,next){
  var token = req.headers['x-access-token'];
  if (token) {
    console.log(token);
    jwt.verify(token, secret, function(err,decoded){
      console.log('decoded');
      console.log(decoded);
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
});

router.get('/', userRoutes.index);
router.get('/:id', userRoutes.show);
router.post('/', userRoutes.create);
router.put('/:id', userRoutes.update);
router.delete('/:id', userRoutes.destroy);

module.exports = router;