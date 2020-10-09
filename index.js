const express = require("express");
const morgan = require("morgan");
const app = express();

// Config
app.set("port", process.env.PORT || 3000);
require("dotenv").config();

require("./database");

// Middlewares

app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Routes

app.use("/courses/", require("./routes/coursesRoutes"));
app.use("/users/", require("./routes/usersRoutes"));

// Starting to server

app.listen(app.get("port"), () => {
    console.log("Server connect in port " + app.get("port"));
})