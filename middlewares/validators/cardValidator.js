const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

module.exports.cardValidator = celebrate({
    body: {
        name: Joi.string().required().min(2).max(30).messages({
            'string.min': 'Минимум 2 символа',
            'string.max': 'Максимум 30 символов',
            'any.required': 'Поле обязательно для заполнения',
        }),
        link: Joi.string().required().custom((value, helper) => {
            if (validator.isURL(value)) {
                return value;
            }
            return helper.message('Невалидный URL');
        }).messages({
            'any.required': 'Поле обязательно для заполнения',
        }),
    }
});

