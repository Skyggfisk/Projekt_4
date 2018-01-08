"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const categoryController_1 = require("../controllers/categoryController");
const jwtController_1 = require("../controllers/jwtController");
const router = express.Router();
const categoryController = new categoryController_1.CategoryController();
const jwtController = new jwtController_1.JwtController();
router.use(jwtController.verifyToken);
router.get("/", categoryController.getAll);
router.get("/:name", categoryController.getLikeName);
router.post("/", categoryController.createCategory);
exports.default = router;
//# sourceMappingURL=categories.js.map