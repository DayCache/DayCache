// path: `/api/v1/signin`
var express = require('express');
var router = express.Router();
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');
var config = require('config-lite');


router.post('/', passport.initialize(), passport.authenticate(
    'local', {
      session: false,
      scope: []
    }), serialize, generateToken, respond);

passport.use(new Strategy(
  function(username, password, done) {
    db.authenticate(username, password, done);
  }
));

const db = {
  updateOrCreate: function(user, cb) {
    cb(null, user);
  },
  authenticate: function(username, password, cb) {
    if (username === 'test' && password === '666666') {
      cb(null, {
        id: 666,
      });
    } else {
      cb(null, false);
    }
  }
};

function serialize(req, res, next) {
  db.updateOrCreate(req.user, function(err, user) {
    if (err) {
      return next(err);
    }

    req.user = {
      id: user.id
    };
    next();
  });
}

function generateToken(req, res, next) {
  req.token = jwt.sign({
    id: req.user.id,
  }, config.auth.serverSecret, {
    expiresIn: config.auth.expireTime
  });
  next();
}

function respond(req, res) {
  return res.json({
    user: req.user,
    token: req.token
  });
}

module.exports = router;
