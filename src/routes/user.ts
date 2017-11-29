"use strict";

import * as express from "express";
import * as mongoose from "mongoose";
import * as moment from "moment";
import * as jwt from "jsonwebtoken";
import app from "../app";
import { UserController } from "../controllers/userController";
import User from "../models/user";
export let Schema = mongoose.Schema;
const userController = new UserController();
const router = express.Router();

// GET all users
router.get("/", userController.getAll);

// GET user by facebookid
router.get("/:id", userController.getOne);

// GET user by category
router.get("/services/:category", userController.getAllForCategory);

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

// POST a new user
router.post("/", userController.createUser);

// UPDATE user by id
router.put("/:id", userController.updateUser);

// DELETE user by id
router.delete("/:id", userController.deleteUser);

export default router;
