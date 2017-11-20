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
<<<<<<< HEAD
        date: req.body.date,
        description: req.body.description,
        categories: req.body.categories,
        taskID: req.body.taskID,
        salary: req.body.salary
=======
        description: req.body.description,
        categories: req.body.categories,
        taskID: req.body.taskID
>>>>>>> b59825bb8558362232923f6cf63df6ed9e7ba5c2
    });
    task.save(function (err, task) {
        if (err)
            return console.log(err);
        console.log(moment().format("h:mm:ss a") + " - Task: " + task.taskID + " saved!");
        res.send("it worked");
    });
});
exports.default = router;
//# sourceMappingURL=task.js.map