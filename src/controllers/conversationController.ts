"use strict";

import { Request, Response, NextFunction, Errback } from "express";
import { Conversation, IConversationModel } from "../models/conversation";
import { Message, IMessageModel } from "../models/message";
import { Error } from "mongoose";
import * as moment from "moment";

export class ConversationController {
  // GET all conversations
  getAll(req: Request, res: Response, next: NextFunction) {
    Conversation.find((err: Error, conversations: JSON) => {
      if (err) return console.error(err.stack);
      res.json(conversations);
    });
  }

  // GET conversation by _id
  getOneConversation(req: Request, res: Response, next: NextFunction) {
    Conversation.findOne(
      { _id: req.params.id },
      (err: Error, conversation: IConversationModel) => {
        if (err) return console.error(err.stack);
        res.json(conversation);
      }
    );
  }

  // GET all conversations for user by facebookid
  getUserConversation(req: Request, res: Response, next: NextFunction) {
    Conversation.find(
      { user: req.params.facebookid },
      (err: Error, conversations: IConversationModel[]) => {
        if (err) return console.error(err.stack);
        res.json(conversations);
      }
    );
  }

  // GET all messages for a conversation by conversationid
  getMessagesForConversation(req: Request, res: Response, next: NextFunction) {
    Message.find(
      { conversationID: req.params.conversationID },
      (err: Error, messages: IMessageModel[]) => {
        if (err) return console.error(err.stack);
        res.json(messages);
      }
    );
  }

  // POST a new conversation
  createConversation(req: Request, res: Response, next: NextFunction) {
    var conversation = new Conversation({
      user: req.body.user
    });
    conversation.save((err: Error, conversation: IConversationModel) => {
      if (err) return console.error(err.stack);
      console.log(
        moment().format("h:mm:ss a") +
          " - conversation: " +
          conversation._id +
          " saved!"
      );
      res.send(conversation._id);
    });
  }

  // POST a new message
  createMessage(req: Request, res: Response, next: NextFunction) {
    var message = new Message({
      message: req.body.message,
      user: req.body.user,
      timeStamp: req.body.timeStamp,
      conversationID: req.body.conversationID
    });
    message.save((err: Error, message: IMessageModel) => {
      if (err) return console.error(err.message);
      console.log(
        moment().format("h:mm:ss a") +
          " - message: " +
          message.conversationID +
          " saved!"
      );
      res.send("it worked");
    });
  }
}
