var marked = require('marked');
var Diary = require('../lib/mongo').Diary;

Diary.plugin('contentToHTML', {
  afterFind: function (diaries) {
    return diaries.map(function (diary) {
      diary.content = marked(diary.content);
      return diary;
    });
  },
  afterFindOne: function (diary) {
    if (diary) {
      diary.content = marked(diary.content);
    }
    return diary;
  }
});

module.exports = {
  create: function create(diary) {
    return Diary.create(diary).exec();
  },

  getDiaryByID: function getDiaryByID(diaryID) {
    return Diary
      .find({ _id: diaryID })
      .populate({ path: 'author', model: 'User' })
      .addCreatedAt()
      .contentToHTML()
      .exec();
  },

  getDiaries: function getDiaries(author) {
    var query = {};
    if (author) {
      query.author = author;
    }
    return Diary
      .find(query)
      .populate({ path: 'author', model: 'User' })
      .sort({ _id: -1 })
      .addCreatedAt()
      .contentToHTML()
      .exec();
  },
};

