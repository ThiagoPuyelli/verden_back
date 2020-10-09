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

// Cors

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Routes

app.use("/courses/", require("./routes/coursesRoutes"));
app.use("/users/", require("./routes/usersRoutes"));

// Starting to server

app.listen(app.get("port"), () => {
    console.log("Server connect in port " + app.get("port"));
})