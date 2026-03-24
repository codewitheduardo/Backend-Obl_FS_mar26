import express from "express";

const router = express.Router({ mergeParams: true });

router.post("/register", (req, res) => {
  res.status(201).json({ message: "Ruta register lista" });
});

router.post("/login", (req, res) => {
  res.status(200).json({ message: "Ruta login lista" });
});

export default router;