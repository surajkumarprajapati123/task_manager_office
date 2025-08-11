const express = require("express");
const routes = require("./src/routes");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();
const DatabaseConnection = require("./src/db/db");
const ErrorHandler = require("./src/middleware/errorHander");
const app = express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use("/api", routes);

app.use(ErrorHandler);
const startServer = async () => {
  try {
    await DatabaseConnection();
    app.listen(process.env.PORT, () => {
      console.log(`Server is Started and port is ${process.env.PORT}`);
    });
  } catch (error) {
    console.error(" Database connection failed:", error.message);
    process.exit(1);
  }
};
startServer();
module.exports = app;
