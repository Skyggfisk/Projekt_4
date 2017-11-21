"use strict";
import { Response, NextFunction, Request } from "express";
import { Category } from "../models/category";
import { json } from "body-parser";

export class CategoryController {
  getAll(req: Request, res: Response, next: NextFunction) {
    Category.find((err: Error, categories: JSON) => {
      if (err) return console.error(err.stack);
      res.json(categories);
    });
  }
}
