"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.ConversationSchema = new mongoose_1.Schema({
    participants: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }]
});
exports.Conversation = mongoose_1.model("Conversation", exports.ConversationSchema);
exports.default = exports.Conversation;
//# sourceMappingURL=conversation.js.map