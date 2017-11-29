import { Document, Schema, Model, model } from "mongoose";
import { User } from "../models/user";
import { IMessage } from "../interfaces/message";

export interface IMessageModel extends IMessage, Document {}

var MessageSchema: Schema = new Schema({
  user: String,
  message: String,
  timeStamp: Date,
  conversationID: String
});

export const Message: Model<IMessageModel> = model<IMessageModel>(
  "Message",
  MessageSchema
);
export default Message;
