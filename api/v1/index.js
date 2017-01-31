var express = require('express');

var v1Path = '/api/v1';

module.exports = function (app) {

  app.use(v1Path + '/diary', require('./diary'));
  app.use(v1Path + '/signin', require('./signin'));
  app.use(v1Path + '/signup', require('./signup'));

};
