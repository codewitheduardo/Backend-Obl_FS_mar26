export const crearError = (message, statusCode) => {
  const error = new Error(message);
  error.status = statusCode;
  return error;
};