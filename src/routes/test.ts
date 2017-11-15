"use strict";

import * as express from "express";
import * as mongoose from "mongoose";
import Cat from "../models/cat";
import User from "../models/user";
export let Schema = mongoose.Schema;
const router = express.Router();

/* GET test cats */
router.get("/", (req, res, next) => {
  Cat.find(function(err, cats) {
    if (err) return console.error(err);
    res.json(cats);
  });
});

router.get("/user/", (req, res, next) => {
  User.find(function(err, users) {
    if (err) return console.error(err);
    res.json(users);
  });
});

router.post("/adduser/", (req, res, next) => {
  var user = new User({
    facebookid: req.body.facebookid,
    description: req.body.description,
    services: req.body.services,
    range: req.body.range,
    zipcode: req.body.zipcode
  });
  user.save(function(err, cat) {
    if (err) return console.log(err);
    console.log(cat.name + " saved!");
    res.send("it worked");
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
