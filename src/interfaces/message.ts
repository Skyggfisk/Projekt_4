import { IUser } from "./user";
import { Document, Schema, Model, model } from "mongoose";

export interface IMessage {
  message: String;
  user: IUser;
  timeStamp: Date;
  conversationID: String;
}
