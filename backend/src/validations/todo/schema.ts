import Joi from "joi";
import { PRIORITY_TASK } from "../../constants/priority";

export const create = Joi.object({
  title: Joi.string().required(),
  color: Joi.string().pattern(/^#[A-Fa-f0-9]{6}/),
  isPinned: Joi.boolean(),
  tasks: Joi.array().items({
    title: Joi.string().required(),
    priority: Joi.string().valid(...PRIORITY_TASK)
  }).required()
});

export const update = Joi.object({
  title: Joi.string(),
  color: Joi.string().pattern(/^#[A-Fa-f0-9]{6}/),
  isPinned: Joi.boolean()
});
