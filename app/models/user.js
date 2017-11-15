"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    facebookid: String,
    description: String,
    services: Array,
    range: Number,
    zipcode: String
});
exports.User = mongoose_1.model("User", exports.UserSchema);
exports.default = exports.User;
//# sourceMappingURL=user.js.map