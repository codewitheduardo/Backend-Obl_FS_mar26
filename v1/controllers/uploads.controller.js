import fs from "fs";
import { subirImagenACloudinary } from "../services/cloudinary.service.js";

export const subirImagenReceta = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      message: "Debes enviar una imagen",
    });
  }

  const result = await subirImagenACloudinary(req.file.path);

  fs.unlinkSync(req.file.path);

  return res.status(200).json({
    message: "Imagen subida correctamente",
    data: {
      imageUrl: result.secure_url,
      publicId: result.public_id,
    },
  });
};
