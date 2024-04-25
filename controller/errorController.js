module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "EEEError";

  // if (!(err instanceof AppError)) {
  //   // If the error is not an instance of AppError, create a new one
  //   err = new AppError(err.message, err.statusCode);
  // }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
