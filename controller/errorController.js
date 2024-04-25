const AppError = require("../utils/appErrors");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  err.status = err.status || "Error";

  if (process.env.NODE_ENV === "development") {
    devErrors(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = JSON.parse(JSON.stringify(err));

    if (error.name === "CastError") {
      error = handleDBCastError(error);
    }
    prodError(error, res);
  }
};

const devErrors = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stack,
  });
};

const prodError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

const handleDBCastError = (error) => {
  const message = `Invalid ${error.path}: ${error.value}.`;
  return new AppError(message, 404);
};
