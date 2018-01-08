"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var TaskSchema = new mongoose_1.Schema({
    title: String,
    creationDate: Date,
    date: Date,
    description: String,
    categories: Array,
    taskID: String,
    salary: Number
});
exports.Task = mongoose_1.model("Task", TaskSchema);
exports.default = exports.Task;
//# sourceMappingURL=task.js.map