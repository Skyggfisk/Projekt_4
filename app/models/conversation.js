"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var ConversationSchema = new mongoose_1.Schema({
    messages: Array,
    user: Array
});
exports.Conversation = mongoose_1.model("Conversation", ConversationSchema);
exports.default = exports.Conversation;
//# sourceMappingURL=conversation.js.map