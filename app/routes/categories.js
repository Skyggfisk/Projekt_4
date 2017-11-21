"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const category_1 = require("../models/category");
const categoryController_1 = require("../controllers/categoryController");
exports.Schema = mongoose.Schema;
const router = express.Router();
const categoryController = new categoryController_1.CategoryController();
router.get("/", categoryController.getAll);
router.get("/:name", (req, res, next) => {
    category_1.Category.find({ name: { $regex: req.params.name, $options: "i" } }, function (err, categories) {
        if (err)
            return console.error(err);
        res.json(categories);
    });
});
exports.default = router;
//# sourceMappingURL=categories.js.map