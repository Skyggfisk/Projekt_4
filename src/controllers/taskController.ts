"use strict";

import { Request, Response, NextFunction } from "express";
import { Task, ITaskModel } from "../models/task";
import { Error } from "mongoose";
import * as moment from "moment";

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
    Task.findOne({ taskID: req.params.id }, (err: Error, task: JSON) => {
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

  // PUT task by id
  updateTask(req: Request, res: Response, next: NextFunction) {
    var task = Task.findOne(
      { taskID: req.params.id },
      (err: Error, task: ITaskModel) => {
        task.title = req.body.title || task.title;
        task.creationDate = req.body.creationDate || task.creationDate;
        task.date = req.body.date || task.date;
        task.description = req.body.description || task.description;
        task.categories = req.body.categories || task.categories;
        task.salary = req.body.salary || task.salary;
        return task.save((err: Error, task: ITaskModel) => {
          if (err) return console.log(err.stack);
          console.log(
            moment().format("h:mm:ss a") +
              " - Task: " +
              task.taskID +
              " updated!"
          );
          res.send(
            moment().format("h:mm:ss a") +
              " - Task: " +
              task.taskID +
              " updated!"
          );
        });
      }
    );
  }

  // DELETE task by id
  deleteTask(req: Request, res: Response, next: NextFunction) {
    Task.findOneAndRemove(
      { taskID: req.params.id },
      (err: Error, task: ITaskModel) => {
        if (err) return console.error(err.stack);
        res.json(task);
      }
    );
  }
}
