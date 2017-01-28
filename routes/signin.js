var express = require('express');
var router = express.Router();

// @GET /signin
router.get('/', function(req, res, next) {
  res.render('signin');
});

// @POST /signin
router.post('/', function(req, res, next) {
  res.send('POST /signin');
});

module.exports = router;
