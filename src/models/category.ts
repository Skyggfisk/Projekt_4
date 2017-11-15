import { Document, Schema, Model, model } from "mongoose";
import { ICategory } from "../interfaces/category";

// Extend Document to get some needed functionality
export interface ICategoryModel extends ICategory, Document {}

export var CategorySchema: Schema = new Schema({
  name: String
});

// CategorySchema.pre("save", function(next) {
//   let now = new Date();
//   if (!this.modified) {
//     this.modified = now;
//   }
//   next();
// });

// CategorySchema.methods.myNameIs = function(): string {
//   return "Hello, my name is " + this.name;
// };

export const Category: Model<ICategoryModel> = model<ICategoryModel>(
  "Category",
  CategorySchema
);
export default Category;
