import { generarTextoIAService } from "../services/ia.service.js";

export const generarTextoIA = async (req, res, next) => {
  try {
    const { prompt } = req.validatedBody;

    try {
      const data = await generarTextoIAService(prompt);

      return res.status(200).json({
        message: "Texto generado correctamente",
        data,
      });
    } catch (errorIA) {
      return res.status(200).json({
        message: "La IA no estuvo disponible, se devolvió fallback",
        data: {
          texto: "No se pudo generar contenido con IA en este momento.",
          modelo: null,
          proveedor: "fallback-local",
        },
      });
    }
  } catch (error) {
    next(error);
  }
};