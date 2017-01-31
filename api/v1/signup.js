// path: `/api/v1/signup`
var express = require('express');
var router = express.Router();

router.route('/')
  .post(function(req, res) {
    return res.json({
      status: {
        code: 200,
        message: 'signup'
      },
      data:{}
    });
  })

module.exports = router;
