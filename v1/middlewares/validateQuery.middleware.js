export const validateQueryMiddleware = schema => (req, res, next) => {
  const { error, value } = schema.validate(req.query, {
    abortEarly: false,
    convert: true,
  });

  if (error) {
    return res.status(400).json({
      error: error.details,
    });
  }

  req.validatedQuery = value;
  next();
};