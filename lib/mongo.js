var config = require('config-lite');
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

exports.User = mongolass.model('User', {
  name: { type: 'string' },
  password: { type: 'string' },
  avatar: { type: 'string' },
  bio: { type: 'string' }
});
exports.User.index({ name: 1 }, { unique: true }).exec();// 根据用户名找到用户，用户名全局唯一

exports.Diary = mongolass.model('Diary', {
  author: { type: Mongolass.Types.ObjectId },
  content: { type: 'string' },
});
exports.Post.index({ author: 1, _id: -1 }).exec();// 按创建时间降序查看用户的文章列表
