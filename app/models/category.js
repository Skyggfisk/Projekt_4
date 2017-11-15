"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.CategorySchema = new mongoose_1.Schema({
    name: String
});
<<<<<<< HEAD
exports.CategorySchema.pre("save", function (next) {
    let now = new Date();
    if (!this.modified) {
        this.modified = now;
    }
    next();
});
exports.CategorySchema.methods.myNameIs = function () {
    return "Hello, my name is " + this.name;
};
=======
>>>>>>> 9114e2ac6289ada69b57ab40ce638f2700014076
exports.Category = mongoose_1.model("Category", exports.CategorySchema);
exports.default = exports.Category;
//# sourceMappingURL=category.js.map