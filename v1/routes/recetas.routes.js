import express from "express";

const router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
  res.status(200).json({ message: "Listar recetas" });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "Crear receta" });
});

router.get("/:id", (req, res) => {
  res.status(200).json({ message: "Obtener receta por id" });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: "Editar receta" });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({ message: "Eliminar receta" });
});

export default router;