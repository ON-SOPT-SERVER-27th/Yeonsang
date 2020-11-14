var express = require('express');
var router = express.Router();
const {User, Comment} = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST comments. */
router.post('/comments', async (req, res, next) => {
  try {
    const comment = await Comment.create({
      // 여기를 채워보세요 ~
    });
    console.log(comment);
    res.status(200).json(comment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* GET User's comments. */
router.get('/users/:id/comments', async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      // 여기를 채워보세요 ~
    });
    console.log(comments);
    res.json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;