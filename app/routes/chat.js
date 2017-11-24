"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const taskController_1 = require("../controllers/taskController");
exports.Schema = mongoose.Schema;
const router = express.Router();
const taskController = new taskController_1.TaskController();
const chat_1 = require("../controllers/chat");
const chat = new chat_1.ChatController();
//# sourceMappingURL=chat.js.map