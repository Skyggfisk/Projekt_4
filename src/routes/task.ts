"use strict";

import * as express from "express";
import * as mongoose from "mongoose";
import * as moment from "moment";
import Task from "../models/task";
import * as jwt from "jsonwebtoken";
import app from "../app";
import { TaskController } from "../controllers/taskController";
export let Schema = mongoose.Schema;
const router = express.Router();
const taskController = new TaskController();

// GET all tasks
router.get("/", taskController.getAll);

// GET task by taskID
router.get("/:id", taskController.getOne);

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
router.post("/", taskController.createTask);

// PUT task by id
router.put("/:id", taskController.updateTask);

// DELETE task by id
router.delete("/:id", taskController.deleteTask);

export default router;
