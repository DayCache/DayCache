module.exports = function (app) {
  app.get('/', function (req, res) {
    if (req.session.user) {
      return res.redirect('/diary');
    }
    return res.render('index');
  });

  app.use('/signup', require('./signup'));
  app.use('/signin', require('./signin'));
  app.use('/signout', require('./signout'));
  app.use('/diary', require('./diary'));

  app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
  });

};
