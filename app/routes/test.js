"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment");
const cat_1 = require("../models/cat");
const user_1 = require("../models/user");
exports.Schema = mongoose.Schema;
const router = express.Router();
router.get("/", (req, res, next) => {
    cat_1.default.find(function (err, cats) {
        if (err)
            return console.error(err);
        res.json(cats);
    });
});
router.get("/user/", (req, res, next) => {
    user_1.default.find(function (err, users) {
        if (err)
            return console.error(err);
        res.json(users);
    });
});
router.post("/adduser/", (req, res, next) => {
    var user = new user_1.default({
        facebookid: req.body.facebookid,
        description: req.body.description,
        services: req.body.services,
        range: req.body.range,
        zipcode: req.body.zipcode
    });
    user.save(function (err, user) {
        if (err)
            return console.log(err);
        console.log("User: " +
            req.body.facebookid +
            " saved at " +
            moment().format("MMMM Do YYYY, h:mm:ss a"));
        res.send("it worked");
    });
});
router.post("/add", (req, res, next) => {
    var cat = new cat_1.default({
        name: req.body.name,
        age: req.body.age,
        color: req.body.color
    });
    cat.save(function (err, cat) {
        if (err)
            return console.log(err);
        console.log(cat.name + " saved!");
        res.send("it worked");
    });
});
exports.default = router;
//# sourceMappingURL=test.js.map