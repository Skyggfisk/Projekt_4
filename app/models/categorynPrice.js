"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const category_1 = require("../models/category");
var CategorynpriceSchema = new mongoose_1.Schema({
    category: category_1.Category,
    price: Number
});
const Categorynprice = mongoose_1.model("Categorynprice", CategorynpriceSchema);
exports.default = Categorynprice;
//# sourceMappingURL=categorynPrice.js.map