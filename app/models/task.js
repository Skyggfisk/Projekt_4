"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.TaskSchema = new mongoose_1.Schema({
    title: String,
    creationDate: Date,
<<<<<<< HEAD
    date: Date,
    description: String,
    categories: Array,
    taskID: String,
    salary: Number
=======
    description: String,
    categories: Array,
    taskID: String
>>>>>>> b59825bb8558362232923f6cf63df6ed9e7ba5c2
});
exports.Task = mongoose_1.model("Task", exports.TaskSchema);
exports.default = exports.Task;
//# sourceMappingURL=task.js.map