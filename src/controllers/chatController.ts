"use strict";

import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";
import { Conversation, IConversationModel } from "../models/conversation";
import { Message, IMessageModel } from "../models/message";
import { User } from "../models/user";

export class ChatController {
  // GET all conversations
  getAll(req: Request, res: Response, next: NextFunction) {
    Conversation.find((err: Error, conversations: JSON) => {
      if (err) return console.error(err.stack);
      res.json(conversations);
    });
  }

  // GET all conversations for a user.
  // Display one message as snippet for each conversation
  getConversations(req: Request, res: Response, next: NextFunction) {
    Conversation.find({ participants: req.params.facebookid })
      .select("facebookid")
      .exec((err: Error, conversations: IConversationModel[]) => {
        if (err) {
          res.send({ error: err });
          return next(err);
        }

        // Set up empty array to hold conversations + most recent message
        let fullConversations = [];
        conversations.forEach((conversation: IConversationModel) => {
          Message.find({ conversationId: conversation._id })
            .sort("-createdAt")
            .limit(1)
            .populate({
              path: "author",
              select: "user.fname user.lname"
            })
            .exec((err: Error, message: IMessageModel[]) => {
              if (err) {
                res.send({ error: err });
                return next(err);
              }
              fullConversations.push(message);
              if (fullConversations.length === conversations.length) {
                return res
                  .status(200)
                  .json({ conversations: fullConversations });
              }
            });
        });
      });
  }

  // GET conversation by conversationId
  getConversation(req: Request, res: Response, next: NextFunction) {
    Message.find({ conversationId: req.params.conversationId })
      .select("createdAt body author")
      .sort("-createdAt")
      .populate({
        path: "author",
        select: "user.fname user.lname"
      })
      .exec((err: Error, messages: IMessageModel[]) => {
        if (err) {
          res.send({ error: err });
          return next(err);
        }

        res.status(200).json({ conversation: messages });
      });
  }

  // POST new conversation
  newConversation(req: Request, res: Response, next: NextFunction) {
    if (!req.params.recipient) {
      res
        .status(422)
        .send({ error: "Please choose a valid recipient for your message." });
      return next();
    }

    if (!req.body.composedMessage) {
      res.status(422).send({ error: "Please enter a message." });
      return next();
    }

    const conversation = new Conversation({
      participants: [req.params.facebookid, req.params.recipient]
    });

    conversation.save((err: Error, newConversation: IConversationModel) => {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      const message = new Message({
        conversationId: newConversation._id,
        body: req.body.composedMessage,
        author: req.params.facebookid
      });

      message.save((err: Error, newMessage: IMessageModel) => {
        if (err) {
          res.send({ error: err });
          return next(err);
        }

        res.status(200).json({
          message: "Conversation started!",
          conversationId: conversation._id
        });
        return next();
      });
    });
  }

  // POST reply to a conversation
  sendReply(req: Request, res: Response, next: NextFunction) {
    const reply = new Message({
      conversationId: req.params.conversationId,
      body: req.body.composedMessage,
      author: req.params.facebookid
    });

    reply.save((err: Error, sentReply: IMessageModel) => {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      res.status(200).json({ message: "Reply successfully sent!" });
      return next;
    });
  }

  // DELETE Route to Delete Conversation
  deleteConversation(req: Request, res: Response, next: NextFunction) {
    Conversation.findOneAndRemove(
      {
        $and: [
          { _id: req.params.conversationId },
          { participants: req.params.facebookid }
        ]
      },
      function(err) {
        if (err) {
          res.send({ error: err });
          return next(err);
        }

        res.status(200).json({ message: "Conversation removed!" });
        return next();
      }
    );
  }
}
