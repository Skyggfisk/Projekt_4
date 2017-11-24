"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Conversation = require("../models/conversation"), Message = require("../models/message"), User = require("../models/user");
class ChatController {
    constructor() {
        this.getConversations = function (req, res, next) {
            Conversation.find({ participants: req.user.facebookid })
                .select("facebookid")
                .exec(function (err, conversations) {
                if (err) {
                    res.send({ error: err });
                    return next(err);
                }
                let fullConversations = [];
                conversations.forEach(function (conversation) {
                    Message.find({ conversationId: conversation._id })
                        .sort("-createdAt")
                        .limit(1)
                        .populate({
                        path: "author",
                        select: "user.fname user.lname"
                    })
                        .exec(function (err, message) {
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
        };
        this.getConversation = function (req, res, next) {
            Message.find({ conversationId: req.params.conversationId })
                .select("createdAt body author")
                .sort("-createdAt")
                .populate({
                path: "author",
                select: "user.fname user.lname"
            })
                .exec(function (err, messages) {
                if (err) {
                    res.send({ error: err });
                    return next(err);
                }
                res.status(200).json({ conversation: messages });
            });
        };
        this.newConversation = function (req, res, next) {
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
                participants: [req.user.facebookid, req.params.recipient]
            });
            conversation.save(function (err, newConversation) {
                if (err) {
                    res.send({ error: err });
                    return next(err);
                }
                const message = new Message({
                    conversationId: newConversation._id,
                    body: req.body.composedMessage,
                    author: req.user.facebookid
                });
                message.save(function (err, newMessage) {
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
        };
        this.sendReply = function (req, res, next) {
            const reply = new Message({
                conversationId: req.params.conversationId,
                body: req.body.composedMessage,
                author: req.user.facebookid
            });
            reply.save(function (err, sentReply) {
                if (err) {
                    res.send({ error: err });
                    return next(err);
                }
                res.status(200).json({ message: "Reply successfully sent!" });
                return next;
            });
        };
        this.deleteConversation = function (req, res, next) {
            Conversation.findOneAndRemove({
                $and: [
                    { _id: req.params.conversationId },
                    { participants: req.user.facebookid }
                ]
            }, function (err) {
                if (err) {
                    res.send({ error: err });
                    return next(err);
                }
                res.status(200).json({ message: "Conversation removed!" });
                return next();
            });
        };
        this.updateMessage = function (req, res, next) {
            Conversation.find({
                $and: [{ _id: req.params.messageId }, { author: req.user.facebookid }]
            }, function (err, message) {
                if (err) {
                    res.send({ error: err });
                    return next(err);
                }
                message.body = req.body.composedMessage;
                message.save(function (err, updatedMessage) {
                    if (err) {
                        res.send({ error: err });
                        return next(err);
                    }
                    res.status(200).json({ message: "Message updated!" });
                    return next();
                });
            });
        };
    }
}
exports.ChatController = ChatController;
//# sourceMappingURL=chat.js.map