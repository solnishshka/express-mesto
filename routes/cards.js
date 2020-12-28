const router = require('express').Router();
const path = require('path');
const readJson = require('../utils/readJsonFromFile');

router.get('/', (req, res) => {
  readJson(path.join(__dirname, '..', 'data', 'cards.json'))
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
