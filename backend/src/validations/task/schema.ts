import Joi from "joi";
import { PRIORITY_TASK } from "../../constants/priority";

export const create = Joi.object({
  title: Joi.string().required(),
  priority: Joi.string().valid(...PRIORITY_TASK)
});

export const update = Joi.object({
  title: Joi.string(),
  priority: Joi.string().valid(...PRIORITY_TASK),
  isCompleted: Joi.boolean()
});
