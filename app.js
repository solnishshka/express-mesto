const express = require('express');
const { PORT = 3000 } = process.env;
const path = require('path');

const cardsRoute = require('./routes/cards');
const usersRoute = require('./routes/users');

const app = express();

app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/users', usersRoute);

app.use('/cards', cardsRoute);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
