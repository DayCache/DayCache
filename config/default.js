module.exports = {
  port: 3000,
  session: {
    secret: 'dayCache',
    key: 'dayCache',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/dayCache',
  mail: {
    host: 'smtp.163.com',
    port: 25,
    auth: {
        user: 'classTC@163.com',
        pass: 'daycache123'
    }
  }
};
