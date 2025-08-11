const express = require("express");
const routes = require("./src/routes");
const dotenv = require("dotenv")
dotenv.config()
// const ErrorHandler = require("./src/middleware/error-handler");
const DatabaseConnection = require("./src/db/db");
const ErrorHandler = require("./src/middleware/errorHander");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", routes);

app.use(ErrorHandler)
const startServer = async()=>{
    try {
        await DatabaseConnection()
        app.listen(process.env.PORT,()=>{

    console.log(`Server is Started and port is ${process.env.PORT}`)
})
    } catch (error) {
         console.error(" Database connection failed:", error.message);
    process.exit(1);
    }
}
startServer()
module.exports = app;