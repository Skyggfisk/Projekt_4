"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const app_1 = require("../app");
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
router.get("/oid/:id", (req, res, next) => {
    var id = req.params.id;
    user_1.default.findById(id, function (err, user) {
        if (err)
            return console.error(err);
        res.json(user);
    });
});
router.get("/:id", (req, res, next) => {
    var query = user_1.default.where({ facebookid: req.params.id });
    query.findOne(function (err, user) {
        if (err)
            return console.error(err);
        res.json(user);
    });
});
router.use(function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (token) {
        jwt.verify(token, app_1.default.get("superSecret"), function (err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: "Failed to authenticate token."
                });
            }
            else {
                req["decoded"] = decoded;
                next();
            }
        });
    }
    else {
        return res.status(403).send({
            success: false,
            message: "No token provided."
        });
    }
});
router.post("/", (req, res, next) => {
    var user = new user_1.default({
        facebookid: req.body.facebookid,
        description: req.body.description,
        services: req.body.services,
        range: req.body.range,
        zipcode: req.body.zipcode,
        fname: req.body.fname,
        lname: req.body.lname,
        imgurl: req.body.imgurl
    });
    user.save(function (err, user) {
        if (err)
            return console.log(err);
        console.log(moment().format("h:mm:ss a") + " - User: " + user.facebookid + " saved!");
        res.send("it worked");
    });
});
router.put("/:id", (req, res, next) => {
    var user = user_1.default.where({ facebookid: req.params.id });
    return user.findOne(function (err, user) {
        user.description = req.body.description || user.description;
        user.services = req.body.services || user.services;
        user.range = req.body.range || user.range;
        user.zipcode = req.body.zipcode || user.zipcode;
        user.fname = req.body.fname || user.fname;
        user.lname = req.body.lname || user.lname;
        user.imgurl = req.body.imgurl || user.imgurl;
        return user.save(function (err) {
            if (err)
                return console.log(err);
            console.log(moment().format("h:mm:ss a") +
                " - User: " +
                user.facebookid +
                " updated!");
            res.send(moment().format("h:mm:ss a") +
                " - User: " +
                user.facebookid +
                " updated!");
        });
    });
});
router.delete("/:id", (req, res, next) => {
    var query = user_1.default.where({
        facebookid: req.params.id
    }).findOneAndRemove(function (err, user) {
        if (err)
            return console.error(err);
        res.json(user);
    });
});
exports.default = router;
//# sourceMappingURL=user.js.map