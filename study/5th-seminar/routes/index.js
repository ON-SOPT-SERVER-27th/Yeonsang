var express = require('express');
var router = express.Router();

// Multer 설정
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config.loadFromPath(__dirname + '/../config/s3.json');

const s3 = new aws.S3();
const storage = multerS3({
  s3: s3,
  bucket: 'sopt-27-seminar5',
  acl: 'public-read',
  key: function(req, file, callback) {
    callback(null, file.originalname);
  }
});

/*
const storage = multer.diskStorage( {
  destination: function(req, file, callback) {
    callback(null, 'uploads/');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});
*/
const upload = multer({ storage: storage })

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

// GET Upload page
router.get('/upload', function (req, res) {
  res.render('upload');
});


// POST Image
router.post('/upload', upload.single('imagefile'), function (req, res) {
  res.send('Upload Success!');
  console.log(req.file);
});


module.exports = router;
