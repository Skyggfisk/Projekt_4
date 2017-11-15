"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.CategorynpriceSchema = new mongoose_1.Schema({
    categories: Array,
    price: Number
});
exports.Categorynprice = mongoose_1.model("Categorynprice", exports.CategorynpriceSchema);
exports.default = exports.Categorynprice;
//# sourceMappingURL=categorynPrice.js.map