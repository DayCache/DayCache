
// 如果需要加入新的请求路径，只需要在下面加入路径
// 然后在 `api/v1` 下建立同名文件即可
let ROUTE_PATHS = [
  '/signin',
  '/signup',
  '/diary'
];

module.exports = function (app) {

  for (let i in ROUTE_PATHS) {
    let path = ROUTE_PATHS[i];
    console.log(path);
    app.use('/api/v1' + path, require('.' + path));
  }

};
