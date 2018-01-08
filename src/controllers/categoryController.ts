"use strict";

import { Request, Response } from "express";
import { Category, ICategoryModel } from "../models/category";
import * as moment from "moment";

export class CategoryController {
  // GET all categories as JSON array
  getAll(req: Request, res: Response) {
    Category.find((err: Error, categories: JSON) => {
      if (err) return console.error(err.stack);
      res.json(categories);
    });
  }

  // GET all categories matching string against regex
  getLikeName(req: Request, res: Response) {
    Category.find(
      { name: { $regex: req.params.name, $options: "i" } },
      (err: Error, categories: ICategoryModel) => {
        if (err) return console.error(err.stack);
        res.json(categories);
      }
    );
  }

  // POST new category
  createCategory(req: Request, res: Response) {
    var category = new Category({
      name: req.body.name
    });
    category.save((err: Error, category: ICategoryModel) => {
      if (err) return console.error(err.stack);
      console.log(
        moment().format("h:mm:ss a") + " - Category: " + category.name + " saved!"
      );
      res.send("it worked");
    });
  }
}
