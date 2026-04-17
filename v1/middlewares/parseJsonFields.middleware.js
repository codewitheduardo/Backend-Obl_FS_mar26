export const parseJsonFields = (fields) => {
  return (req, res, next) => {
    try {
      for (const field of fields) {
        if (typeof req.body[field] === "string") {
          req.body[field] = JSON.parse(req.body[field]);
        }
      }

      next();
    } catch (error) {
      return res.status(400).json({
        message: "Uno de los campos JSON tiene un formato inválido",
      });
    }
  };
};