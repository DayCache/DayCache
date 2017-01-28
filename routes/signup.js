var express = require('express');
var router = express.Router();

// @GET /signup
router.get('/', function(req, res, next) {
  res.render('signup');
});

// @POST /signup
router.post('/', function(req, res, next) {
  res.send('signup');
});

module.exports = router;
