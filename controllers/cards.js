const Card = require('../models/card');
const { NotFoundError, BadRequestError, InternalError, ForbiddenError } = require('../errors/index');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
        const error = new InternalError('Произошла ошибка');
        next(error);
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const id = req.user._id;

  Card.create({ name, link, owner: id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      const error = new BadRequestError(err.message);
      next(error);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId).then((card) => {
      if (!card) {
          throw new NotFoundError(`Карточка с id: ${req.params.cardId} не найдена`);
      }
      if (card.owner.toString() !== req.user._id) {
          throw new ForbiddenError('Можно удалять только свои карточки');
      }
      Card.deleteOne(card).then((card) => {
          res.send({ message: `Карточка с id: ${card._id} успешно удалена` });
      })
  }).catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
        if (!card) {
            throw new NotFoundError(`Карточка с id: ${req.params.cardId} не найдена`);
        }
        res.send({data: card});
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
        if (!card) {
            throw new NotFoundError(`Карточка с id: ${req.params.cardId} не найдена`);
        }
        res.send({data: card});
    })
    .catch(next);
};
