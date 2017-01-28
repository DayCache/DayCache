var config = require('config-lite');
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

exports.User = mongolass.model('User', {
  name: { type: 'string' },
  password: { type: 'string' },
  screenName: { type: 'string' },
  gender: { type: 'string', enum: ['male', 'female'] }
});
exports.User.index({ name: 1 }, { unique: true }).exec();// 根据用户名找到用户，用户名全局唯一

exports.Diary = mongolass.model('Diary', {
  author: { type: Mongolass.Types.ObjectId },
  content: { type: 'string' },
});
exports.Diary.index({ author: 1, _id: -1 }).exec();// 按创建时间降序查看用户的文章列表


var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');

// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
  afterFind: function (results) {
    results.forEach(function (item) {
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
    });
    return results;
  },
  afterFindOne: function (result) {
    if (result) {
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
    }
    return result;
  }
});
