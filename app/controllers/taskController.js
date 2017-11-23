"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_1 = require("../models/task");
const moment = require("moment");
"use strict";
class TaskController {
    getAll(req, res, next) {
        task_1.Task.find((err, tasks) => {
            if (err)
                return console.error(err.stack);
            res.json(tasks);
        });
    }
    getOne(req, res, next) {
        task_1.Task.findOne({ taskID: req.params.id }, (err, task) => {
            if (err)
                return console.error(err.stack);
            res.json(task);
        });
    }
    createTask(req, res, next) {
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
}
exports.TaskController = TaskController;
//# sourceMappingURL=taskController.js.map