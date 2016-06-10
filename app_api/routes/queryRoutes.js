var express = require('express');
var router = express.Router();
var queryCtrl = require('../controllers/queryCtrl');

var jwtAuthenticator = require('../../config/jsonWebTokenAuthenticator');

router.use(jwtAuthenticator);

router.get('/students/:name', queryCtrl.studentsByName)

module.exports = router;