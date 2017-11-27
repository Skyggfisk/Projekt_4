"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app_1 = require("../app");
const conversationController_1 = require("../controllers/conversationController");
exports.Schema = mongoose.Schema;
const conversationController = new conversationController_1.ConversationController();
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
router.get("/", conversationController.getAll);
router.get("/:id", conversationController.getOneConversation);
router.post("/", conversationController.createConversation);
router.post("/message", conversationController.createMessage);
exports.default = router;
//# sourceMappingURL=conversation.js.map