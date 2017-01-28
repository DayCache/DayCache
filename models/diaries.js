var Diary = require('../lib/mongo').Diary;

module.exports = {
  create: function create(diary) {
    return Diary.create(diary).exec();
  }
};
