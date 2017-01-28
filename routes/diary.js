var express = require('express');
var router = express.Router();

var hasSignedIn = require('../middlewares/checker').hasSignedIn;

var DiaryModel = require('../models/diaries');

// GET /diary
router.get('/', hasSignedIn, function(req, res, next) {
  // 返回这个人的所有 diary
  res.send('@GET diariy');
});

// @GET /diary/new
router.get('/new', hasSignedIn, function(req, res, next) {
  res.render('newDiary');
});

// @POST /diary
router.post('/diary', hasSignedIn, function(req, res, next) {
  var author = req.session.user._id;
  var content = req.fields.content;

  try {
    if (!content.length) {
      throw new Error('日记不能为空哦');
    }
  } catch (e) {
    req.flash('error', e.message);
    return res.redirect('back');
  }

  var diary = {
    author: author,
    content: content,
  };

  DiaryModel.create(diary)
    .then(function (result) {
      // 此 post 是插入 mongodb 后的值，包含 _id
      diary = result.ops[0];
      req.flash('success', '保存好啦');
      res.redirect(`/diary/${diary._id}`);
    })
    .catch(next);
});

// @GET /diary/:id
router.get('/diary/:id', hasSignedIn, function(req, res, next) {
  // TODO: 隐私保护
  res.render('diary');
});

module.exports = router;
