var express = require('express');
var router = express.Router();
var loginCtrl = require('../controllers/loginCtrl');

router.get('/login', loginCtrl.login);
router.post('/login', loginCtrl.authenticate);

module.exports = router;