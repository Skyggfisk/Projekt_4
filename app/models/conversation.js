"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_1 = require("../models/user");
var ConversationSchema = new mongoose_1.Schema({
    messages: Array,
    user: user_1.User
});
exports.Conversation = mongoose_1.model("Conversation", ConversationSchema);
exports.default = exports.Conversation;
//# sourceMappingURL=conversation.js.map