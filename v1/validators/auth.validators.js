import Joi from "joi";

export const registerSchema = Joi.object({
  nombre: Joi.string().trim().min(2).max(50).required().messages({
    "string.base": "El nombre debe ser un texto",
    "string.empty": "El nombre es obligatorio",
    "string.min": "El nombre debe tener al menos 2 caracteres",
    "string.max": "El nombre no puede superar los 50 caracteres",
    "any.required": "El nombre es obligatorio",
  }),

  username: Joi.string().trim().alphanum().min(3).max(20).required().messages({
    "string.base": "El username debe ser un texto",
    "string.empty": "El username es obligatorio",
    "string.alphanum": "El username solo puede contener letras y números",
    "string.min": "El username debe tener al menos 3 caracteres",
    "string.max": "El username no puede superar los 20 caracteres",
    "any.required": "El username es obligatorio",
  }),

  email: Joi.string().trim().email().required().messages({
    "string.base": "El email debe ser un texto",
    "string.empty": "El email es obligatorio",
    "string.email": "El email no tiene un formato válido",
    "any.required": "El email es obligatorio",
  }),

  password: Joi.string().min(6).max(30).required().messages({
    "string.base": "La contraseña debe ser un texto",
    "string.empty": "La contraseña es obligatoria",
    "string.min": "La contraseña debe tener al menos 6 caracteres",
    "string.max": "La contraseña no puede superar los 30 caracteres",
    "any.required": "La contraseña es obligatoria",
  }),

  rol: Joi.string().valid("chef", "lector").required().messages({
    "any.only": "El rol debe ser chef o lector",
    "any.required": "El rol es obligatorio",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    "string.empty": "El email es obligatorio",
    "string.email": "El email no tiene un formato válido",
    "any.required": "El email es obligatorio",
  }),

  password: Joi.string().required().messages({
    "string.empty": "La contraseña es obligatoria",
    "any.required": "La contraseña es obligatoria",
  }),
});
