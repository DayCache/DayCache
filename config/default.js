module.exports = {
  port: 3000,
  session: {
    secret: 'dayCache',
    key: 'dayCache',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/dayCache'
};
