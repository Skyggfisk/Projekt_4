import { IUser } from "./user";
import { Document, Schema, Model, model } from "mongoose";

export interface IMessage {
  message: String;
  user: String;
  timeStamp: Date;
  conversationID: String;
}
