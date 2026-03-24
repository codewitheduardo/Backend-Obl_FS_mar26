import express from "express";

const router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
  res.status(200).json({ message: "Listar categorías" });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "Crear categoría" });
});

router.get("/:id", (req, res) => {
  res.status(200).json({ message: "Obtener categoría por id" });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: "Editar categoría" });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({ message: "Eliminar categoría" });
});

export default router;