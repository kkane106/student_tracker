var express = require('express');
var router = express.Router();
var studentCtrl = require('../controllers/studentCtrl');
var secret = process.env.SECRET || require('../../.credentials').secret
var jwt = require('jsonwebtoken');
// var ejwt = require('express-jwt');
// var auth = ejwt({
// 	secret : process.env.SECRET || require('../../.credentials').secret,
// 	userProperty : 'payload'
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

router.get('/', studentCtrl.index);
router.get('/:id', studentCtrl.show);
router.post('/', studentCtrl.create);
router.put('/:id', studentCtrl.update);

// Don't want to delete student records
// router.delete('/:id', studentCtrl.destroy);

module.exports = router;