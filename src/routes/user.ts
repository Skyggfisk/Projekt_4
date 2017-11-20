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
router.get("/oid/:id", (req, res, next) => {
  var id = req.params.id;
  User.findById(id, function(err, user) {
    if (err) return console.error(err);
    res.json(user);
  });
});

// GET user by facebookid
router.get("/:id", (req, res, next) => {
  var query = User.where({ facebookid: req.params.id });
  query.findOne(function(err, user) {
    if (err) return console.error(err);
    res.json(user);
  });
});

// POST a new user
router.post("/:id", (req, res, next) => {
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

// UPDATE user by id
router.put("/:id", (req, res, next) => {
  var user = User.where({ facebookid: req.params.id });
  return user.findOne(function(err, user) {
    user.description = req.body.description || user.description;
    user.services = req.body.services || user.services;
    user.range = req.body.range || user.range;
    user.zipcode = req.body.zipcode || user.zipcode;
    user.fname = req.body.fname || user.fname;
    user.lname = req.body.lname || user.lname;
    user.imgurl = req.body.imgurl || user.imgurl;
    return user.save(function(err) {
      if (err) return console.log(err);
      console.log(
        moment().format("h:mm:ss a") +
          " - User: " +
          user.facebookid +
          " updated!"
      );
      res.send(
        moment().format("h:mm:ss a") +
          " - User: " +
          user.facebookid +
          " updated!"
      );
    });
  });
});

// DELETE user by id
router.delete("/:id", (req, res, next) => {
  var query = User.where({
    facebookid: req.params.id
  }).findOneAndRemove(function(err, user) {
    if (err) return console.error(err);
    res.json(user);
  });
});

export default router;
