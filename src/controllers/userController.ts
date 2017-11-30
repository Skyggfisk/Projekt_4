"use strict";

import { Request, Response, NextFunction } from "express";
import { User, IUserModel } from "../models/user";
import { Error } from "mongoose";
import * as moment from "moment";

export class UserController {
  // GET all users
  getAll(req: Request, res: Response, next: NextFunction) {
    User.find((err: Error, users: JSON) => {
      if (err) return console.error(err.stack);
      res.json(users);
    });
  }

  // GET user by facebookid
  getOne(req: Request, res: Response, next: NextFunction) {
    User.findOne(
      { facebookid: req.params.id },
      (err: Error, user: IUserModel) => {
        if (err) return console.error(err.stack);
        res.json(user);
      }
    );
  }

  // GET users by category
  getAllForCategory(req: Request, res: Response, next: NextFunction) {
    User.aggregate(
      {
        $match: { services: { $elemMatch: { category: req.params.category } } }
      },
      //     { $unwind: "$services" },
      //     { $match: { "services.category": req.params.category } },
      (err: Error, users: IUserModel[]) => {
        if (err) return console.error(err.stack);
        res.json(users);
      }
    );
  }

  // POST a new user
  createUser(req: Request, res: Response, next: NextFunction) {
    var user = new User({
      facebookid: req.body.facebookid,
      description: req.body.description,
      services: req.body.services,
      range: req.body.range,
      zipcode: req.body.zipcode,
      fname: req.body.fname,
      lname: req.body.lname,
      imgurl: req.body.imgurl
    });
    user.save((err: Error, user: IUserModel) => {
      if (err) return console.error(err.stack);
      console.log(
        moment().format("h:mm:ss a") + " - User: " + user.facebookid + " saved!"
      );
      res.send("it worked");
    });
  }

  // UPDATE user by id
  updateUser(req: Request, res: Response, next: NextFunction) {
    var user = User.findOne(
      { facebookid: req.params.id },
      (err: Error, user: IUserModel) => {
        user.description = req.body.description || user.description;
        user.services = req.body.services || user.services;
        user.range = req.body.range || user.range;
        user.zipcode = req.body.zipcode || user.zipcode;
        user.fname = req.body.fname || user.fname;
        user.lname = req.body.lname || user.lname;
        user.imgurl = req.body.imgurl || user.imgurl;
        return user.save(function(err) {
          if (err) return console.log(err);
          console.log(
            moment().format("h:mm:ss a") +
              " - User: " +
              user.facebookid +
              " updated!"
          );
          res.send(
            moment().format("h:mm:ss a") +
              " - User: " +
              user.facebookid +
              " updated!"
          );
        });
      }
    );
  }

  // DELETE user by id
  deleteUser(req: Request, res: Response, next: NextFunction) {
    User.findOneAndRemove(
      { facebookid: req.params.id },
      (err: Error, user: IUserModel) => {
        if (err) return console.error(err.stack);
        res.json(user);
      }
    );
  }
}
