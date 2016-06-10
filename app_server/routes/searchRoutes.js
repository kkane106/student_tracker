var express = require('express');
var router = express.Router();

var secret = process.env.SECRET || require('../../.credentials').secret
var jwt = require('jsonwebtoken');

var Mongo = require('mongodb').MongoClient;
var dbURI = 'mongodb://localhost:27017/studentTracker';
if (process.env.NODE_ENV == 'production') {
  dbURI = process.env.DB_URI;
}

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

router.get('/students/:name', function(req,res,next){
  console.log("in correct route");
  Mongo.connect(dbURI, function(err,db){
    var coll = db.collection('students');
    coll.find({
      "name" : {
        $regex : req.params.name, $options : "i"
      }
    }).project({"name" : 1}).toArray(function(err,docs){
      console.log(docs);
      res.json(docs);
    });

  })
})

module.exports = router;