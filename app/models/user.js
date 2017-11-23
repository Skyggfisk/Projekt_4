"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    facebookid: String,
    description: String,
    services: Array,
    range: Number,
    zipcode: String,
    fname: String,
    lname: String,
    imgurl: String
});
exports.User = mongoose_1.model("User", UserSchema);
exports.default = exports.User;
//# sourceMappingURL=user.js.map