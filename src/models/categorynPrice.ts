import { Document, Schema, Model, model } from "mongoose";
import { ICategorynprice } from "../interfaces/categorynprice";
// import { ICategory } from "../interfaces/category";
import { Category } from "../models/category";
interface ICategorynpriceModel extends ICategorynprice, Document {}
// export interface ICategoryModel extends ICategory, Document {}

var CategorynpriceSchema: Schema = new Schema({
  category: Category,
  price: Number
});

const Categorynprice: Model<ICategorynpriceModel> = model<ICategorynpriceModel>(
  "Categorynprice",
  CategorynpriceSchema
);

export default Categorynprice;
