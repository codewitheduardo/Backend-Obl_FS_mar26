import Joi from "joi";

export const generarTextoIASchema = Joi.object({
  prompt: Joi.string().trim().min(3).max(1000).required(),
});