const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

module.exports.authValidator = celebrate({
   body: {
       email: Joi.string().required().custom((value, helper) => {
           if (validator.isEmail(value)) {
               return value;
           }
           return helper.message('Невалидный email');
       }).messages({
           'any.required': 'Поле обязательно для заполнения',
       }),
       password: Joi.string().min(8).max(30).required().messages({
           'string.min': 'Минимум 8 символов',
           'string.max': 'Максимум 30 символов',
           'string.required': 'Поле обязательно для заполнения'
       }),
   }
});
