import Joi = require('joi');

export default function validateLogin(data: object) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error, value } = schema.validate(data);
  if (error) throw error;

  return value;
}
