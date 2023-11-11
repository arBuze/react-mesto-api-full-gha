require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');

const helmet = require('helmet');
const { errors } = require('celebrate');
const NotFoundError = require('./errors/NotFoundError');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { validateSignIn, validateSignUp } = require('./middlewares/validate');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./utils/constants');

const { PORT = 3001 } = process.env;
const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3001', maxAge: 60 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(limiter);
app.use(helmet());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

/* логгер запросов */
app.use(requestLogger);

/* обработка путей */
app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.delete('/', auth, (req, res, next) => {
  try {
    res.clearCookie('jwt', {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });
    return res.send({ message: 'токен удален' }); //
  } catch (err) {
    return next(err);
  }
});

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

/* логгер ошибок */
app.use(errorLogger);

/* обработчик ошибок celebrate */
app.use(errors());

/* централизованный обработчик ошибок */
app.use(errorHandler);

app.listen(PORT);