var passport = require('../../config/passportConfig');
var jwt = require('jsonwebtoken');
var secret = require('../../.credentials.js').secret;
if (process.env.NODE_ENV == 'production'){
	secret = process.env.SECRET;
}

module.exports.login = function(req,res,next) {
	res.render('login');
}

module.exports.authenticate = function(req,res,next) {
	passport.authenticate('local', function(err,user,info){
		if (err || !user) {
			return res.sendStatus(401);
		}
		req.login(user, function(err){
			if (err) return next(err);
			res.status(200);
			return res.json({"token" : generateJwt(user)});
		});
	})(req,res,next);
};

// Helper for JWTs
var generateJwt = function(user) {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 1);
	return jwt.sign({
		_id : user.user_id,
		email : user.email,
		username : user._id,
		exp : parseInt(expiry.getTime() / 1000)
	}, secret);
}

