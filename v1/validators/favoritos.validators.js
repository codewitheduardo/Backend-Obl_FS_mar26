import Joi from "joi";

export const mealDbIdParamSchema = Joi.object({
  mealDbId: Joi.string().trim().required().messages({
    "string.base": "El id de TheMealDB debe ser texto",
    "string.empty": "El id de TheMealDB es obligatorio",
    "any.required": "El id de TheMealDB es obligatorio",
  }),
});

export const favoritoSchema = Joi.object({
  nombre: Joi.string().trim().min(2).max(100).required().messages({
    "string.base": "El nombre debe ser texto",
    "string.empty": "El nombre es obligatorio",
    "string.min": "El nombre debe tener al menos 2 caracteres",
    "string.max": "El nombre no puede superar los 100 caracteres",
    "any.required": "El nombre es obligatorio",
  }),
  imagenUrl: Joi.string().trim().allow("").optional(),
  categoria: Joi.string().trim().allow("").optional(),
  area: Joi.string().trim().allow("").optional(),
});