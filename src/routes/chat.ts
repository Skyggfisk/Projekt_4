"use strict";

import * as express from "express";
import * as moment from "moment";
import * as jwt from "jsonwebtoken";
import { ChatController } from "../controllers/chatController";
const router = express.Router();

const chatController = new ChatController();

// GET all conversations
router.get("/", chatController.getConversations);

// GET all conversations for user
router.get("/user/:facebookid", chatController.getConversations);

// GET single conversation by conversationId
router.get("/:conversationId", chatController.getConversation);

// GET single conversation for user by id
router.get("/user/:facebookid/:conversationid")

// POST new conversation
router.post("/user/:facebookid/:recipient", chatController.newConversation);

// POST reply to a conversation
router.post("/:facebookid/:conversationId", chatController.sendReply);

// DELETE conversation by conversationId
router.delete(
  "/:facebookid/:conversationId",
  chatController.deleteConversation
);

export default router;
