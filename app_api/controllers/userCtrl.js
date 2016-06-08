var Mongo = require('mongodb').MongoClient;
// TODO: Implement Production DB connection settings
var dbURI = 'mongodb://localhost:27017/studentTracker';
if (process.env.NODE_ENV) {
	dbURI = process.env.DB_URI;
}
// Require Mongo Helpers
var dbHelpers = require('../../config/mongo');
var bcrypt = require('bcrypt');
const saltRounds = 15;

module.exports.index = function(req,res,next){
	Mongo.connect(dbURI, function(err,db){
		if (err) return next(err);

		var coll = db.collection('users');
		coll.find().toArray(function(err,docs){
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
		var coll = db.collection('users');
		coll.find({"user_id" : id}).limit(1).next(function(err,doc){
			if(err) return next(err);
			res.json(doc);
			return db.close();
		});
	});
};

module.exports.create = function(req,res,next){
	if (!req.body.username || 
			!req.body.password || 
			!req.body.email) {
		return res.sendStatus(422);
	} 
	Mongo.connect(dbURI, function(err,db){
		if (err) return next(err);

		var coll = db.collection('users');
		// encrypt user password at creation
		bcrypt.hash(req.body.password, saltRounds, function(err,hash){
			if (err) return next(err);
			// auto_increment _id of users
			dbHelpers.getNextSequence("userid", db, function(err,doc){
				if (err) return next(err);
				coll.insertOne({
					"user_id" : doc.value.seq,
					"_id" : req.body.username,
					"password" : hash,
					"email" : req.body.email
				}, function(err,result){
					if (err) return next(err);
					if (result.insertedCount > 0) {
						res.sendStatus(201);
					}
					return db.close();
				});	
			});
		});
	});
};

module.exports.update = function(req,res,next){
	var id = parseInt(req.params.id);
	if (!id) {
		return next(new Error("User ID must be a Number"));
	}
	Mongo.connect(dbURI, function(err,db){
		var coll = db.collection('users');
		coll.findOneAndUpdate(
			{"user_id" : id}, 
			req.body, 
			{
				upsert: false,
				returnOriginal:false
			},
			function(err, doc) {
				// TODO: figure out what to do with update
			})
	})

};

module.exports.destroy = function(req,res,next){
	// TODO: implement destroy
};