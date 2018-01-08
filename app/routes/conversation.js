"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const jwt = require("jsonwebtoken");
const app_1 = require("../app");
const conversationController_1 = require("../controllers/conversationController");
const router = express.Router();
const conversationController = new conversationController_1.ConversationController();
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
router.get("/user/:facebookid", conversationController.getUserConversation);
router.post("/", conversationController.createConversation);
router.post("/message", conversationController.createMessage);
router.get("/message/:conversationID", conversationController.getMessagesForConversation);
exports.default = router;
//# sourceMappingURL=conversation.js.map