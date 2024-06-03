import Joi from 'joi';

export const schema = Joi.object({
  firstname: Joi.string().min(2).required().messages({
    'string.empty': 'isminizni kiritshingiz shart',
    'string.min': 'ismingiz 2ta harif bolishi lozm',
  }),
  lastname: Joi.string().min(2).required().messages({
    'string.empty': 'familya kiriting',
    'string.min': '2dtadan kam bolmasligi lozim',
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.email': 'emailni kiriting',
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'parol kamida 8ta simvol bolishi kerak',
  }),
  phone: Joi.string().pattern(/^[0-9]+$/).required().messages({
    'string.pattern.base': 'sonlarda kiriting',
  }),
  address: Joi.string().required().messages({
    'string.empty': 'Address kiriting',
  }),
  age: Joi.number().integer().min(18).max(99).required().messages({
    'number.min': 'kamida 18 yoshdan balan bolishingiz shjart',
    'number.max': '100dan oshiqlarga bubkn emas',
  }),
});
