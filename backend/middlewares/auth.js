const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/NotAuthorizedError');

const { NODE_ENV, JWT_SECRET = 'secret-key' } = process.env;

module.exports.auth = (req, res, next) => {
  //const token = req.cookies.jwt;
  const { authorization } = req.headers;
  
  if (!authorization) {
    return next(new NotAuthorizedError('Необходима авторизация'));
  }

  const token = authorization;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    return next(new NotAuthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
