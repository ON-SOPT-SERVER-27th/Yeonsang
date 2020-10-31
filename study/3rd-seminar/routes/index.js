var express = require('express');
var router = express.Router();

router.use('/brains', require('./brain'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
