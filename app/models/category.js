"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.CategorySchema = new mongoose_1.Schema({
    name: String
});
exports.Category = mongoose_1.model("Category", exports.CategorySchema);
exports.default = exports.Category;
//# sourceMappingURL=category.js.map