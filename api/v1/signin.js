// path: `/api/v1/signin`
var express = require('express');
var router = express.Router();

router.route('/')
  .post(function(req, res) {
    return res.json({
      status: {
        code: 200,
        message: 'signin!'
      },
      data:{}
    });
  })

module.exports = router;
