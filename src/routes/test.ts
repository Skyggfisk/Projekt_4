"use strict";

import * as express from "express";
import * as mongoose from "mongoose";
import Cat from "../models/cat";
export let Schema = mongoose.Schema;
const router = express.Router();

/* GET test data */
router.get("/", (req, res, next) => {
  res.send("yo");
});

/* POST cat (use postman) */
router.post("/add", (req, res, next) => {
  var cat = new Cat({
    name: req.body.name,
    age: req.body.age,
    color: req.body.color
  });
  cat.save(function(err, cat) {
    if (err) return console.log(err);
    console.log(cat.name + " saved!");
    res.send("it worked");
  });
});

export default router;
