import { subirImagenService } from "../services/uploads.service.js";

export const subirImagen = async (req, res, next) => {
    const folder = req.body?.folder || "uploads";
    const data = await subirImagenService(req.file, folder);

    return res.status(200).json({
      message: "Imagen subida correctamente",
      data,
    });
};