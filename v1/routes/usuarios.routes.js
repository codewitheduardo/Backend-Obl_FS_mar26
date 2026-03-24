import express from "express";

const router = express.Router({ mergeParams: true });

router.patch("/plan", (req, res) => {
  res.status(200).json({ message: "Ruta cambio de plan lista" });
});

export default router;