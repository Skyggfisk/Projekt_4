import { Document, Schema, Model, model } from "mongoose";
import { IUser } from "../interfaces/user";

export interface IUserModel extends IUser, Document {}

export var UserSchema: Schema = new Schema({
  facebookid: String,
  description: String,
  services: Array,
  range: Number,
  zipcode: String
});

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);
export default User;
