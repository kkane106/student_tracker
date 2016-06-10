var express = require('express');
var app = express();
var bp = require('body-parser');
var path = require('path');

// TODO: configure cookie secret for production
var secret = require('./.credentials').secret;
if (process.env.NODE_ENV) {
	secret = process.env.SECRET;	
}
// TODO: implement Production DB connection settings
var dbURI = 'mongodb://localhost:27017/studentTracker';
if (process.env.NODE_ENV) {
	dbURI = process.env.DB_URI;
}
// TODO: configure PORT dynamically
var port = 3000;
if (process.env.PORT) {
	port = process.env.PORT;
}

// Set view engine to ejs
app.set('views', './app_server/views');
app.set('view engine', 'html');
app.use('/ng', express.static('app_client'));
app.use('/css', express.static('app_server/public/css'));
app.use('/js', express.static('app_server/public/js'));
app.use('/fonts', express.static('app_server/public/fonts'));

// Passport Dependencies
var cookie = require('cookie-parser');
var session = require('express-session');
// passport config file
var passportConfig = require('./config/passportConfig');
var Mongo = require('mongodb').MongoClient;

app.use(bp.json());
app.use(bp.urlencoded({extended : true}));

app.use(cookie(secret));

app.use(session({
	resave:false,
	saveUninitialized:false,
	secret: secret
}))

app.use(passportConfig.initialize());
app.use(passportConfig.session());


// Routes
app.use('/api/students', require('./app_api/routes/studentRoutes'));
app.use('/api/users', require('./app_api/routes/userRoutes'));
app.use('/', require('./app_server/routes/loginRoutes'));
app.use('/search', require('./app_server/routes/searchRoutes'));

// catch all routing for ng SPA
app.use(function(req,res){
	res.sendfile('app_server/views/index.html');
});

// Error Handling
app.use(function(req,res,next){
	res.sendStatus(404);
})

app.use(function(err,req,res,next){
	if (err.name === 'UnauthorizedError') {
		res.status(401);
		res.json({"message" : err.name + ":" + err.message });
	} else {
		res.status(500);
		res.send(err.message);
	}
});

app.listen(port, function(){
	console.log("Student App Listening on port: " + port);
	// require('./config/mongo').insertSeedData();
	// Ensure that the DB enforces unique user IDs and usernames (_id)
	Mongo.connect(dbURI, function(err,db){
		var coll = db.collection('users');
		coll.createIndex({"_id" : 1}, {unique : true});
		coll.createIndex({"user_id" : 1}, {unique : true});
		var userCounters = db.collection('userCounters');
		userCounters.insert({
			"_id" : "userid",
			"seq" : 1
		});
		db.close();
	});
})