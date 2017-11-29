"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app_1 = require("../app");
const userController_1 = require("../controllers/userController");
exports.Schema = mongoose.Schema;
const userController = new userController_1.UserController();
const router = express.Router();
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
router.get("/", userController.getAll);
router.get("/:id", userController.getOne);
router.get("/services/:category", userController.getAllForCategory);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map