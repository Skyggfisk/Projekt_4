"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var DevUserSchema = new mongoose_1.Schema({
    name: String,
    password: String,
    admin: Boolean
});
exports.DevUser = mongoose_1.model("DevUser", DevUserSchema);
exports.default = exports.DevUser;
//# sourceMappingURL=devuser.js.map