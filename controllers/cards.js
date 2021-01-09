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
    .catch((err) => {
      if (err && err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
        return;
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      res.send({ message: `Карточка с id: ${card._id} успешно удалена` });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(404)
          .send({ message: `Карточка с id: ${req.params.cardId} не найдена` });
        return;
      }
      res.status(500).send({ message: err });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(404)
          .send({ message: `Карточка с id: ${req.params.cardId} не найдена` });
        return;
      }
      res.status(500).send({ message: err });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(404)
          .send({ message: `Карточка с id: ${req.params.cardId} не найдена` });
        return;
      }
      res.status(500).send({ message: err });
    });
};
