"use strict";
import { Response, NextFunction, Request } from "express";
import { Category, ICategoryModel } from "../models/category";
import { json } from "body-parser";

// GET all categories as json array
export class CategoryController {
  getAll(req: Request, res: Response, next: NextFunction) {
    Category.find((err: Error, categories: JSON) => {
      if (err) return console.error(err.stack);
      res.json(categories);
    });
  }

  getLikeName(req: Request, res: Response, next: NextFunction) {
    Category.find(
      { name: { $regex: req.params.name, $options: "i" } },
      (err: Error, categories: ICategoryModel) => {
        if (err) return console.error(err.stack);
        res.json(categories);
      }
    );
  }
}
