var express = require('express');
var router = express.Router();

var hasSignedIn = require('../middlewares/checker').hasSignedIn;

// GET /signout 登出
router.get('/', hasSignedIn, function(req, res, next) {
  // 清空 session 中用户信息
  req.session.user = null;
  req.flash('success', '登出成功');
  return res.redirect('/');
});

module.exports = router;
