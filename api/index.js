module.exports = function (app) {

  app.use('/api/diary', require('./diary'));
};
