"use strict";

import * as express from "express";
import * as mongoose from "mongoose";
import * as moment from "moment";
import User from "../models/user";
export let Schema = mongoose.Schema;
const router = express.Router();

// GET all users
router.get("/", (req, res, next) => {
  User.find(function(err, users) {
    if (err) return console.error(err);
    res.json(users);
  });
});

// GET user by id
router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  User.findById(id, function(err, user) {
    if (err) return console.error(err);
    res.json(user);
  });
});

// POST a new user
router.post("/", (req, res, next) => {
  var user = new User({
    facebookid: req.body.facebookid,
    description: req.body.description,
    services: req.body.services,
    range: req.body.range,
    zipcode: req.body.zipcode,
    fname: req.body.fname,
    lname: req.body.lname,
    imgurl: req.body.imgurl
  });
  user.save(function(err, user) {
    if (err) return console.log(err);
    console.log(
      moment().format("h:mm:ss a") + " - User: " + user.facebookid + " saved!"
    );
    res.send("it worked");
  });
});

export default router;
