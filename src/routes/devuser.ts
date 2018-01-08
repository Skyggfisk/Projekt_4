"use strict";

import * as express from "express";
import * as mongoose from "mongoose";
import * as jwt from "jsonwebtoken";
import app from "../app";
import { Request, Response } from "express";
import { Error } from "mongoose";
import { DevUser } from "../models/devuser";
import { config } from "../config";
import { IDevUserModel } from "../models/devuser";

var router = express.Router();

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post("/authenticate", function (req: Request, res: Response) {
  // find the user
  DevUser.findOne({ name: req.body.name }, function (err: Error, devuser: IDevUserModel) {
    if (err) throw err;

    if (!devuser) {
      res.json({
        success: false,
        message: "Authentication failed. User not found."
      });
    } else if (devuser) {
      // check if password matches
      if (devuser.password != req.body.password) {
        res.json({
          success: false,
          message: "Authentication failed. Wrong password."
        });
      } else {
        // if user is found and password is right
        // create a token with only our given payload
        // we don't want to pass in the entire user since that has the password
        const payload = {
          admin: devuser.admin
        };
        var token = jwt.sign(payload, app.get("superSecret"), {});

        // return the information including token as JSON
        res.json({
          success: true,
          message: "Enjoy your token!",
          token: token
        });
      }
    }
  });
});

export default router;
