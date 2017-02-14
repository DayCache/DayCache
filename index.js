var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite');
var bodyParser = require('body-parser');
var routes = require('./routes');
var pkg = require('./package');
var passport = require('passport');

var app = express();

// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎为 ejs
app.set('view engine', 'ejs');
// disable 304
// app.disable('etag');

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*
// API
  如果需要新增加一个 API 的版本
  1. 把 ./api/v1 目录复制一份，改名为 v2
  2. 在下面的 API_VERSIONS 字典中加入一对 kv，如 `'Version 2': '/v2'`
  其它的事情就不需要担心啦
*/
var API_VERSIONS = {
  'Version 1': '/v1'
};
for (var v in API_VERSIONS) {
  var api = require('./api' + API_VERSIONS[v]);
  api(app);
}

// session 中间件
app.use(session({
  name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
    url: config.mongodb// mongodb 地址
  }),
  resave: true,
  saveUninitialized: true
}));

// flash 中间价，用来显示通知
app.use(flash());

// 设置模板全局常量
app.locals.website = {
  title: "DayCache",
  description: "A missing diary taking website."
};

// 添加模板必需的三个变量
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
});

// 路由
routes(app);

// 捕获 404 并定向到错误处理
app.use(function(req, res, next) {
  return res.send('404');
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    // 如果 path 包含 'api' 会返回 json
    if (req.path.includes('api')) {
      return res.json({
        status: {
          code: err.status,
          message: err.message
        },
        data: { }
      });
    }

    return res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// 生产环境下的错误处理
if (app.get('env') !== 'development') {
  app.use(function(err, req, res, next) {
    // 设置响应状态
    res.status(err.status || 500);

    if (req.path.includes('api')) {
      return res.json( {
        status: {
          code: err.status,
          message: err.message
        },
        data: { }
      });
    }

    // 渲染错误处理页
    return res.render('error', {
      message: err.message,
      error: {}
    });
  });
}

// 监听端口，启动程序
app.listen(config.port, function () {
  console.log(`${pkg.name} listening on port ${config.port}`);
});

