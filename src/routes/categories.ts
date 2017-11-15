"use strict";
import * as express from "express";
import * as mongoose from "mongoose";
import Category from "../models/category";
export let Schema = mongoose.Schema;
const router = express.Router();

/* GET all categories as json array */
router.get("/", (req, res, next) => {
  Category.find(function(err, cats) {
    if (err) return console.error(err);
    res.json(cats);
  });
});

export default router;
