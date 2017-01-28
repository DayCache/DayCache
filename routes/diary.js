var express = require('express');
var router = express.Router();

var hasSignedIn = require('../middlewares/checker').hasSignedIn;

var DiaryModel = require('../models/diaries');

// GET /diary
router.get('/', hasSignedIn, function(req, res, next) {
  // 返回这个人的所有 diary
  var author = req.query.author;

  DiaryModel.getDiaries(author)
      .then(function (diaries) {
        res.render('diaries', {
          diaries: diaries
        });
      })
      .catch(next);
});

// @GET /diary/new
router.get('/new', hasSignedIn, function(req, res, next) {
  res.render('newDiary');
});

// @POST /diary
router.post('/', hasSignedIn, function(req, res, next) {
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
      diary = result.ops[0];
      req.flash('success', '保存好啦');
      res.redirect(`/diary/${diary._id}`);
    })
    .catch(next);
});

// @GET /diary/:id
router.get('/:diaryID', hasSignedIn, function(req, res, next) {
  // TODO: 隐私保护
  var diaryID = req.params.diaryID;

  DiaryModel.getDiaryByID(diaryID)
    .then(function (result) {
      var diary = result[0];
      if (!diary) {
        throw new Error('404');
      }

      res.render('diary', {
        diary: diary
      });
    })
    .catch(next);
});

module.exports = router;
