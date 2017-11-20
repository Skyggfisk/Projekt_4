"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.DevUserSchema = new mongoose_1.Schema({
    name: String,
    password: String,
    admin: Boolean
});
exports.DevUser = mongoose_1.model("DevUser", exports.DevUserSchema);
exports.default = exports.DevUser;
//# sourceMappingURL=devuser.js.map