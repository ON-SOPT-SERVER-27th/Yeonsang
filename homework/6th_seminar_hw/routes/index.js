var express = require('express');
var router = express.Router();

router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/multer', require('./multer'));
router.use('/auth', require('./auth'));


module.exports = router;