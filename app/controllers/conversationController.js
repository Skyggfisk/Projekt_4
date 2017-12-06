"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conversation_1 = require("../models/conversation");
const message_1 = require("../models/message");
const moment = require("moment");
class ConversationController {
    getAll(req, res, next) {
        conversation_1.Conversation.find((err, conversations) => {
            if (err)
                return console.error(err.stack);
            res.json(conversations);
        });
    }
    getOneConversation(req, res, next) {
        conversation_1.Conversation.findOne({ _id: req.params.id }, (err, conversation) => {
            if (err)
                return console.error(err.stack);
            res.json(conversation);
        });
    }
    getUserConversation(req, res, next) {
        conversation_1.Conversation.find({ user: req.params.facebookid }, (err, conversations) => {
            if (err)
                return console.error(err.stack);
            res.json(conversations);
        });
    }
    getMessagesForConversation(req, res, next) {
        message_1.Message.find({ conversationID: req.params.conversationID }, (err, messages) => {
            if (err)
                return console.error(err.stack);
            res.json(messages);
        });
    }
    createConversation(req, res, next) {
        var conversation = new conversation_1.Conversation({
            user: req.body.user
        });
        conversation.save((err, conversation) => {
            if (err)
                return console.error(err.stack);
            console.log(moment().format("h:mm:ss a") +
                " - conversation: " +
                conversation._id +
                " saved!");
            res.send(conversation._id);
        });
    }
    createMessage(req, res, next) {
        var message = new message_1.Message({
            message: req.body.message,
            user: req.body.user,
            timeStamp: req.body.timeStamp,
            conversationID: req.body.conversationID
        });
        message.save((err, message) => {
            if (err)
                return console.error(err.message);
            console.log(moment().format("h:mm:ss a") +
                " - message: " +
                message.conversationID +
                " saved!");
            res.send("it worked");
        });
    }
}
exports.ConversationController = ConversationController;
//# sourceMappingURL=conversationController.js.map