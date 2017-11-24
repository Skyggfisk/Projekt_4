"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const chatController_1 = require("../controllers/chatController");
const router = express.Router();
const chatController = new chatController_1.ChatController();
router.get("/", chatController.getConversations);
router.get("/user/:facebookid", chatController.getConversations);
router.get("/:conversationId", chatController.getConversation);
router.get("/user/:facebookid/:conversationid");
router.post("/new/:facebookid/:recipient", chatController.newConversation);
router.post("/:facebookid/:conversationId", chatController.sendReply);
router.delete("/:facebookid/:conversationId", chatController.deleteConversation);
exports.default = router;
//# sourceMappingURL=chat.js.map