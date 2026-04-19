import Joi from "joi";

export const updatePlanSchema = Joi.object({
  plan: Joi.string().valid("plus", "premium").required().messages({
    "string.base": "El plan debe ser un texto",
    "any.only": "El plan debe ser plus o premium",
    "any.required": "El plan es obligatorio",
  }),
});