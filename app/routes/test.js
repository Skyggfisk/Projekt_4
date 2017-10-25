"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const cat_1 = require("../models/cat");
exports.Schema = mongoose.Schema;
const router = express.Router();
router.get("/", (req, res, next) => {
    res.send("yo");
});
router.post("/add", (req, res, next) => {
    var cat = new cat_1.default({
        name: req.body.name,
        age: req.body.age,
        color: req.body.color
    });
    cat.save(function (err, cat) {
        if (err)
            return console.log(err);
        console.log(cat.name + " saved!");
        res.send("it worked");
    });
});
exports.default = router;
//# sourceMappingURL=test.js.map