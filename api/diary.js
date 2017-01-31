// route path: `/api/diary`
var express = require('express');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    res.json({
      message: 'get diaries'
    });
  })
  .post(function(req, res) {
    res.json({
      message: 'new diary'
    });
  })

router.route('/:id')
  .get(function(req, res) {
    res.json({
      id: req.params.id,
      message: 'get diary'
    });
  });

module.exports = router;
