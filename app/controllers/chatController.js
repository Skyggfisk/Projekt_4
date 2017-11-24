"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const conversation_1 = require("../models/conversation");
const message_1 = require("../models/message");
class ChatController {
    getAll(req, res, next) {
        conversation_1.Conversation.find((err, conversations) => {
            if (err)
                return console.error(err.stack);
            res.json(conversations);
        });
    }
    getConversations(req, res, next) {
        conversation_1.Conversation.find({ participants: req.params.facebookid })
            .select("facebookid")
            .exec((err, conversations) => {
            if (err) {
                res.send({ error: err });
                return next(err);
            }
            let fullConversations = [];
            conversations.forEach((conversation) => {
                message_1.Message.find({ conversationId: conversation._id })
                    .sort("-createdAt")
                    .limit(1)
                    .populate({
                    path: "author",
                    select: "user.fname user.lname"
                })
                    .exec((err, message) => {
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
    getConversation(req, res, next) {
        message_1.Message.find({ conversationId: req.params.conversationId })
            .select("createdAt body author")
            .sort("-createdAt")
            .populate({
            path: "author",
            select: "user.fname user.lname"
        })
            .exec((err, messages) => {
            if (err) {
                res.send({ error: err });
                return next(err);
            }
            res.status(200).json({ conversation: messages });
        });
    }
    newConversation(req, res, next) {
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
        const conversation = new conversation_1.Conversation({});
        conversation.save((err, newConversation) => {
            if (err) {
                res.send({ error: err });
                return next(err);
            }
            const message = new message_1.Message({
                conversationId: newConversation._id,
                body: req.body.composedMessage,
                author: mongoose_1.Types.ObjectId(req.params.facebookid)
            });
            message.save((err, newMessage) => {
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
    sendReply(req, res, next) {
        const reply = new message_1.Message({
            conversationId: req.params.conversationId,
            body: req.body.composedMessage,
            author: req.params.facebookid
        });
        reply.save((err, sentReply) => {
            if (err) {
                res.send({ error: err });
                return next(err);
            }
            res.status(200).json({ message: "Reply successfully sent!" });
            return next;
        });
    }
    deleteConversation(req, res, next) {
        conversation_1.Conversation.findOneAndRemove({
            $and: [
                { _id: req.params.conversationId },
                { participants: req.params.facebookid }
            ]
        }, function (err) {
            if (err) {
                res.send({ error: err });
                return next(err);
            }
            res.status(200).json({ message: "Conversation removed!" });
            return next();
        });
    }
}
exports.ChatController = ChatController;
//# sourceMappingURL=chatController.js.map