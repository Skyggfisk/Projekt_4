"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const devuser_1 = require("../models/devuser");
exports.Schema = mongoose.Schema;
const app_1 = require("../app");
var router = express.Router();
router.post("/authenticate", function (req, res) {
    devuser_1.default.findOne({ name: req.body.name }, function (err, devuser) {
        if (err)
            throw err;
        if (!devuser) {
            res.json({
                success: false,
                message: "Authentication failed. User not found."
            });
        }
        else if (devuser) {
            if (devuser.password != req.body.password) {
                res.json({
                    success: false,
                    message: "Authentication failed. Wrong password."
                });
            }
            else {
                const payload = {
                    admin: devuser.admin
                };
                var token = jwt.sign(payload, app_1.default.get("superSecret"), {});
                res.json({
                    success: true,
                    message: "Enjoy your token!",
                    token: token
                });
            }
        }
    });
});
exports.default = router;
//# sourceMappingURL=devuser.js.map