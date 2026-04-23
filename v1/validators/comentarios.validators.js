import Joi from "joi";

export const comentarioSchema = Joi.object({
  texto: Joi.string().trim().min(3).max(500).required().messages({
    "string.base": "El texto debe ser un string",
    "string.empty": "El texto es obligatorio",
    "string.min": "El texto debe tener al menos 3 caracteres",
    "string.max": "El texto no puede superar los 500 caracteres",
    "any.required": "El texto es obligatorio",
  }),
  valoracion: Joi.number().integer().min(1).max(5).required().messages({
    "number.base": "La valoración debe ser un número",
    "number.integer": "La valoración debe ser un número entero",
    "number.min": "La valoración mínima es 1",
    "number.max": "La valoración máxima es 5",
    "any.required": "La valoración es obligatoria",
  }),
});

export const updateComentarioSchema = Joi.object({
  texto: Joi.string().trim().min(3).max(500).messages({
    "string.base": "El texto debe ser un string",
    "string.empty": "El texto no puede estar vacío",
    "string.min": "El texto debe tener al menos 3 caracteres",
    "string.max": "El texto no puede superar los 500 caracteres",
  }),
  valoracion: Joi.number().integer().min(1).max(5).messages({
    "number.base": "La valoración debe ser un número",
    "number.integer": "La valoración debe ser un número entero",
    "number.min": "La valoración mínima es 1",
    "number.max": "La valoración máxima es 5",
  }),
}).min(1).messages({
  "object.min": "Debes enviar al menos un campo para actualizar",
});