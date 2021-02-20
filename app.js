const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const { PORT = 3000 } = process.env;

const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const auth = require('./middlewares/auth');
const { authValidator } = require('./middlewares/validators/authValidator');
const errorHandler = require('./middlewares/errorHandler');
const { logger, errorLogger } = require('./middlewares/logger');

const { login } = require('./controllers/login');
const { createUser } = require('./controllers/createUser');

const cardsRoute = require('./routes/cards');
const usersRoute = require('./routes/users');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

app.use(logger);

app.post('/signin', authValidator, login);

app.post('/signup', authValidator, createUser);

app.use(auth);

app.use('/', express.static('./public'));

app.use('/users', usersRoute);

app.use('/cards', cardsRoute);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
