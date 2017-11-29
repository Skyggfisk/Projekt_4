"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const categoryController_1 = require("../controllers/categoryController");
const jwt = require("jsonwebtoken");
const app_1 = require("../app");
exports.Schema = mongoose.Schema;
const router = express.Router();
const categoryController = new categoryController_1.CategoryController();
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
router.get("/", categoryController.getAll);
router.get("/:name", categoryController.getLikeName);
exports.default = router;
//# sourceMappingURL=categories.js.map