import fs from "fs/promises";

export const eliminarArchivoTemporal = async (filePath) => {
  if (!filePath) return;

  try {
    await fs.unlink(filePath);
  } catch {}
};