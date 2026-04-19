import cloudinary from "../config/cloudinary.config.js";
import { crearError } from "../utils/error.utils.js";
import { uploadBufferToCloudinary } from "../utils/uploadToCloudinary.util.js";

export const subirImagenService = async (file, folder = "uploads") => {
  if (!file) {
    const error = crearError("No se subió ningún archivo", 400);
    throw error;
  }

  const result = await uploadBufferToCloudinary(cloudinary, file.buffer, {
    resource_type: "auto",
    folder,
  });

  return {
    url: result.secure_url,
    folder: result.folder,
    publicId: result.public_id,
  };
};
