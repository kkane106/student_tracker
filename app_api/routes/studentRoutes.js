var express = require('express');
var router = express.Router();
var studentCtrl = require('../controllers/studentCtrl');

router.get('/', studentCtrl.index);
router.get('/:id', studentCtrl.show);
router.post('/', studentCtrl.create);
router.put('/:id', studentCtrl.update);
router.delete('/:id', studentCtrl.destroy);

module.exports = router;