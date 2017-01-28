var path = require('path');
var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');
var hasNotSignedIn = require('../middlewares/checkLogin').hasNotSignedIn;

// @GET /signup
router.get('/', hasNotSignedIn, function(req, res, next) {
  res.render('signup');
});

// @POST /signup
router.post('/', function(req, res, next) {
  var name = req.fields.username;
  var password = req.fields.password;
  var repassword = req.fields.confirmPassword;
  var gender = req.fields.gender;
  var screenName = req.fields.screenName;

  try {
    if (!(name.length >= 5 && name.length <= 30)) {
      throw new Error('用户名请限制在 5-30 个字符');
    }
    if (password.length < 6) {
      throw new Error('密码至少 6 个字符');
    }
    if (password !== repassword) {
      throw new Error('两次输入密码不一致');
    }
    if (screenName.length === 0) {
      throw new Error('请输入昵称');
    }
    if (['male', 'female'].indexOf(gender) === -1) {
      throw new Error('还没有选择性别');
    }
  } catch (e) {
    req.flash('error', e.message);
    return res.redirect('/signup');
  }

  // 明文密码加密
  password = sha1(password);

  // 待写入数据库的用户信息
  var user = {
    name: name,
    password: password,
    screenName: screenName,
    gender: gender,
  };

  // 用户信息写入数据库
  UserModel.create(user)
           .then(function (result) {
             // 此 user 是插入 mongodb 后的值，包含 _id
             user = result.ops[0];
             // 将用户信息存入 session
             delete user.password;
             req.session.user = user;
             // 写入 flash
             req.flash('success', '注册成功');
             // 跳转到首页
             res.redirect('/');
           })
           .catch(function (e) {
             // 用户名被占用则跳回注册页，而不是错误页
             if (e.message.match('E11000 duplicate key')) {
               req.flash('error', '用户名已被占用');
               return res.redirect('/signup');
             }
             next(e);
           });
});

module.exports = router;
