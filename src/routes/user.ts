"use strict";

import * as express from "express";
import * as mongoose from "mongoose";
import * as jwt from "jsonwebtoken";
import app from "../app";
import { Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/userController";
const router = express.Router();
const userController = new UserController();

// route middleware to verify a token
router.use(function (req: Request, res: Response, next: NextFunction) {
  // check header or url parameters or post parameters for token
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get("superSecret"), function (err, decoded) {
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

// GET all users
router.get("/", userController.getAll);

// GET user by facebookid
router.get("/:id", userController.getOne);

// GET user by category
router.get("/services/:category", userController.getAllForCategory);

// POST a new user
router.post("/", userController.createUser);

// UPDATE user by id
router.put("/:id", userController.updateUser);

// DELETE user by id
router.delete("/:id", userController.deleteUser);

export default router;
