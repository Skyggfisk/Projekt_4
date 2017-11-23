"use strict";
import * as express from "express";
import * as mongoose from "mongoose";
import { Category } from "../models/category";
import { CategoryController } from "../controllers/categoryController";
export let Schema = mongoose.Schema;
const router = express.Router();
const categoryController = new CategoryController();

// GET all categories as json array
router.get("/", categoryController.getAll);

// GET all categories with a name like params.name
router.get("/:name", categoryController.getLikeName);

export default router;
