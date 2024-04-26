const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const port = process.env.PORT || 3000;

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  process.exit(1);
});
mongoose.connect(process.env.DB).then(() => {
  console.log("Connected to dataBase");
});
// .catch((err) => console.log(err));

const server = app.listen(port, () => {
  console.log(
    `App is running on port: ${port} in ${process.env.NODE_ENV} environment`
  );
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
