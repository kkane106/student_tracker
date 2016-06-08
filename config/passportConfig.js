var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Mongo = require('mongodb').MongoClient;
// TODO: Implement Production DB connection settings
var dbURI = 'mongodb://localhost:27017/studentTracker';
if (process.env.NODE_ENV) {
	dbURI = process.env.DB_URI;
}
var bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
		usernameField : "_id",
		passwordField : "password"
	},
	function(username,password,callback) {
		// TODO: Mongo query user
		Mongo.connect(dbURI, function(err,db){
			if (err) {
				console.error(err);
				return callback(err);
			};

			var collection = db.collection('users');
			collection.findOne({"_id" : username}, function(err,user){
				if (err) {
					console.error(err);
					return callback(err);
				};
				if (!user) {
					console.log('no user found');
					return callback(null,false);
				}
				bcrypt.compare(password, user.password, function(err,result){
					if (err) return callback(err);
					return callback(null,user);
				})
				db.close();
			})
		})
	}
));

passport.serializeUser(function(user,callback){
    callback(null, user._id);
});

passport.deserializeUser(function(id,callback){
Mongo.connect(dbURI, function(err,db){
	if (err) {
		console.error(err);
		return callback(err);
	};

	var collection = db.collection('users');
	collection.findOne({"_id" : id}, function(err,user){
		if (err) {
			console.error(err);
			return callback(err);
		};
		return callback(null,user);
		db.close();
	})
})
});

module.exports = passport;