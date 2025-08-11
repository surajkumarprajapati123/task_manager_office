const mongoose = require("mongoose");
console.log("process.env.MONGO_URL",process.env.MONGO_URL)
const DatabaseConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then((e) => {
      console.log(
        `Database Connected Successfully and host is ${e.connection.host}`
      );
    })

    .catch((err) => {
      console.log(err);
    });
};
module.exports = DatabaseConnection;