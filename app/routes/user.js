"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment");
const user_1 = require("../models/user");
exports.Schema = mongoose.Schema;
const router = express.Router();
router.get("/", (req, res, next) => {
    user_1.default.find(function (err, users) {
        if (err)
            return console.error(err);
        res.json(users);
    });
});
router.post("/", (req, res, next) => {
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
        console.log(moment().format("h:mm:ss a") + " - User: " + user.facebookid + " saved!");
        res.send("it worked");
    });
});
exports.default = router;
//# sourceMappingURL=user.js.map