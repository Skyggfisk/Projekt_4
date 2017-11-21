import { Request, Response, NextFunction } from "express";
import { Task, ITaskModel } from "../models/task";
import { Error } from "mongoose";
import * as moment from "moment";

"use strict";

export class TaskController {
  // GET all tasks
  getAll(req: Request, res: Response, next: NextFunction) {
    Task.find((err: Error, tasks: JSON) => {
      if (err) return console.error(err.stack);
      res.json(tasks);
    });
  }

  // GET task by id
  getOne(req: Request, res: Response, next: NextFunction) {
    Task.findOne({ taskID: req.params.taskID }, (err: Error, task: JSON) => {
      if (err) return console.error(err.stack);
      res.json(task);
    });
  }
  // POST a new task
  createTask(req: Request, res: Response, next: NextFunction) {
    var task = new Task({
      title: req.body.title,
      creationDate: req.body.creationDate,
      date: req.body.date,
      description: req.body.description,
      categories: req.body.categories,
      taskID: req.body.taskID,
      salary: req.body.salary
    });
    task.save((err: Error, task: ITaskModel) => {
      if (err) return console.error(err.stack);
      console.log(
        moment().format("h:mm:ss a") + " - Task: " + task.taskID + " saved!"
      );
      res.send("it worked");
    });
  }
}
