"use strict";

import * as express from "express";
import * as mongoose from "mongoose";
import * as jwt from "jsonwebtoken";
import app from "../app";
import { Request, Response, NextFunction } from "express";
import { ConversationController } from "../controllers/conversationController";
const router = express.Router();
const conversationController = new ConversationController();

// route middleware to verify a token
router.use(function (req: Request, res: Response, next: NextFunction) {
  // check header or url parameters or post parameters for token
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get("superSecret"), function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: "Failed to authenticate token."
        });
      } else {
        // if everything is good, save to request for use in other routes
        req["decoded"] = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: "No token provided."
    });
  }
});

// GET all conversation
router.get("/", conversationController.getAll);

// GET conversation by mongo _id
router.get("/:id", conversationController.getOneConversation);

// GET conversation by user id
router.get("/user/:facebookid", conversationController.getUserConversation);

// POST a new conversation
router.post("/", conversationController.createConversation);

// POST a new message
router.post("/message", conversationController.createMessage);

// GET all messages for a conversation by conversationid
router.get(
  "/message/:conversationID",
  conversationController.getMessagesForConversation
);

export default router;
