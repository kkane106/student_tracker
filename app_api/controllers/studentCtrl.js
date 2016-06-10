var Mongo = require('mongodb').MongoClient;
// TODO: Implement Production DB connection settings
var dbURI = 'mongodb://localhost:27017/studentTracker';
if (process.env.NODE_ENV) {
	dbURI = process.env.DB_URI;
}

module.exports.index = function(req,res,next){
	Mongo.connect(dbURI, function(err,db){
		if (err) return next(err);
		var coll = db.collection('students');
		coll.find({}).toArray(function(err,docs){
			if (err) return next(err);
			if (docs.length < 1) {
				return res.sendStatus(404);
			}
			res.json(docs);
			return db.close();
		});
	});
};

module.exports.show = function(req,res,next){
	var id = parseInt(req.params.id);
	if (!id) {
		return next(new Error("User ID must be a Number"));
	}
	Mongo.connect(dbURI, function(err,db){
		if (err) return next(err);
		var coll = db.collection('students');
		coll.find({"_id" : id}).limit(1).next(function(err,doc){
			if (err) return next(err);
			res.json(doc);
			return db.close();
		});
	});
};

module.exports.create = function(req,res,next){};

module.exports.update = function(req,res,next){};

module.exports.destroy = function(req,res,next){};

module.exports.active = function(req,res,next){
	Mongo.connect(dbURI, function(err,db){
		if (err) return next(err);
		var coll = db.collection('students');
		coll.find({applications: {$elemMatch: {status : "active"}}}).toArray(function(err,docs){
			if (err) return next(err);
			if (docs.length < 1) {
				return res.sendStatus(404);
			}
			res.json(docs);
			return db.close();
		});
	});
}