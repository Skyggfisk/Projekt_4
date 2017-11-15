import { Document, Schema, Model, model } from "mongoose";
import { ICategorynprice } from "../interfaces/categorynprice";
import { ICategory } from "../interfaces/category";
export interface ICategorynpriceModel extends ICategorynprice, Document {}
export interface ICategoryModel extends ICategory, Document {}

export var CategorynpriceSchema: Schema = new Schema({
  category: Model.category,
  price: Number
});

export const Categorynprice: Model<ICategorynpriceModel> = model<
  ICategorynprice
>("Categorynprice", CategorynpriceSchema);

export default Categorynprice;
