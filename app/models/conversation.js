"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_1 = require("../models/user");
var ConversationSchema = new mongoose_1.Schema({
    messages: Array,
<<<<<<< HEAD
    user: user_1.User
=======
    user: [{ type: mongoose_1.Schema.Types.ObjectId, ref: user_1.User }]
>>>>>>> 21b4efabdeb867250faeb2c7f9a8bb3f3bdf49f3
});
exports.Conversation = mongoose_1.model("Conversation", ConversationSchema);
exports.default = exports.Conversation;
//# sourceMappingURL=conversation.js.map