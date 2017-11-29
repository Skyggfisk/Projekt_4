"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_1 = require("../models/user");
var MessageSchema = new mongoose_1.Schema({
    user: [{ type: mongoose_1.Schema.Types.ObjectId, ref: user_1.User }],
    message: String,
    timeStamp: Date,
    conversationID: String
});
exports.Message = mongoose_1.model("Message", MessageSchema);
exports.default = exports.Message;
//# sourceMappingURL=message.js.map