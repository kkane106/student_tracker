var router = require('./loginRoutes');
var applicationCtrl = require('../controllers/applicationCtrl');

router.get('/', applicationCtrl.home);


module.exports = router;