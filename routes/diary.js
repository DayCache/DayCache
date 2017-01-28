var express = require('express');
var router = express.Router();

var hasSignedIn = require('../middlewares/checker').hasSignedIn;

// GET /diary
router.get('/', hasSignedIn, function(req, res, next) {
  // 返回这个人的所有 diary
  res.send('@GET diariy');
});

// @GET /diary/new
router.get('/new', hasSignedIn, function(req, res, next) {
  res.render('newDiary');
});


module.exports = router;
