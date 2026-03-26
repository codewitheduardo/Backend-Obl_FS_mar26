export const validateParamsMiddleware = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.params, { abortEarly: false });

  if (error)
    return res.status(400).json({
      error: error.details,
    });

  req.validatedParams = value;
  next();
};
