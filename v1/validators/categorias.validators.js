import Joi from "joi";

export const categoriaSchema = Joi.object({
  nombre: Joi.string().trim().min(3).max(40).required().messages({
    "string.base": "El nombre debe ser un texto",
    "string.empty": "El nombre es obligatorio",
    "string.min": "El nombre debe tener al menos 3 caracteres",
    "string.max": "El nombre no puede superar los 40 caracteres",
    "any.required": "El nombre es obligatorio"
  }),

  descripcion: Joi.string().trim().max(200).allow("").optional().messages({
    "string.base": "La descripción debe ser un texto",
    "string.max": "La descripción no puede superar los 200 caracteres"
  })
});

export const updateCategoriaSchema = Joi.object({
  nombre: Joi.string().trim().min(3).max(40).messages({
    "string.base": "El nombre debe ser un texto",
    "string.empty": "El nombre no puede estar vacío",
    "string.min": "El nombre debe tener al menos 3 caracteres",
    "string.max": "El nombre no puede superar los 40 caracteres"
  }),

  descripcion: Joi.string().trim().max(200).allow("").messages({
    "string.base": "La descripción debe ser un texto",
    "string.max": "La descripción no puede superar los 200 caracteres"
  })
}).min(1).messages({
  "object.min": "Debés enviar al menos un campo para actualizar"
});