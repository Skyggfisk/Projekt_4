"use strict";
import * as express from "express";
import * as mongoose from "mongoose";
import { Category } from "../models/category";
import { CategoryController } from "../controllers/categoryController";
import * as jwt from "jsonwebtoken";
import app from "../app";
export let Schema = mongoose.Schema;
const router = express.Router();
const categoryController = new CategoryController();

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

// GET all categories as json array
router.get("/", categoryController.getAll);

// GET all categories with a name like params.name
router.get("/:name", categoryController.getLikeName);

export default router;
