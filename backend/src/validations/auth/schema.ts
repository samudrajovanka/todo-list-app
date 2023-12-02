import Joi from "joi";

export const login = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const register = Joi.object({
  username: Joi.string().min(4).pattern(/^\w+$/).max(255).required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string()
    .equal(Joi.ref("password"))
    .required()
    .label("confirmPassword")
    .options({ messages: { "any.only": "{{#label}} does not match" } })
});
