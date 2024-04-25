const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("Connected to dataBase");
  })
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(
    `App is running on port: ${port} in ${process.env.NODE_ENV} environment`
  );
});
