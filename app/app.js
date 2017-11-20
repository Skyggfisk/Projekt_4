"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const mongoose = require("mongoose");
const index_1 = require("./routes/index");
const user_1 = require("./routes/user");
const categories_1 = require("./routes/categories");
const task_1 = require("./routes/task");
const app = express();
app.use(helmet());
mongoose.connect("mongodb://admin:admin@ds121565.mlab.com:21565/projekt4");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", index_1.default);
app.use("/user", user_1.default);
app.use("/task", task_1.default);
app.use("/categories", categories_1.default);
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err["status"] = 404;
    next(err);
});
if (process.env.NODE_ENV === "development") {
    app.use((err, req, res, next) => {
        res.status(err["status"] || 500);
        res.render("error", {
            title: "error",
            message: err.message,
            error: err
        });
    });
}
app.use((err, req, res, next) => {
    res.status(err["status"] || 500);
    res.render("error", {
        title: "error",
        message: err.message,
        error: {}
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map