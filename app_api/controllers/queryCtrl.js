var Mongo = require('mongodb').MongoClient;
var dbURI = 'mongodb://localhost:27017/studentTracker';
if (process.env.NODE_ENV == 'production') {
  dbURI = process.env.DB_URI;
}

module.exports.studentsByName = function(req,res,next){
  Mongo.connect(dbURI, function(err,db){
    var coll = db.collection('students');
    coll.find({
      "name" : {
        $regex : req.params.name, $options : "i"
      }
    }).project({"name" : 1}).toArray(function(err,docs){
      res.json(docs);
    });

  })
}