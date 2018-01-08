"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_1 = require("../models/task");
const moment = require("moment");
class TaskController {
    getAll(req, res) {
        task_1.Task.find((err, tasks) => {
            if (err)
                return console.error(err.stack);
            res.json(tasks);
        });
    }
    getOne(req, res) {
        task_1.Task.findOne({ taskID: req.params.id }, (err, task) => {
            if (err)
                return console.error(err.stack);
            res.json(task);
        });
    }
    createTask(req, res) {
        var task = new task_1.Task({
            title: req.body.title,
            creationDate: req.body.creationDate,
            date: req.body.date,
            description: req.body.description,
            categories: req.body.categories,
            taskID: req.body.taskID,
            salary: req.body.salary
        });
        task.save((err, task) => {
            if (err)
                return console.error(err.stack);
            console.log(moment().format("h:mm:ss a") + " - Task: " + task.taskID + " saved!");
            res.send("it worked");
        });
    }
    updateTask(req, res) {
        var task = task_1.Task.findOne({ taskID: req.params.id }, (err, task) => {
            task.title = req.body.title || task.title;
            task.creationDate = req.body.creationDate || task.creationDate;
            task.date = req.body.date || task.date;
            task.description = req.body.description || task.description;
            task.categories = req.body.categories || task.categories;
            task.salary = req.body.salary || task.salary;
            return task.save((err, task) => {
                if (err)
                    return console.log(err.stack);
                console.log(moment().format("h:mm:ss a") +
                    " - Task: " +
                    task.taskID +
                    " updated!");
                res.send(moment().format("h:mm:ss a") +
                    " - Task: " +
                    task.taskID +
                    " updated!");
            });
        });
    }
    deleteTask(req, res) {
        task_1.Task.findOneAndRemove({ taskID: req.params.id }, (err, task) => {
            if (err)
                return console.error(err.stack);
            res.json(task);
        });
    }
}
exports.TaskController = TaskController;
//# sourceMappingURL=taskController.js.map