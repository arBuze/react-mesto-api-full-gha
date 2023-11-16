const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/NotAuthorizedError');

const { JWT_SECRET = 'secret-key' } = process.env;

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  const { authorization } = req.headers;
  console.log(authorization);
  if (!token) {
    return next(new NotAuthorizedError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    return next(new NotAuthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
