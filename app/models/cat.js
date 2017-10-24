"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.CatSchema = new mongoose_1.Schema({
    name: String,
    age: Number,
    color: String,
    modified: Date
});
exports.CatSchema.pre("save", function (next) {
    let now = new Date();
    if (!this.modified) {
        this.modified = now;
    }
    next();
});
exports.CatSchema.methods.myNameIs = function () {
    return "Hello, my name is " + this.name;
};
exports.Cat = mongoose_1.model("Cat", exports.CatSchema);
exports.default = exports.Cat;
//# sourceMappingURL=cat.js.map