const router = require('express').Router();
const path = require('path');

const readJson = require('../utils/readJsonFromFile');

const filePath = path.join(__dirname, '..', 'data', 'users.json');

router.get('/', (req, res) => {
  readJson(filePath)
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  readJson(filePath)
    .then((users) => {
      if (!users.find((user) => user._id === id)) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      } else {
        res.send(users.find((user) => user._id === id));
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
