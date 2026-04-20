import Joi from "joi";

const dificultadValores = ["facil", "media", "dificil"];
const estadoValores = ["borrador", "publicada"];

export const recetaSchema = Joi.object({
  titulo: Joi.string().trim().min(3).max(100).required().messages({
    "string.base": "El título debe ser un texto",
    "string.empty": "El título es obligatorio",
    "string.min": "El título debe tener al menos 3 caracteres",
    "string.max": "El título no puede superar los 100 caracteres",
    "any.required": "El título es obligatorio",
  }),

  descripcion: Joi.string().trim().min(10).max(500).required().messages({
    "string.base": "La descripción debe ser un texto",
    "string.empty": "La descripción es obligatoria",
    "string.min": "La descripción debe tener al menos 10 caracteres",
    "string.max": "La descripción no puede superar los 500 caracteres",
    "any.required": "La descripción es obligatoria",
  }),

  ingredientes: Joi.array()
    .items(
      Joi.string().trim().min(2).max(100).messages({
        "string.base": "Cada ingrediente debe ser un texto",
        "string.empty": "Los ingredientes no pueden estar vacíos",
        "string.min": "Cada ingrediente debe tener al menos 2 caracteres",
        "string.max": "Cada ingrediente no puede superar los 100 caracteres",
      }),
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Los ingredientes deben ser una lista",
      "array.min": "Debes ingresar al menos un ingrediente",
      "any.required": "Los ingredientes son obligatorios",
    }),

  pasos: Joi.array()
    .items(
      Joi.string().trim().min(5).max(500).messages({
        "string.base": "Cada paso debe ser un texto",
        "string.empty": "Los pasos no pueden estar vacíos",
        "string.min": "Cada paso debe tener al menos 5 caracteres",
        "string.max": "Cada paso no puede superar los 500 caracteres",
      }),
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Los pasos deben ser una lista",
      "array.min": "Debes ingresar al menos un paso",
      "any.required": "Los pasos son obligatorios",
    }),

  tiempoPreparacion: Joi.number()
    .integer()
    .min(1)
    .max(1440)
    .required()
    .messages({
      "number.base": "El tiempo de preparación debe ser un número",
      "number.integer": "El tiempo de preparación debe ser un número entero",
      "number.min": "El tiempo de preparación debe ser al menos 1 minuto",
      "number.max":
        "El tiempo de preparación no puede superar los 1440 minutos",
      "any.required": "El tiempo de preparación es obligatorio",
    }),

  porciones: Joi.number().integer().min(1).max(50).required().messages({
    "number.base": "Las porciones deben ser un número",
    "number.integer": "Las porciones deben ser un número entero",
    "number.min": "Debe haber al menos 1 porción",
    "number.max": "Las porciones no pueden superar 50",
    "any.required": "Las porciones son obligatorias",
  }),

  dificultad: Joi.string()
    .trim()
    .valid(...dificultadValores)
    .required()
    .messages({
      "string.base": "La dificultad debe ser un texto",
      "any.only": "La dificultad debe ser facil, media o dificil",
      "any.required": "La dificultad es obligatoria",
    }),

  estado: Joi.string()
    .valid(...estadoValores)
    .default("publicada")
    .messages({
      "string.base": "El estado debe ser un texto",
      "any.only": "El estado debe ser borrador o publicada",
    }),

  categoriaId: Joi.string().hex().length(24).required().messages({
    "string.base": "La categoría debe ser un texto",
    "string.hex": "La categoría debe tener un formato válido",
    "string.length": "La categoría debe tener un formato válido",
    "any.required": "La categoría es obligatoria",
  }),
});

export const updateRecetaSchema = Joi.object({
  titulo: Joi.string().trim().min(3).max(100).messages({
    "string.base": "El título debe ser un texto",
    "string.empty": "El título no puede estar vacío",
    "string.min": "El título debe tener al menos 3 caracteres",
    "string.max": "El título no puede superar los 100 caracteres",
  }),

  descripcion: Joi.string().trim().min(10).max(500).messages({
    "string.base": "La descripción debe ser un texto",
    "string.empty": "La descripción no puede estar vacía",
    "string.min": "La descripción debe tener al menos 10 caracteres",
    "string.max": "La descripción no puede superar los 500 caracteres",
  }),

  ingredientes: Joi.array()
    .items(
      Joi.string().trim().min(2).max(100).messages({
        "string.base": "Cada ingrediente debe ser un texto",
        "string.empty": "Los ingredientes no pueden estar vacíos",
        "string.min": "Cada ingrediente debe tener al menos 2 caracteres",
        "string.max": "Cada ingrediente no puede superar los 100 caracteres",
      }),
    )
    .min(1)
    .messages({
      "array.base": "Los ingredientes deben ser una lista",
      "array.min": "Debes ingresar al menos un ingrediente",
    }),

  pasos: Joi.array()
    .items(
      Joi.string().trim().min(5).max(500).messages({
        "string.base": "Cada paso debe ser un texto",
        "string.empty": "Los pasos no pueden estar vacíos",
        "string.min": "Cada paso debe tener al menos 5 caracteres",
        "string.max": "Cada paso no puede superar los 500 caracteres",
      }),
    )
    .min(1)
    .messages({
      "array.base": "Los pasos deben ser una lista",
      "array.min": "Debes ingresar al menos un paso",
    }),

  tiempoPreparacion: Joi.number().integer().min(1).max(1440).messages({
    "number.base": "El tiempo de preparación debe ser un número",
    "number.integer": "El tiempo de preparación debe ser un número entero",
    "number.min": "El tiempo de preparación debe ser al menos 1 minuto",
    "number.max": "El tiempo de preparación no puede superar los 1440 minutos",
  }),

  porciones: Joi.number().integer().min(1).max(50).messages({
    "number.base": "Las porciones deben ser un número",
    "number.integer": "Las porciones deben ser un número entero",
    "number.min": "Debe haber al menos 1 porción",
    "number.max": "Las porciones no pueden superar 50",
  }),

  dificultad: Joi.string()
    .trim()
    .valid(...dificultadValores)
    .messages({
      "string.base": "La dificultad debe ser un texto",
      "any.only": "La dificultad debe ser facil, media o dificil",
    }),

  estado: Joi.string()
    .valid(...estadoValores)
    .messages({
      "string.base": "El estado debe ser un texto",
      "any.only": "El estado debe ser borrador o publicada",
    }),

  categoriaId: Joi.string().hex().length(24).messages({
    "string.base": "La categoría debe ser un texto",
    "string.hex": "La categoría debe tener un formato válido",
    "string.length": "La categoría debe tener un formato válido",
  }),
})
  .min(1)
  .messages({
    "object.min": "Debes enviar al menos un campo para actualizar",
  });