"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const categoryController_1 = require("../controllers/categoryController");
exports.Schema = mongoose.Schema;
const router = express.Router();
const categoryController = new categoryController_1.CategoryController();
router.get("/", categoryController.getAll);
router.get("/:name", categoryController.getLikeName);
exports.default = router;
//# sourceMappingURL=categories.js.map