var express = require('express');
var router = express.Router();
var loginCtrl = require('../controllers/loginCtrl');

router.post('/login', loginCtrl.authenticate);

// // Seed Data Generator
// var seed = require('../../config/mongo').seedData;
// router.get('/seed', function(req,res){
//   var students = [];
//   for (var i = 0 ; i < 20 ; i++) {
//     students.push(seed());
//   }
//   res.json(students);
// })

module.exports = router;