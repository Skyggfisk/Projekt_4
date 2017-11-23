"use strict";

import * as express from "express";
import * as mongoose from "mongoose";
import * as moment from "moment";
import * as jwt from "jsonwebtoken";
import app from "../app";
import { TaskController } from "../controllers/taskController";
export let Schema = mongoose.Schema;
const router = express.Router();
const taskController = new TaskController();
import { ChatController } from "../controllers/chat";

const chat = new ChatController();
