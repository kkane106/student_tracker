var express = require('express');
var app = express();
var bp = require('body-parser');
var path = require('path');

app.use(bp.json());

app.use('/students', require('./app_api/routes/studentRoutes'));
app.use('/users', require('./app_api/routes/userRoutes'));

app.use(function(req,res,next){
	res.sendStatus(404);
})

app.use(function(err,req,res,next){
	res.status(500);
	res.send(err);
});


app.listen(3000, function(){
	console.log("Student App Listening on 3000");
})