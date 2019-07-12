const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const router = require("./routes/router.js");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded());
app.use(helmet());
app.use("/", router);

// catch 404 and forward to error handler
app.use((request, response, next) => {
    let error = new Error("Not Found");
    error.status = 404;
    next(error);
});

// error handler
app.use(function(error, request, response, next) {
    // set locals, only providing error in development
    response.locals.message = error.message;
    response.locals.error = request.app.get("env") === "development" ? error : {};

    // render the error page
    response.status(error.status || 500);
    response.render("error");
});

module.exports = app;