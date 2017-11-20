"use strict";

import * as express from "express";
import * as mongoose from "mongoose";
import * as moment from "moment";
import Task from "../models/task";
export let Schema = mongoose.Schema;
const router = express.Router();

// GET all tasks
router.get("/", (req, res, next) => {
  Task.find(function(err, tasks) {
    if (err) return console.error(err);
    res.json(tasks);
  });
});

// GET tasl by id (stupid mongoid)
router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  Task.findById(id, function(err, tasks) {
    if (err) return console.error(err);
    res.json(tasks);
  });
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

// DELETE task by id
router.delete("/:id", (req, res, next) => {
  var query = Task.where({
    taskID: req.params.id
  }).findOneAndRemove(function(err, task) {
    if (err) return console.error(err);
    res.json(task);
  });
});

export default router;
