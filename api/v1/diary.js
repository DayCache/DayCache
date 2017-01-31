// path: `/api/v1/diary`
var express = require('express');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    return res.json({
      status: {
        code: 200,
        message: 'get diary'
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
