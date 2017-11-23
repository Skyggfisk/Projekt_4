"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../models/category");
class CategoryController {
    getAll(req, res, next) {
        category_1.Category.find((err, categories) => {
            if (err)
                return console.error(err.stack);
            res.json(categories);
        });
    }
    getLikeName(req, res, next) {
        category_1.Category.find({ name: { $regex: req.params.name, $options: "i" } }, (err, categories) => {
            if (err)
                return console.error(err.stack);
            res.json(categories);
        });
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=categoryController.js.map