"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../models/category");
const moment = require("moment");
class CategoryController {
    getAll(req, res) {
        category_1.Category.find((err, categories) => {
            if (err)
                return console.error(err.stack);
            res.json(categories);
        });
    }
    getLikeName(req, res) {
        category_1.Category.find({ name: { $regex: req.params.name, $options: "i" } }, (err, categories) => {
            if (err)
                return console.error(err.stack);
            res.json(categories);
        });
    }
    createCategory(req, res) {
        var category = new category_1.Category({
            name: req.body.name
        });
        category.save((err, category) => {
            if (err)
                return console.error(err.stack);
            console.log(moment().format("h:mm:ss a") + " - Category: " + category.name + " saved!");
            res.send("it worked");
        });
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=categoryController.js.map