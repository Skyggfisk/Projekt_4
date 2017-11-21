"use strict";
import * as express from "express";
import * as mongoose from "mongoose";
import {Category} from "../models/category";
import {CategoryController} from "../controllers/categoryController";
export let Schema = mongoose.Schema;
const router = express.Router();
const categoryController = new CategoryController();

// import categoryController from "../controllers/categoryController"

/* GET all categories as json array */
router.get("/", categoryController.getAll);

router.get("/:name", (req, res, next) => {
  Category.find({ name: { $regex: req.params.name, $options: "i" } }, function(
    err,
    categories
  ) {
    if (err) return console.error(err);
    res.json(categories);
  });
});

export default router;
