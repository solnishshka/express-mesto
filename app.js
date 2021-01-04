const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3000 } = process.env;
const path = require('path');
const bodyParser = require('body-parser');

const cardsRoute = require('./routes/cards');
const usersRoute = require('./routes/users');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '5ff322f98b42f325490281b9' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/users', usersRoute);

app.use('/cards', cardsRoute);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
