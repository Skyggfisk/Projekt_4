import { Document, Schema, Model, model } from "mongoose";
import { IDevUser } from "../interfaces/devuser";

export interface IDevUserModel extends IDevUser, Document {}

export var DevUserSchema: Schema = new Schema({
  name: String,
  password: String,
  admin: Boolean
});

export const DevUser: Model<IDevUserModel> = model<IDevUserModel>(
  "DevUser",
  DevUserSchema
);
export default DevUser;
