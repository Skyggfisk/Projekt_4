"use strict";

import * as jwt from "jsonwebtoken";
import app from "../app";
import { Request, Response, NextFunction } from "express";

export class JwtController {
  // route middleware to verify a token
  verifyToken(req: Request, res: Response, next: NextFunction) {
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
  };
}
