const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const id = req.user._id;

  Card.create({ name, link, owner: id })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err }));
};

module,
  (exports.deleteCard = (req, res) => {
    Card.findByIdAndRemove(req.params.cardId)
      .then((card) => res.send({ data: card }))
      .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
  });

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  ).then((card) => res.send({ data: card }));

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  ).then((card) => res.send({ data: card }));
