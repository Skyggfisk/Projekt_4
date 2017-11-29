"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var MessageSchema = new mongoose_1.Schema({
    user: String,
    message: String,
    timeStamp: Date,
    conversationID: String
});
exports.Message = mongoose_1.model("Message", MessageSchema);
exports.default = exports.Message;
//# sourceMappingURL=message.js.map