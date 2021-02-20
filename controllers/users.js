const User = require('../models/user');
const { NotFoundError, BadRequestError } = require('../errors/index');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
          throw new NotFoundError(`Пользователь с id: ${req.user._id} не найден`);
      }
      res.send({ message: user });
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
          throw new NotFoundError(`Пользователь c id: ${req.params.id} не найден`);
      }
      res.send({ message: user });
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => {
        if (!user) {
            throw new NotFoundError('Пользователь не найден');
        }
        res.send({data: user});
    })
    .catch((err) => {
        if (err.name === "ValidationError") {
            next(new BadRequestError((err.message)));
        }
        next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  console.log(req.body)
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => {
        if (!user) {
            throw new NotFoundError('Пользователь не найден');
        }
        res.send({ data: user });
    })
    .catch((err) => {
        if (err.name === 'ValidationError') {
            next(new BadRequestError(err.message));
        }
        next(err);
    });
};
