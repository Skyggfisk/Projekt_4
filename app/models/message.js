"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.MessageSchema = new mongoose_1.Schema({
    conversationId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});
exports.Message = mongoose_1.model("Message", exports.MessageSchema);
exports.default = exports.Message;
//# sourceMappingURL=message.js.map