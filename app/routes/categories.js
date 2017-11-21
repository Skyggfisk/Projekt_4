"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const category_1 = require("../models/category");
exports.Schema = mongoose.Schema;
const router = express.Router();
router.get("/", (req, res, next) => {
    category_1.default.find(function (err, categories) {
        if (err)
            return console.error(err);
        res.json(categories);
    });
});
router.get("/:name", (req, res, next) => {
    category_1.default.find({ name: { $regex: req.params.name, $options: "i" } }, function (err, categories) {
        if (err)
            return console.error(err);
        res.json(categories);
    });
});
exports.default = router;
//# sourceMappingURL=categories.js.map