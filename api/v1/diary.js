// path: `/api/v1/diary`
var express = require('express');
var router = express.Router();
var config = require('config-lite');
const expressJwt = require('express-jwt');
const authenticate = expressJwt({ secret : config.auth.serverSecret });

router.route('/')
  .get(authenticate, function(req, res) {
    return res.json({
      status: {
        code: 200,
        message: req.user
      },
      data: {}
    });
  })
  .post(function(req, res) {
    return res.json({
      message: 'new diary'
    });
  })

router.route('/:id')
  .get(function(req, res) {
    return res.json({
      id: req.params.id,
      message: 'get diary'
    });
  })

module.exports = router;
