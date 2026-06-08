import axios from "axios";
import { crearError } from "../utils/error.utils.js";

const OPENROUTER_URL =
  process.env.OPENROUTER_URL || "https://openrouter.ai/api/v1/chat/completions";

const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "openrouter/free";

export const generarTextoIAService = async (prompt) => {
  if (!process.env.OPENROUTER_API_KEY) {
    throw crearError("OPENROUTER_API_KEY no está configurada", 500);
  }

  try {
    const response = await axios.post(
      OPENROUTER_URL,
      {
        model: OPENROUTER_MODEL,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `Sos un asistente de cocina. Respondé SIEMPRE con un JSON válido y nada más, sin texto extra, sin bloques markdown.
El JSON debe tener exactamente esta estructura:
{
  "titulo": "string",
  "descripcion": "string",
  "tiempoPreparacion": number,
  "porciones": number,
  "dificultad": "facil" | "media" | "dificil",
  "ingredientes": ["string"],
  "pasos": ["string"]
}`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 25000,
      }
    );

    const texto = response.data?.choices?.[0]?.message?.content?.trim();

    if (!texto) {
      throw crearError("La IA no devolvió texto", 502);
    }

    return {
      texto,
      modelo: OPENROUTER_MODEL,
      proveedor: "openrouter",
    };
  } catch (error) {
    const detalle =
      error.response?.data?.error?.message ||
      error.response?.data ||
      error.message ||
      "Error al consumir OpenRouter";

    throw crearError(
      typeof detalle === "string" ? detalle : "Error al consumir OpenRouter",
      error.response?.status || 500
    );
  }
};
