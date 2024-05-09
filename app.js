const Express = require("express");
const morgan = require("morgan");
const app = Express();
const toursRouter = require("./routes/toursRoute");
const usersRouter = require("./routes/usersRoute");
const AppError = require("./utils/appErrors");
const globalErrorHandler = require("./controller/errorController");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(Express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(res.header());
  next();
});

app.use("/api/v1/tours", toursRouter);
app.use("/api/v1/users", usersRouter);
app.use(Express.static(`${__dirname}/public`));

app.all("*", (req, res, next) => {
  return next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);
module.exports = app;
