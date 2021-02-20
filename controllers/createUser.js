const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { BadRequestError, ConflictError } = require('../errors/index');

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email: req.body.email,
        password: hash,
      })
        .then((user) => {
          res.send({ user });
        })
          .catch((err) => {
              if (err.name === 'ValidationError') {
                  next(new BadRequestError(err.message));
              } else {
                  next(new ConflictError(('Пользователь с таким email уже существует')));
              }
          });
    })
      .catch((err) => {
          const error = new BadRequestError(err.message);
          next(error);
      })
};
