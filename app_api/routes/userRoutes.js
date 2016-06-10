var express = require('express');
var router = express.Router();
var userRoutes = require('../controllers/userCtrl');
var jwtAuthenticator = require('../../config/jsonWebTokenAuthenticator');

router.use(jwtAuthenticator);

router.get('/', userRoutes.index);
router.get('/:id', userRoutes.show);
router.post('/', userRoutes.create);
router.put('/:id', userRoutes.update);
router.delete('/:id', userRoutes.destroy);

module.exports = router;