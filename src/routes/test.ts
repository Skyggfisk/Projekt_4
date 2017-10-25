"use strict";

import * as express from "express";
import * as mongoose from "mongoose";
import Cat from "../models/cat";
export let Schema = mongoose.Schema;
const router = express.Router();

/* GET test cats */
router.get("/", (req, res, next) => {
  Cat.find(function(err, cats) {
    if (err) return console.error(err);
    res.json(cats);
  });
});

/* POST a cat (use postman) */
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
