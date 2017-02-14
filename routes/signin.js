var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');
var hasNotSignedIn = require('../middlewares/checker').hasNotSignedIn;

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// @GET /signin
router.get('/', function(req, res, next) {
  return res.render('signin');
});

// @POST /signin
router.post('/', urlencodedParser, function(req, res, next) {
  var name = req.body.username;
  var password = req.body.password;

  UserModel.getUserByName(name)
    .then(function (user) {
      if (!user) {
        req.flash('error', '用户不存在');
        return res.redirect('back');
      }
      // 检查密码是否匹配
      if (sha1(password) !== user.password) {
        req.flash('error', '用户名或密码错误');
        return res.redirect('back');
      }
      req.flash('success', '登录成功');
      // 用户信息写入 session
      delete user.password;
      req.session.user = user;
      // 跳转到主页
      return res.redirect('/');
    })
    .catch(next);
});

module.exports = router;
