module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'kjhkjshdafiyuUIKGHi7tbdhjuhiuhiuk'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'hskjhfYUTGigbduiyt'),
  },
});
