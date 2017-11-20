"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment");
const task_1 = require("../models/task");
exports.Schema = mongoose.Schema;
const router = express.Router();
router.get("/", (req, res, next) => {
    task_1.default.find(function (err, tasks) {
        if (err)
            return console.error(err);
        res.json(tasks);
    });
});
router.get("/:id", (req, res, next) => {
    var id = req.params.id;
    task_1.default.findById(id, function (err, tasks) {
        if (err)
            return console.error(err);
        res.json(tasks);
    });
});
router.post("/", (req, res, next) => {
    var task = new task_1.default({
        title: req.body.title,
        creationDate: req.body.creationDate,
        date: req.body.date,
        description: req.body.description,
        categories: req.body.categories,
        taskID: req.body.taskID,
        salary: req.body.salary
    });
    task.save(function (err, task) {
        if (err)
            return console.log(err);
        console.log(moment().format("h:mm:ss a") + " - Task: " + task.taskID + " saved!");
        res.send("it worked");
    });
});
router.put("/:id", (req, res, next) => {
    var task = task_1.default.where({ facebookid: req.params.id });
    return task.findOne(function (err, user) {
        task.title = req.body.title || task.title;
        task.creationDate = req.body.creationDate || task.creationDate;
        task.date = req.body.date || task.date;
        task.description = req.body.description || task.description;
        task.categories = req.body.categories || task.categories;
        task.salary = req.body.salary || task.salary;
        return task.save(function (err) {
            if (err)
                return console.log(err);
            console.log(moment().format("h:mm:ss a") + " - Task: " + task.taskID + " updated!");
            res.send(moment().format("h:mm:ss a") + " - Task: " + task.taskID + " updated!");
        });
    });
});
router.delete("/:id", (req, res, next) => {
    var query = task_1.default.where({
        taskID: req.params.id
    }).findOneAndRemove(function (err, task) {
        if (err)
            return console.error(err);
        res.json(task);
    });
});
exports.default = router;
//# sourceMappingURL=task.js.map