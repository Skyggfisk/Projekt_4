"use strict";

import * as express from "express";
import * as mongoose from "mongoose";
import * as moment from "moment";
import Task from "../models/task";
import * as jwt from "jsonwebtoken";
import app from "../app";
export let Schema = mongoose.Schema;
const router = express.Router();

// GET all tasks
router.get("/", (req, res, next) => {
  Task.find(function(err, tasks) {
    if (err) return console.error(err);
    res.json(tasks);
  });
});

// GET task by id (stupid mongoid)
router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  Task.findById(id, function(err, tasks) {
    if (err) return console.error(err);
    res.json(tasks);
  });
});

//ALT HEROVER ER FREETOPLAY _____________ ALT UNDER KRÆVER JSONWEBTOKEN

// route middleware to verify a token
router.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get("superSecret"), function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: "Failed to authenticate token."
        });
      } else {
        // if everything is good, save to request for use in other routes
        req["decoded"] = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: "No token provided."
    });
  }
});

// POST a new task
router.post("/", (req, res, next) => {
  var task = new Task({
    title: req.body.title,
    creationDate: req.body.creationDate,
    date: req.body.date,
    description: req.body.description,
    categories: req.body.categories,
    taskID: req.body.taskID,
    salary: req.body.salary
  });
  task.save(function(err, task) {
    if (err) return console.log(err);
    console.log(
      moment().format("h:mm:ss a") + " - Task: " + task.taskID + " saved!"
    );
    res.send("it worked");
  });
});

// UPDATE task by id
router.put("/:id", (req, res, next) => {
  var task = Task.findOne({ taskID: req.body.taskID }, function(err, user) {
    task.title = req.body.title || task.title;
    task.creationDate = req.body.creationDate || task.creationDate;
    task.date = req.body.date || task.date;
    task.description = req.body.description || task.description;
    task.categories = req.body.categories || task.categories;
    task.salary = req.body.salary || task.salary;
    return task.save(function(err) {
      if (err) return console.log(err);
      console.log(
        moment().format("h:mm:ss a") + " - Task: " + task.taskID + " updated!"
      );
      res.send(
        moment().format("h:mm:ss a") + " - Task: " + task.taskID + " updated!"
      );
    });
  });
});

// DELETE task by id
router.delete("/:id", (req, res, next) => {
  Task.findOneAndRemove({ taskID: req.params.id }, function(err, task) {
    if (err) return console.error(err);
    res.json(task);
  });
});

export default router;
