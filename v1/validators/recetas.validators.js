import Joi from "joi";

const dificultadValores = ["facil", "media", "dificil"];

export const createRecipeSchema = Joi.object({
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
      Joi.string().trim().min(2).max(100).required().messages({
        "string.empty": "Cada ingrediente debe tener contenido",
      }),
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Los ingredientes deben enviarse en un arreglo",
      "array.min": "Debés ingresar al menos un ingrediente",
      "any.required": "Los ingredientes son obligatorios",
    }),

  pasos: Joi.array()
    .items(
      Joi.string().trim().min(5).max(500).required().messages({
        "string.empty": "Cada paso debe tener contenido",
      }),
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Los pasos deben enviarse en un arreglo",
      "array.min": "Debés ingresar al menos un paso",
      "any.required": "Los pasos son obligatorios",
    }),

  tiempoPreparacion: Joi.number()
    .integer()
    .min(1)
    .max(1440)
    .required()
    .messages({
      "number.base": "El tiempo de preparación debe ser numérico",
      "number.integer": "El tiempo de preparación debe ser un número entero",
      "number.min": "El tiempo de preparación debe ser mayor a 0",
      "number.max": "El tiempo de preparación no puede superar 1440 minutos",
      "any.required": "El tiempo de preparación es obligatorio",
    }),

  porciones: Joi.number().integer().min(1).max(50).required().messages({
    "number.base": "Las porciones deben ser numéricas",
    "number.integer": "Las porciones deben ser un número entero",
    "number.min": "Las porciones deben ser mayor a 0",
    "number.max": "Las porciones no pueden superar 50",
    "any.required": "Las porciones son obligatorias",
  }),

  dificultad: Joi.string()
    .valid(...dificultadValores)
    .required()
    .messages({
      "any.only": "La dificultad debe ser facil, media o dificil",
      "any.required": "La dificultad es obligatoria",
    }),

  categoriaId: Joi.string().hex().length(24).required().messages({
    "string.hex": "La categoría no es válida",
    "string.length": "La categoría no es válida",
    "any.required": "La categoría es obligatoria",
  }),

  imagenUrl: Joi.string().uri().optional().allow("").messages({
    "string.uri": "La imagen debe ser una URL válida",
  }),
});

export const updateRecipeSchema = Joi.object({
  titulo: Joi.string().trim().min(3).max(100).optional().messages({
    "string.empty": "El título no puede estar vacío",
    "string.min": "El título debe tener al menos 3 caracteres",
    "string.max": "El título no puede superar los 100 caracteres",
  }),

  descripcion: Joi.string().trim().min(10).max(500).optional().messages({
    "string.empty": "La descripción no puede estar vacía",
    "string.min": "La descripción debe tener al menos 10 caracteres",
    "string.max": "La descripción no puede superar los 500 caracteres",
  }),

  ingredientes: Joi.array()
    .items(Joi.string().trim().min(2).max(100))
    .min(1)
    .optional()
    .messages({
      "array.base": "Los ingredientes deben enviarse en un arreglo",
      "array.min": "Debés ingresar al menos un ingrediente",
    }),

  pasos: Joi.array()
    .items(Joi.string().trim().min(5).max(500))
    .min(1)
    .optional()
    .messages({
      "array.base": "Los pasos deben enviarse en un arreglo",
      "array.min": "Debés ingresar al menos un paso",
    }),

  tiempoPreparacion: Joi.number()
    .integer()
    .min(1)
    .max(1440)
    .optional()
    .messages({
      "number.base": "El tiempo de preparación debe ser numérico",
      "number.integer": "El tiempo de preparación debe ser un número entero",
      "number.min": "El tiempo de preparación debe ser mayor a 0",
      "number.max": "El tiempo de preparación no puede superar 1440 minutos",
    }),

  porciones: Joi.number().integer().min(1).max(50).optional().messages({
    "number.base": "Las porciones deben ser numéricas",
    "number.integer": "Las porciones deben ser un número entero",
    "number.min": "Las porciones deben ser mayor a 0",
    "number.max": "Las porciones no pueden superar 50",
  }),

  dificultad: Joi.string()
    .valid(...dificultadValores)
    .optional()
    .messages({
      "any.only": "La dificultad debe ser facil, media o dificil",
    }),

  categoriaId: Joi.string().hex().length(24).optional().messages({
    "string.hex": "La categoría no es válida",
    "string.length": "La categoría no es válida",
  }),

  imagenUrl: Joi.string().uri().optional().allow("").messages({
    "string.uri": "La imagen debe ser una URL válida",
  }),
})
  .min(1)
  .messages({
    "object.min": "Debés enviar al menos un campo para actualizar",
  });

export const recipeIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.hex": "El id de la receta no es válido",
    "string.length": "El id de la receta no es válido",
    "any.required": "El id es obligatorio",
  }),
});

export const recipeQuerySchema = Joi.object({
  titulo: Joi.string().trim().max(100).optional(),
  dificultad: Joi.string()
    .valid(...dificultadValores)
    .optional(),
  categoriaId: Joi.string().hex().length(24).optional(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(10),
});
