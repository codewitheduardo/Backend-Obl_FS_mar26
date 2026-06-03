import axios from "axios";
import { crearError } from "../utils/error.utils.js";

const OPENROUTER_URL =
  process.env.OPENROUTER_URL || "https://openrouter.ai/api/v1/chat/completions";

const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "openrouter/free";

const SYSTEM_PROMPT = `Sos un asistente de cocina para la app Cook Book.
Respondé SIEMPRE con un objeto JSON válido y nada más. Sin texto antes ni después. Sin bloques de código markdown. Sin explicaciones.
El JSON debe tener exactamente estos campos:
{
  "titulo": "string — nombre corto del plato",
  "descripcion": "string — 1 oración describiendo el plato",
  "tiempoPreparacion": número entero en minutos,
  "porciones": número entero,
  "dificultad": "facil" o "media" o "dificil",
  "ingredientes": ["cantidad + ingrediente", ...],
  "pasos": ["instrucción completa del paso", ...]
}
Reglas: mínimo 4 ingredientes con cantidad, mínimo 4 pasos, idioma español rioplatense, dificultad exactamente sin tildes.`;

export const generarTextoIAService = async (prompt) => {
  if (!process.env.OPENROUTER_API_KEY) {
    throw crearError("OPENROUTER_API_KEY no está configurada", 500);
  }

  try {
    const response = await axios.post(
      OPENROUTER_URL,
      {
        model: OPENROUTER_MODEL,
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 800,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 20000,
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
