"use strict";

import * as express from "express";
import app from "../app";
import { CategoryController } from "../controllers/categoryController";
import { JwtController } from "../controllers/jwtController";
const router = express.Router();
const categoryController = new CategoryController();
const jwtController = new JwtController();

// verify using jwtController
router.use(jwtController.verifyToken);

// GET all categories as json array
router.get("/", categoryController.getAll);

// GET all categories with a name like params.name
router.get("/:name", categoryController.getLikeName);

// POST new category
router.post("/", categoryController.createCategory);

export default router;
