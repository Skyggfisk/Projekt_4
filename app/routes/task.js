"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app_1 = require("../app");
const taskController_1 = require("../controllers/taskController");
exports.Schema = mongoose.Schema;
const router = express.Router();
const taskController = new taskController_1.TaskController();
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
router.get("/", taskController.getAll);
router.get("/:id", taskController.getOne);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
exports.default = router;
//# sourceMappingURL=task.js.map