const { NotFoundError } = require('./NotFoundError');
const { BadRequestError } = require('./BadRequestError');
const { Unauthorized } = require('./Unauthorized');
const { InternalError } = require('./InternalError');
const { ConflictError } = require('./ConflictError');
const { ForbiddenError } = require('./ForbiddenError');

module.exports = {
  NotFoundError,
  BadRequestError,
  Unauthorized,
  InternalError,
  ConflictError,
  ForbiddenError,
};
