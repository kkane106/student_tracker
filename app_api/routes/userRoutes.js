var express = require('express');
var router = express.Router();
var userRoutes = require('../controllers/userCtrl');
// Configure JWT Security for API
var ejwt = require('express-jwt');
var auth = ejwt({
	secret : process.env.SECRET || require('../../.credentials').secret,
	userProperty : 'payload'
});

router.get('/', auth, userRoutes.index);
router.get('/:id', auth, userRoutes.show);
router.post('/', auth, userRoutes.create);
router.put('/:id', auth, userRoutes.update);
router.delete('/:id', auth, userRoutes.destroy);

module.exports = router;